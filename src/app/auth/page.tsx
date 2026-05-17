"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import { Mail, Lock, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Header from "@/components/Header";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      }
    });
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success!", description: "Please check your email to confirm your account." });
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "You have successfully signed in." });
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        {/* Left: Decorative Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-hero-gradient"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1600&fit=crop"
              alt="Wellness"
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <div />
            <div className="max-w-md">
              <h2 className="font-serif text-3xl font-bold text-cream-50 leading-tight mb-3">
                Transforming Health Through Function & Lifestyle
              </h2>
              <p className="text-cream-200/70 text-sm leading-relaxed">
                Join our community of wellness enthusiasts and health professionals dedicated to functional health.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Intentional Movement", "Purposeful Breathing", "Inner Harmony"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-[10px] text-cream-100 font-medium">
                    <Leaf className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-cream-200/40 text-xs">
              © {new Date().getFullYear()} Dimedicare
            </p>
          </div>
        </motion.div>

        {/* Right: Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12"
        >
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-8 text-center">
              <div className="relative h-8 w-32 mx-auto mb-4">
                <Image src={logo} alt="Dimedicare" fill className="object-contain" />
              </div>
            </div>

            <motion.div variants={scaleIn} initial="hidden" animate="visible">
              <div className="text-center mb-6">
                <h1 className="font-serif text-2xl font-bold text-foreground mb-1.5">Welcome Back</h1>
                <p className="text-muted-foreground text-xs">
                  Sign in to access your dashboard and manage content
                </p>
              </div>

              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full bg-secondary/60 p-1 h-10">
                  <TabsTrigger value="signin" className="rounded-full text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                    Log In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-full text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 rounded-xl h-10 bg-secondary/20 border-border/60 focus:border-primary text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                        <Input
                          id="signin-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 rounded-xl h-10 bg-secondary/20 border-border/60 focus:border-primary text-sm"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-foreground text-background h-10 text-xs font-semibold hover:bg-foreground/90 transition-colors mt-2"
                    >
                      {loading ? "Logging in..." : "Log In"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 rounded-xl h-10 bg-secondary/20 border-border/60 focus:border-primary text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                        <Input
                          id="signup-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="pl-10 rounded-xl h-10 bg-secondary/20 border-border/60 focus:border-primary text-sm"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border-2 border-primary bg-primary text-primary-foreground h-10 text-xs font-semibold hover:bg-forest-800 transition-colors mt-2"
                    >
                      {loading ? "Creating account..." : "Sign Up"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
