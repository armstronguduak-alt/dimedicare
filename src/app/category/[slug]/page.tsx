import { supabase } from "@/integrations/supabase/client";
import CategoryClient from "./CategoryClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: categories } = await supabase.from("categories").select("slug");
  return (categories || []).map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", params.slug)
    .single();

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Articles | Dimedicare`,
    description: category.description || `Explore ${category.name} articles.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [{ data: categories }, { data: articles }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, description, icon").order("name"),
    supabase
      .from("articles")
      .select(`id, title, slug, excerpt, featured_image, read_time, categories (name, slug)`)
      .eq("status", "published")
      .order("published_at", { ascending: false }),
  ]);

  const category = categories?.find((c) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  // Filter articles for this category
  const categoryArticles = (articles || []).filter((a) => a.categories?.slug === params.slug);

  return (
    <CategoryClient 
      category={category} 
      articles={categoryArticles} 
      allCategories={categories || []} 
    />
  );
}
