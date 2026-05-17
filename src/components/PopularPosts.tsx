import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePopularArticles } from "@/hooks/use-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const PopularPosts = () => {
  const { data: posts = [], isLoading } = usePopularArticles(4);

  if (isLoading || posts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5">
      <h3 className="mb-4 font-serif text-base font-bold text-foreground flex items-center gap-2">
        Popular Articles
      </h3>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={staggerItem}>
            <Link to={`/article/${post.slug}`} className="group flex gap-3 items-center">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/30">
                <img
                  src={post.featured_image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center">
                {post.categories && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">
                    {post.categories.name}
                  </span>
                )}
                <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PopularPosts;
