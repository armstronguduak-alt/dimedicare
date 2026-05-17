"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterBox from "@/components/NewsletterBox";
import { motion } from "framer-motion";
import { fadeInUp, scrollViewport } from "@/lib/animations";
import { useCategories } from "@/hooks/use-data";

export default function NewsletterPage() {
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header categories={categories} />
      
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="text-center mb-10 max-w-2xl"
        >
          <span className="text-[10px] font-semibold tracking-wider text-primary uppercase mb-3 block">
            Weekly Wellness
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Elevate Your Health Journey
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Join thousands of readers who receive our curated health insights, fitness tips, and exclusive wellness guides every week. No spam, ever.
          </p>
        </motion.div>
        
        <div className="w-full max-w-3xl">
          <NewsletterBox />
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
}
