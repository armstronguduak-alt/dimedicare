/**
 * React Query hooks for all Supabase data fetching.
 * Every component uses these — zero hardcoded/mock data.
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/* ═══════════════ CATEGORIES ═══════════════ */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, description, icon")
        .order("name");
      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 min cache
  });

/* ═══════════════ ARTICLES ═══════════════ */
export interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: string;
  view_count: number | null;
  read_time: number | null;
  published_at: string | null;
  created_at: string | null;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  categories: { name: string; slug: string } | null;
}

/** Published articles — used on homepage, category pages */
export const usePublishedArticles = (categorySlug?: string, limit?: number) =>
  useQuery({
    queryKey: ["articles", "published", categorySlug, limit],
    queryFn: async (): Promise<ArticleRow[]> => {
      let q = supabase
        .from("articles")
        .select(`id, title, slug, excerpt, featured_image, status, view_count, read_time, published_at, created_at, category_id, content, seo_title, seo_description, categories (name, slug)`)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (limit) q = q.limit(limit);

      const { data, error } = await q;
      if (error) throw error;

      // Client-side category filter (Supabase can't easily filter by joined slug)
      if (categorySlug && data) {
        return data.filter((a) => a.categories?.slug === categorySlug);
      }
      return data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 min
  });

/** Featured / latest articles for homepage */
export const useFeaturedArticles = (limit = 6) =>
  useQuery({
    queryKey: ["articles", "featured", limit],
    queryFn: async (): Promise<ArticleRow[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select(`id, title, slug, excerpt, featured_image, status, view_count, read_time, published_at, created_at, category_id, content, seo_title, seo_description, categories (name, slug)`)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    },
    staleTime: 2 * 60 * 1000,
  });

/** Single article by slug */
export const useArticleBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["article", slug],
    queryFn: async (): Promise<ArticleRow | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("articles")
        .select(`id, title, slug, excerpt, featured_image, status, view_count, read_time, published_at, created_at, category_id, content, seo_title, seo_description, categories (name, slug)`)
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      if (error) {
        if (error.code === "PGRST116") return null; // not found
        throw error;
      }
      return data;
    },
    enabled: !!slug,
    staleTime: 60 * 1000, // 1 min
  });

/** Popular posts by view_count */
export const usePopularArticles = (limit = 5) =>
  useQuery({
    queryKey: ["articles", "popular", limit],
    queryFn: async (): Promise<ArticleRow[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select(`id, title, slug, featured_image, view_count, categories (name, slug)`)
        .eq("status", "published")
        .order("view_count", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as any) || [];
    },
    staleTime: 5 * 60 * 1000,
  });

/** Related articles (same category, excluding current) */
export const useRelatedArticles = (categoryId: string | null, excludeId: string, limit = 3) =>
  useQuery({
    queryKey: ["articles", "related", categoryId, excludeId],
    queryFn: async (): Promise<ArticleRow[]> => {
      if (!categoryId) return [];
      const { data, error } = await supabase
        .from("articles")
        .select(`id, title, slug, excerpt, featured_image, view_count, read_time, published_at, categories (name, slug)`)
        .eq("status", "published")
        .eq("category_id", categoryId)
        .neq("id", excludeId)
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as any) || [];
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });

/* ═══════════════ TAGS ═══════════════ */
export interface TagRow {
  id: string;
  name: string;
  slug: string;
}

export const useArticleTags = (articleId: string | undefined) =>
  useQuery({
    queryKey: ["article-tags", articleId],
    queryFn: async (): Promise<TagRow[]> => {
      if (!articleId) return [];
      const { data, error } = await supabase
        .from("article_tags")
        .select("tags (id, name, slug)")
        .eq("article_id", articleId);
      if (error) throw error;
      return (data?.map((d: any) => d.tags).filter(Boolean) as TagRow[]) || [];
    },
    enabled: !!articleId,
    staleTime: 10 * 60 * 1000,
  });

/* ═══════════════ TRENDING TOPICS ═══════════════ */
export const useTrendingTopics = () =>
  useQuery({
    queryKey: ["trending-topics"],
    queryFn: async (): Promise<TagRow[]> => {
      const { data, error } = await supabase
        .from("tags")
        .select("id, name, slug")
        .limit(10);
      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
  });

/* ═══════════════ ADMIN STATS ═══════════════ */
export const useAdminStats = () =>
  useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [articlesRes, subscribersRes] = await Promise.all([
        supabase.from("articles").select("id, view_count, status", { count: "exact" }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact" }).eq("status", "active"),
      ]);
      const articles = articlesRes.data || [];
      const totalViews = articles.reduce((sum, a) => sum + (a.view_count || 0), 0);
      const published = articles.filter((a) => a.status === "published").length;
      return {
        totalArticles: articlesRes.count || 0,
        publishedArticles: published,
        totalViews,
        subscribers: subscribersRes.count || 0,
      };
    },
    staleTime: 60 * 1000,
  });
