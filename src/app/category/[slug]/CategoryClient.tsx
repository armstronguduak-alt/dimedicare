"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainerSlow, staggerItem, scrollViewport } from "@/lib/animations";
import { Activity, ArrowRight } from "lucide-react";

export default function CategoryClient({ category, articles, allCategories }: { category: any, articles: any[], allCategories: any[] }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={allCategories} />
      
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-16"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="h-8 w-8 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Activity className="h-4 w-4 text-cream-100" />
              </div>
              <span className="text-xs text-cream-200/60 uppercase tracking-wider font-semibold">Category</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-3"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-2xl text-sm text-cream-200/70 leading-relaxed"
            >
              {category.description || `Explore the latest articles, guides, and insights about ${category.name}.`}
            </motion.p>
          </div>
        </motion.section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            {articles.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-12">No articles found in this category.</p>
            ) : (
              <>
                <motion.div
                  variants={staggerContainerSlow}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {articles.map((article) => (
                    <motion.div key={article.id} variants={staggerItem}>
                      <ArticleCard 
                        title={article.title}
                        excerpt={article.excerpt || ""}
                        category={category.name}
                        readTime={`${article.read_time || 5} min read`}
                        image={article.featured_image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop"}
                        slug={article.slug}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer categories={allCategories} />
    </div>
  );
}
