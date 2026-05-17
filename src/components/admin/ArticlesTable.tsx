"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ArticlesTable() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateNew = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("articles")
        .insert({
          title: "New Draft Article",
          status: "draft",
          author_id: session.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({ title: "Draft created!" });
      // In Next.js, navigate to the new ID
      router.push(`/admin/edit/${data.id}`);
    } catch (error) {
      toast({ title: "Error creating draft", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleCreateNew} size="sm">Create New Article</Button>
      </div>
      <p className="text-sm text-muted-foreground">Article management table will be loaded here.</p>
    </div>
  );
}
