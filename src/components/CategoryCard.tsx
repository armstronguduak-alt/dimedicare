import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const CategoryCard = ({ title, description, icon: Icon, link }: CategoryCardProps) => {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
      >
        {/* Subtle gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 group-hover:bg-primary/15 transition-colors duration-300"
          >
            <Icon className="h-7 w-7 text-primary" strokeWidth={1.8} />
          </motion.div>

          {/* Text */}
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow link */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
