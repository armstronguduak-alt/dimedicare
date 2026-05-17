import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ArticleCard from "@/components/ArticleCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainerSlow, staggerItem, scrollViewport } from "@/lib/animations";
import { Search as SearchIcon } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  read_time: number;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const query = searchParams.get("q") || "";

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { searchArticles(); }, [query, selectedCategory]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id, name");
    if (!error && data) setCategories(data);
  };

  const searchArticles = async () => {
    setLoading(true);
    try {
      let queryBuilder = supabase
        .from("articles")
        .select(`id, title, slug, excerpt, featured_image, read_time, categories (name)`)
        .eq("status", "published");
      if (query) queryBuilder = queryBuilder.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);
      if (selectedCategory !== "all") queryBuilder = queryBuilder.eq("category_id", selectedCategory);
      const { data, error } = await queryBuilder.order("published_at", { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error searching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    if (newQuery) setSearchParams({ q: newQuery });
    else setSearchParams({});
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={query ? `Search Results: ${query} | Dimedicare` : "Search Articles | Dimedicare"}
        description="Search for health, fitness, nutrition, and wellness articles"
        url={`https://dimedicare.com/search${query ? `?q=${query}` : ""}`}
      />
      <Header />
      <main className="flex-1">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-20 text-primary-foreground">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <SearchIcon className="h-5 w-5 text-cream-100" />
              </div>
              <span className="text-label text-cream-200/60">Find Articles</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-serif text-5xl font-bold text-cream-50 mb-6">Search Articles</motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mx-auto max-w-2xl">
              <SearchBar onSearch={handleSearch} placeholder="Search for articles..." />
            </motion.div>
          </div>
        </motion.section>

        <div className="container mx-auto px-6 py-12">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? "Searching..." : `Found ${articles.length} ${articles.length === 1 ? "article" : "articles"}${query ? ` for "${query}"` : ""}`}
            </p>
            <div className="w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-xl border-border/60">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 animate-shimmer rounded-2xl" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-serif text-xl font-bold text-foreground mb-2">No articles found</p>
              <p className="text-muted-foreground">Try a different search term or browse our categories.</p>
            </motion.div>
          ) : (
            <motion.div variants={staggerContainerSlow} initial="hidden" whileInView="visible" viewport={scrollViewport} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <motion.div key={article.id} variants={staggerItem}>
                  <ArticleCard
                    title={article.title}
                    excerpt={article.excerpt || ""}
                    category={article.categories?.name || "Uncategorized"}
                    readTime={`${article.read_time} min read`}
                    image={article.featured_image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop"}
                    slug={article.slug}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;