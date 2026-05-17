import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, tableRow } from "@/lib/animations";

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  view_count: number;
  published_at: string;
  categories: { name: string } | null;
}

const ArticlesTable = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          status,
          view_count,
          published_at,
          categories (name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });

      setArticles(articles.filter((a) => a.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-5 flex-1 animate-shimmer rounded-lg" />
            <div className="h-5 w-24 animate-shimmer rounded-lg" />
            <div className="h-5 w-20 animate-shimmer rounded-lg" />
            <div className="h-5 w-16 animate-shimmer rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-border/40 hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Views</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Published</TableHead>
            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-sage-100 flex items-center justify-center">
                      <Edit className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No articles found</p>
                    <p className="text-sm text-muted-foreground/60">Create your first article to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article, index) => (
                <motion.tr
                  key={article.id}
                  variants={tableRow}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-border/30 hover:bg-sage-100/20 transition-colors group"
                >
                  <TableCell className="font-medium text-sm max-w-xs truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <span className="pill-badge text-xs py-1 px-3">
                      {article.categories?.name || "Uncategorized"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={article.status === "published" ? "default" : "secondary"}
                      className={`rounded-full text-xs font-medium ${
                        article.status === "published"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {article.view_count.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString()
                      : "Draft"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`/article/${article.slug}`, "_blank")}
                        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/admin/article/${article.id}`)}
                        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDeleteId(article.id)}
                        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive/70" />
                      </motion.button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-full bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ArticlesTable;
