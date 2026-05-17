import { useParams, Link } from "react-router-dom";
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import PopularPosts from "@/components/PopularPosts";
import SidebarNewsletter from "@/components/SidebarNewsletter";
import SocialShare from "@/components/SocialShare";
import TrendingTopics from "@/components/TrendingTopics";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import RelatedTags from "@/components/RelatedTags";
import TableOfContents from "@/components/TableOfContents";
import {
  fadeInUp, fadeInRight, staggerContainer, staggerItem,
  scrollViewport, scaleIn
} from "@/lib/animations";
import { useArticleBySlug, useRelatedArticles } from "@/hooks/use-data";
import { Helmet } from "react-helmet-async";
import NotFound from "./NotFound";

const Article = () => {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useArticleBySlug(slug);
  const { data: relatedArticles = [] } = useRelatedArticles(
    article?.category_id || null, 
    article?.id || "",
    3
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{article.seo_title || article.title} | Dimedicare</title>
        <meta name="description" content={article.seo_description || article.excerpt || ""} />
      </Helmet>
      
      <ReadingProgressBar />
      <Header />

      <main className="flex-1">
        <article>
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-[350px] md:h-[450px] w-full overflow-hidden"
          >
            <img
              src={article.featured_image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop"}
              alt={article.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-6 left-6"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 text-cream-100/80 hover:text-white transition-colors text-xs font-medium"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Home
              </Link>
            </motion.div>

            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="container mx-auto max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {article.categories?.name && (
                    <span className="pill-badge bg-primary/90 text-primary-foreground border-primary/20 mb-3 inline-flex text-[10px] py-1">
                      {article.categories.name}
                    </span>
                  )}
                  <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-cream-50 leading-tight max-w-3xl">
                    {article.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-cream-200/70">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.read_time || 5} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Just now"}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Article Body */}
          <div className="container mx-auto px-4 py-10">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_280px]">
              {/* Main Content */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                {/* Share bar */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 pill-badge text-[10px] py-1"
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 pill-badge text-[10px] py-1"
                  >
                    <Bookmark className="h-3 w-3" />
                    Save
                  </motion.button>
                </div>

                {/* Article Content */}
                <div
                  className="prose-premium"
                  dangerouslySetInnerHTML={{ __html: article.content || "" }}
                />

                {/* Author Box */}
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  className="my-10 rounded-2xl border border-border/50 bg-sage-100/30 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-lg font-bold text-primary">
                        D
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-foreground mb-1">
                        Dimedicare Editorial
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Our team of certified fitness trainers and health experts bring you evidence-based advice and practical tips to help you achieve your wellness goals.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                variants={fadeInRight}
                initial="hidden"
                animate="visible"
                className="hidden lg:block"
              >
                <div className="sticky top-20 space-y-6">
                  <TableOfContents />
                  <SocialShare
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    title={article.title}
                  />
                  <SidebarNewsletter />
                  <PopularPosts />
                  <TrendingTopics />
                </div>
              </motion.aside>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-sage-100/20 border-t border-border/30">
            <div className="container mx-auto px-4">
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                className="font-serif text-2xl md:text-3xl mb-8"
              >
                Related Articles
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {relatedArticles.map((a) => (
                  <motion.div key={a.id} variants={staggerItem}>
                    <ArticleCard 
                      title={a.title}
                      excerpt={a.excerpt || ""}
                      category={a.categories?.name || "Uncategorized"}
                      readTime={`${a.read_time || 5} min read`}
                      image={a.featured_image || "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=450&fit=crop"}
                      slug={a.slug}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Article;
