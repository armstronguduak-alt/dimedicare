"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Target, Award, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scrollViewport, scaleIn } from "@/lib/animations";
import Link from "next/link";
import { useCategories } from "@/hooks/use-data";

export default function AboutPage() {
  const { data: categories = [] } = useCategories();
  const values = [
    { icon: Shield, title: "Trust & Accuracy", description: "All content is thoroughly researched and fact-checked by medical professionals." },
    { icon: Users, title: "Accessibility", description: "Making quality health information available to everyone, everywhere." },
    { icon: Lightbulb, title: "Transparency", description: "Clear, honest, and unbiased health recommendations you can rely on." },
    { icon: Heart, title: "Community", description: "Building a supportive community for your health and wellness journey." },
  ];

  const stats = [
    { number: "500K+", label: "Monthly Readers" },
    { number: "1,200+", label: "Health Articles" },
    { number: "50+", label: "Expert Contributors" },
    { number: "98%", label: "Reader Satisfaction" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={categories} />
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-24 text-primary-foreground"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container relative mx-auto px-6 text-center z-10">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-label text-cream-200/60 mb-4 block">Our Story</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mb-6 font-serif text-5xl font-bold md:text-6xl lg:text-7xl text-cream-50">
              About <span className="text-display-italic text-sage-300">Dimedicare</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mx-auto max-w-3xl text-lg text-cream-200/70 leading-relaxed">
              Your trusted partner in health and wellness, providing reliable, science-backed information to help you live your healthiest life.
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2 md:items-center">
              <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={scrollViewport}>
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/8 px-4 py-2 text-xs font-medium text-primary">
                  <Target className="mr-2 h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold">Empowering Your Health Journey</h2>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  At Dimedicare, we believe that everyone deserves access to quality health information. Our mission is to bridge the gap between complex medical knowledge and everyday health decisions.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We work with healthcare professionals, nutritionists, and fitness experts to deliver content that is not only accurate but also practical and easy to understand.
                </p>
              </motion.div>
              <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={scrollViewport}>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 to-sage-300/20 blur-2xl" />
                  <div className="relative rounded-2xl bg-card border border-border/50 p-8 shadow-sm">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-4 font-serif text-xl font-bold">Trusted by Millions</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Over 500,000 readers trust Dimedicare every month for reliable health information and wellness guidance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-sage-100/30">
          <div className="container mx-auto px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={scrollViewport} className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={staggerItem} className="text-center">
                  <div className="mb-2 font-serif text-3xl font-bold text-primary md:text-4xl">{stat.number}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={scrollViewport} className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">Our Core Values</h2>
              <p className="mx-auto max-w-2xl text-sm text-muted-foreground">These principles guide everything we do at Dimedicare</p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={scrollViewport} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <motion.div key={value.title} variants={staggerItem} whileHover={{ y: -6 }} className="group rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold">{value.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-sage-100/20">
          <div className="container mx-auto px-6">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={scrollViewport} className="mx-auto max-w-3xl text-center">
              <h2 className="mb-5 font-serif text-3xl font-bold">Our Expert Team</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed text-sm">
                Our team consists of certified healthcare professionals, registered dietitians, fitness trainers, and wellness experts who are passionate about helping you achieve your health goals.
              </p>
              <span className="pill-badge text-xs">
                <Users className="h-3.5 w-3.5 text-primary" />
                50+ Expert Contributors
              </span>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={scrollViewport} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-forest-700 to-forest-900 p-12 text-center text-primary-foreground">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
              <div className="relative z-10">
                <h2 className="mb-4 font-serif text-3xl font-bold">Have Questions?</h2>
                <p className="mx-auto mb-8 max-w-xl text-cream-200/70 text-sm">
                  We'd love to hear from you. Whether you have a question about our content, want to collaborate, or just want to say hello.
                </p>
                <Link href="/contact">
                  <motion.span whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center rounded-full bg-cream-100 px-6 py-2.5 text-xs font-semibold text-forest-800 hover:bg-white transition-colors shadow-sm cursor-pointer">
                    Get in Touch
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer categories={categories} />
    </div>
  );
}
