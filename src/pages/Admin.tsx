import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, LayoutDashboard, FileText, Eye, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArticlesTable from "@/components/admin/ArticlesTable";
import { motion } from "framer-motion";
import {
  fadeInUp, staggerContainer, staggerItem, adminCard, scrollViewport
} from "@/lib/animations";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (error || !roles) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-12 w-12 rounded-full border-3 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = [
    { label: "Total Articles", value: "24", icon: FileText, change: "+3 this week", color: "text-primary" },
    { label: "Total Views", value: "12.4K", icon: Eye, change: "+18% vs last month", color: "text-forest-500" },
    { label: "Subscribers", value: "1,247", icon: Users, change: "+52 new", color: "text-sage-500" },
    { label: "Engagement", value: "68%", icon: TrendingUp, change: "+5.2%", color: "text-forest-400" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Dashboard Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-14"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-sage-400/10 rounded-full translate-y-1/2 blur-2xl" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <LayoutDashboard className="h-5 w-5 text-cream-100" />
                  </div>
                  <span className="text-label text-cream-200/60">Admin Panel</span>
                </div>
                <h1 className="font-serif text-4xl font-bold text-cream-50 mb-1">Dashboard</h1>
                <p className="text-cream-200/60 text-sm">Manage articles, content, and analytics</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/admin/article/new")}
                  className="flex items-center gap-2 rounded-full bg-cream-100 px-5 py-2.5 text-sm font-semibold text-forest-800 hover:bg-white transition-colors shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  New Article
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 text-sm font-medium text-cream-100 hover:bg-white/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <div className="container mx-auto px-6 -mt-8 relative z-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={adminCard}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl bg-card border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className={`h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="font-serif text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-primary font-medium mt-1">{stat.change}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Articles Table */}
        <div className="container mx-auto px-6 py-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Articles</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage and organize your content</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pill-badge text-xs cursor-pointer"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Analytics
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
              <ArticlesTable />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
