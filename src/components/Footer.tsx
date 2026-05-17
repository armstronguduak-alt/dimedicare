"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, scrollViewport } from "@/lib/animations";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer({ categories = [] }: { categories?: any[] }) {
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={staggerContainer}
      className="border-t border-border/50 bg-card/50"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={staggerItem} className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block relative h-8 w-28">
              <Image src={logo} alt="Dimedicare" fill className="object-contain object-left" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Your trusted source for functional health, fitness guidance, and holistic wellness.
            </p>
            <div className="flex space-x-2">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 font-serif text-sm font-bold text-foreground">Categories</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 font-serif text-sm font-bold text-foreground">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 font-serif text-sm font-bold text-foreground">Stay Updated</h3>
            <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
              Subscribe to our newsletter for weekly health tips and wellness insights.
            </p>
            <Link href="/newsletter">
              <motion.span
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-premium btn-premium-filled text-[11px] px-4 py-2 inline-flex"
              >
                Subscribe Now
                <ArrowUpRight className="ml-1.5 h-3 w-3" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Dimedicare. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for better health
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}