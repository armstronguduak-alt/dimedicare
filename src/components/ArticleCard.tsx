"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug?: string;
}

const ArticleCard = ({ title, excerpt, category, readTime, image, slug = "#" }: ArticleCardProps) => {
  return (
    <Link href={`/article/${slug}`} className="group block h-full">
      <motion.article 
        whileHover={{ y: -4 }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-foreground backdrop-blur-sm shadow-sm">
            {category}
          </div>
          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {readTime}
          </div>
          <h3 className="mb-2 font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-auto text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
