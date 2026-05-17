"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SidebarNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error && error.code === "23505") {
        toast({ title: "Already subscribed", description: "This email is already on our list." });
      } else if (error) {
        throw error;
      } else {
        toast({ title: "Success!", description: "You've been subscribed to our newsletter." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="mb-2 font-serif text-base font-bold text-foreground flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="h-3.5 w-3.5" />
          </div>
          Newsletter
        </h3>
        <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
          Get weekly health tips and wellness insights delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl bg-secondary/30 border border-border/60 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest-800 transition-colors shadow-sm"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <ArrowRight className="h-3 w-3" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default SidebarNewsletter;
