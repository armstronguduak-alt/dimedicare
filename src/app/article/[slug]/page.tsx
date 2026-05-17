import { supabase } from "@/integrations/supabase/client";
import ArticleClient from "./ArticleClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for existing published articles (SSG for instant loads)
export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");
  
  return (articles || []).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: article } = await supabase
    .from("articles")
    .select("seo_title, seo_description, title, excerpt, featured_image")
    .eq("slug", params.slug)
    .single();

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.seo_title || article.title} | Dimedicare`,
    description: article.seo_description || article.excerpt || "",
    openGraph: {
      images: [article.featured_image || ""],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const [{ data: article }, { data: categories }] = await Promise.all([
    supabase
      .from("articles")
      .select(`id, title, slug, excerpt, featured_image, status, view_count, read_time, published_at, category_id, content, seo_title, seo_description, categories (name, slug)`)
      .eq("slug", params.slug)
      .eq("status", "published")
      .single(),
    supabase.from("categories").select("id, name, slug, description, icon").order("name")
  ]);

  if (!article) {
    notFound();
  }

  // Fetch related articles on the server
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select(`id, title, slug, excerpt, featured_image, read_time, categories (name)`)
    .eq("status", "published")
    .eq("category_id", article.category_id)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <ArticleClient 
      article={article} 
      relatedArticles={relatedArticles || []} 
      categories={categories || []} 
    />
  );
}
