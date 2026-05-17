import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { Save, Sparkles, Image as ImageIcon, ArrowLeft, FileEdit } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface Category {
  id: string;
  name: string;
}

const AdminArticleEdit = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [imageStyle, setImageStyle] = useState("hyper-realistic");
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: "",
    status: "draft",
    seo_title: "",
    seo_description: "",
    read_time: 5,
  });

  useEffect(() => {
    fetchCategories();
    if (!isNew) {
      fetchArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id, name");
    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchArticle = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setFormData(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo_title: title,
    }));
  };

  const handleGenerateContent = async () => {
    if (!formData.title || !formData.category_id) {
      toast({
        title: "Missing Information",
        description: "Please enter a title and select a category first",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const category = categories.find((c) => c.id === formData.category_id);
      
      const { data, error } = await supabase.functions.invoke("generate-article", {
        body: {
          title: formData.title,
          category: category?.name,
          tags: [],
        },
      });

      if (error) throw error;

      setFormData((prev) => ({
        ...prev,
        content: data.content,
        excerpt: data.excerpt,
        read_time: data.readTime,
        seo_description: data.seoDescription,
      }));

      toast({
        title: "Success!",
        description: "Article content generated successfully",
      });
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!formData.title) {
      toast({
        title: "Missing Title",
        description: "Please enter a title first",
        variant: "destructive",
      });
      return;
    }

    setGeneratingImage(true);
    try {
      const category = categories.find((c) => c.id === formData.category_id);
      const prompt = `A professional hero image for a health and fitness blog article titled "${formData.title}". ${category ? `Category: ${category.name}.` : ""} The image should be inspiring, modern, and visually striking.`;

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, style: imageStyle },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setFormData((prev) => ({
        ...prev,
        featured_image: data.imageUrl,
      }));

      toast({
        title: "Success!",
        description: "Hyper-realistic image generated successfully",
      });
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const articleData = {
        ...formData,
        author_id: session.user.id,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      };

      let result;
      if (isNew) {
        result = await supabase.from("articles").insert([articleData]).select().single();
      } else {
        result = await supabase.from("articles").update(articleData).eq("id", id).select().single();
      }

      if (result.error) throw result.error;

      toast({
        title: "Success!",
        description: `Article ${isNew ? "created" : "updated"} successfully`,
      });

      navigate("/admin");
    } catch (error: any) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-10"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-cream-200/60 hover:text-cream-100 transition-colors text-sm mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <FileEdit className="h-5 w-5 text-cream-100" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-cream-50">
                {isNew ? "New Article" : "Edit Article"}
              </h1>
            </motion.div>
          </div>
        </motion.section>

        {/* Form */}
        <div className="container mx-auto px-6 py-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl space-y-8"
          >
            {/* Title */}
            <motion.div variants={staggerItem} className="space-y-2">
              <Label className="text-sm font-semibold">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter article title"
                className="rounded-xl h-12 bg-secondary/20 border-border/60 focus:border-primary text-base"
              />
            </motion.div>

            {/* Slug */}
            <motion.div variants={staggerItem} className="space-y-2">
              <Label className="text-sm font-semibold">Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="article-url-slug"
                className="rounded-xl h-12 bg-secondary/20 border-border/60 focus:border-primary font-mono text-sm"
              />
            </motion.div>

            {/* Category & Status */}
            <motion.div variants={staggerItem} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Category *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger className="rounded-xl h-12 bg-secondary/20 border-border/60">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="rounded-xl h-12 bg-secondary/20 border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div variants={staggerItem} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Featured Image</Label>
                <div className="flex items-center gap-2">
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger className="w-[140px] rounded-xl h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hyper-realistic">Hyper Realistic</SelectItem>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="editorial">Editorial</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGenerateImage}
                    disabled={generatingImage}
                    className="pill-badge text-xs cursor-pointer hover:border-primary/40"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    {generatingImage ? "Generating..." : "Generate AI Image"}
                  </motion.button>
                </div>
              </div>
              <Input
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="Image URL or data URI"
                className="rounded-xl h-12 bg-secondary/20 border-border/60 focus:border-primary"
              />
              {formData.featured_image && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={formData.featured_image}
                  alt="Preview"
                  className="mt-2 h-56 w-full rounded-2xl object-cover border border-border/30"
                />
              )}
            </motion.div>

            {/* Excerpt */}
            <motion.div variants={staggerItem} className="space-y-2">
              <Label className="text-sm font-semibold">Excerpt</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the article"
                rows={3}
                className="rounded-xl bg-secondary/20 border-border/60 focus:border-primary"
              />
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerItem} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Content *</Label>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGenerateContent}
                  disabled={generating}
                  className="pill-badge text-xs cursor-pointer hover:border-primary/40"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {generating ? "Generating..." : "Generate with AI"}
                </motion.button>
              </div>
              <div className="rounded-2xl border border-border/60 overflow-hidden">
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>
            </motion.div>

            {/* SEO Fields */}
            <motion.div variants={staggerItem} className="rounded-2xl border border-border/50 bg-sage-100/20 p-6 space-y-5">
              <h3 className="font-serif text-lg font-bold text-foreground">SEO Settings</h3>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">SEO Title</Label>
                <Input
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder="SEO optimized title"
                  maxLength={60}
                  className="rounded-xl h-12 bg-background border-border/60 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">{formData.seo_title.length}/60 characters</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">SEO Description</Label>
                <Textarea
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  placeholder="SEO meta description"
                  rows={2}
                  maxLength={160}
                  className="rounded-xl bg-background border-border/60 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">{formData.seo_description.length}/160 characters</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={staggerItem} className="flex justify-end gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/admin")}
                className="btn-premium btn-premium-outline"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={loading}
                className="btn-premium btn-premium-filled flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Article"}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminArticleEdit;
