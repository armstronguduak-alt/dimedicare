import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cardHover, imageZoom } from "@/lib/animations";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

const ArticleCard = ({ title, excerpt, category, readTime, image, slug }: ArticleCardProps) => {
  return (
    <Link to={`/article/${slug}`}>
      <motion.article
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="group h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-colors"
      >
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden relative">
          <motion.img
            variants={imageZoom}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Category badge overlay */}
          <div className="absolute top-4 left-4">
            <span className="pill-badge bg-background/90 backdrop-blur-md text-xs font-semibold">
              {category}
            </span>
          </div>
          {/* Arrow icon on hover */}
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <h3 className="font-serif text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {excerpt}
          </p>
          <div className="pt-2 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            Read Article
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
