"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ArticlesTable from "@/components/admin/ArticlesTable";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your articles and content</p>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-xs font-medium text-destructive hover:text-destructive/80 transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <ArticlesTable />
          </div>
        </div>
      </main>
    </div>
  );
}
