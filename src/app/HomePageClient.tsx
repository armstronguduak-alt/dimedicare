"use client";

import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import NewsletterBox from "@/components/NewsletterBox";
import Link from "next/link";
import {
  fadeInUp, heroTitle, heroSubtitle, heroCTA, heroImage, heroStat,
  staggerContainer, staggerItem, scrollViewport, staggerContainerSlow
} from "@/lib/animations";

export default function HomePageClient({ articles, categories }: { articles: any[], categories: any[] }) {
  const pillTags = [
    { icon: CheckCircle, label: "Intentional Movement" },
    { icon: CheckCircle, label: "Purposeful Breathing" },
    { icon: CheckCircle, label: "Empowered Strength" },
    { icon: CheckCircle, label: "Inner Harmony" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={categories} />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-hero-gradient min-h-[80vh] flex items-center">
          <div className="absolute top-2 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
            <motion.span initial={{ opacity: 0, y: -30 }} animate={{ opacity: 0.05, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif text-[6rem] md:text-[11rem] font-bold text-forest-900 whitespace-nowrap tracking-tight">
              Dimedicare
            </motion.span>
          </div>
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <motion.h1 variants={heroTitle} initial="hidden" animate="visible"
                  className="text-display text-4xl md:text-5xl lg:text-6xl text-forest-900">
                  Transforming <span className="text-display-italic text-forest-700">Health</span> Through Function & Lifestyle
                </motion.h1>
                <motion.p variants={heroSubtitle} initial="hidden" animate="visible"
                  className="text-body text-sm md:text-base text-forest-800/70 max-w-lg">
                  Discover how every breath and movement can guide you toward harmony, strength, and mindfulness.
                </motion.p>
                <motion.div variants={heroCTA} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
                  <Link href="/newsletter">
                    <motion.span whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                      className="btn-premium btn-premium-filled text-xs px-5 py-2.5 inline-block">Enroll Now</motion.span>
                  </Link>
                  <Link href="/contact">
                    <motion.span whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                      className="btn-premium btn-premium-outline border-forest-800/20 text-forest-900 text-xs px-5 py-2.5 inline-block">Contact Us</motion.span>
                  </Link>
                </motion.div>
              </div>
              <div className="relative">
                <motion.div variants={heroStat} initial="hidden" animate="visible" transition={{ delay: 0.6 }}
                  className="absolute -top-2 right-6 z-20 stat-card">
                  <p className="text-[10px] text-muted-foreground font-medium">Average Rating</p>
                  <p className="text-lg font-bold text-foreground">4.9<span className="text-primary">★</span></p>
                </motion.div>
                <motion.div variants={heroStat} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
                  className="absolute -bottom-1 right-3 z-20 stat-card">
                  <p className="text-[10px] text-muted-foreground font-medium">Happy Clients</p>
                  <p className="text-lg font-bold text-foreground">600+</p>
                </motion.div>
                <motion.div variants={heroImage} initial="hidden" animate="visible" className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=900&fit=crop"
                    alt="Yoga and functional health" className="w-full h-[400px] lg:h-[500px] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-900/95 via-forest-900/60 to-transparent p-6 pt-16">
                    <p className="quote-block text-cream-100/90 text-sm max-w-md">
                      "True health isn't just about workouts or meals—it's about understanding your body and giving it what it truly needs."
                    </p>
                    <p className="mt-2 text-cream-200/60 font-medium text-xs">—Jo</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
                  className="flex flex-wrap gap-1.5 mt-4 justify-center">
                  {pillTags.map((tag) => (
                    <span key={tag.label} className="pill-badge text-[10px] py-1 px-2.5">
                      <tag.icon className="h-3 w-3 text-primary" />{tag.label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        {categories.length > 0 && (
          <section className="py-14 bg-background">
            <div className="container mx-auto px-4">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={scrollViewport}
                className="flex items-center justify-between mb-8">
                <h2 className="text-display text-2xl md:text-3xl text-foreground">I'm Ready to Begin</h2>
                <div className="hidden md:flex gap-2">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                    <ArrowLeft className="h-3 w-3" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full border border-primary bg-primary text-primary-foreground flex items-center justify-center">
                    <ArrowRight className="h-3 w-3" />
                  </motion.button>
                </div>
              </motion.div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={scrollViewport}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat) => (
                  <motion.div key={cat.id} variants={staggerItem}>
                    <Link href={`/category/${cat.slug}`}>
                      <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md h-full">
                        <h3 className="font-serif text-base font-bold text-foreground mb-1.5">{cat.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{cat.description || `Explore ${cat.name} articles`}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all">
                          Explore <ArrowRight className="h-3 w-3" />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* FEATURED ARTICLES */}
        <section className="py-14 bg-sage-100/30">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={scrollViewport}
              className="flex items-end justify-between mb-8">
              <div>
                <span className="text-label text-primary mb-2 block text-[10px]">Latest Insights</span>
                <h2 className="text-display text-2xl md:text-3xl text-foreground">Featured Articles</h2>
              </div>
            </motion.div>
            
            {articles.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-12">No articles published yet. Check back soon!</p>
            ) : (
              <motion.div variants={staggerContainerSlow} initial="hidden" whileInView="visible" viewport={scrollViewport}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <motion.div key={a.id} variants={staggerItem}>
                    <ArticleCard
                      title={a.title}
                      excerpt={a.excerpt || ""}
                      category={a.categories?.name || "Uncategorized"}
                      readTime={`${a.read_time || 5} min read`}
                      image={a.featured_image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop"}
                      slug={a.slug}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            <NewsletterBox />
          </div>
        </section>
      </main>
      <Footer categories={categories} />
    </div>
  );
}
