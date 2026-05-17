import { useState } from "react";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp, scaleIn } from "@/lib/animations";
import { supabase } from "@/integrations/supabase/client";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
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
        toast({ title: "Welcome aboard!", description: "You've been subscribed to our wellness newsletter." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-forest-700 to-forest-900 p-8 md:p-12 text-primary-foreground shadow-lg"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-sage-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
      
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          variants={scaleIn}
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <Sparkles className="h-5 w-5 text-cream-100" />
        </motion.div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 tracking-tight text-cream-50">
          Stay Healthy, Stay Updated
        </h3>
        <p className="text-cream-200/80 mb-6 text-sm leading-relaxed max-w-md mx-auto">
          Join our community. Get weekly health insights, nutrition tips, and exclusive content delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex flex-col sm:flex-row max-w-md gap-3">
          <div className={`relative flex-1 transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
              className="w-full rounded-full bg-white/10 border border-white/20 px-10 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 backdrop-blur-sm transition-all"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-full bg-cream-100 px-6 py-3 text-sm font-semibold text-forest-800 hover:bg-white transition-colors shadow-lg whitespace-nowrap"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </form>

        <p className="mt-4 text-[10px] text-cream-200/50">
          No spam. Unsubscribe anytime. Read our privacy policy.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterBox;
