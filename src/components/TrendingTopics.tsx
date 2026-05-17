import { Link } from "react-router-dom";
import { Hash } from "lucide-react";
import { motion } from "framer-motion";
import { useTrendingTopics } from "@/hooks/use-data";
import { staggerContainerFast, staggerItem } from "@/lib/animations";

const TrendingTopics = () => {
  const { data: topics = [], isLoading } = useTrendingTopics();

  if (isLoading || topics.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5">
      <h3 className="mb-4 font-serif text-base font-bold text-foreground">
        Trending Topics
      </h3>
      <motion.div 
        variants={staggerContainerFast}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2"
      >
        {topics.map((topic) => (
          <motion.div key={topic.id} variants={staggerItem}>
            <Link
              to={`/search?q=${topic.slug}`}
              className="inline-flex items-center gap-1 rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Hash className="h-3 w-3" />
              {topic.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrendingTopics;
