import { supabase } from "@/integrations/supabase/client";
import HomePageClient from "./HomePageClient";

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function Page() {
  // Fetch data on the server
  const [{ data: articles }, { data: categories }] = await Promise.all([
    supabase
      .from("articles")
      .select(`id, title, slug, excerpt, featured_image, status, view_count, read_time, published_at, category_id, categories (name, slug)`)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6),
    supabase
      .from("categories")
      .select("id, name, slug, description, icon")
      .order("name")
  ]);

  return <HomePageClient articles={articles || []} categories={categories || []} />;
}
