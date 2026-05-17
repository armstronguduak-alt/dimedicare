import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scrollViewport } from "@/lib/animations";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Message sent successfully!", description: "We'll get back to you within 24-48 hours." });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", details: "contact@dimedicare.com", subtitle: "We'll respond within 24 hours" },
    { icon: Phone, title: "Call Us", details: "+1 (555) 123-4567", subtitle: "Mon-Fri from 9am to 6pm" },
    { icon: MapPin, title: "Visit Us", details: "123 Health Street", subtitle: "Wellness City, WC 12345" },
    { icon: Clock, title: "Business Hours", details: "Monday - Friday", subtitle: "9:00 AM - 6:00 PM EST" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative overflow-hidden bg-gradient-to-br from-primary via-forest-700 to-forest-900 py-24 text-primary-foreground">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container relative mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
              <MessageSquare className="mr-2 h-4 w-4" />
              We'd Love to Hear From You
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 font-serif text-5xl font-bold md:text-6xl text-cream-50">Contact Us</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mx-auto max-w-2xl text-lg text-cream-200/70">
              Have questions, feedback, or just want to say hello? Our team is here to help you on your health journey.
            </motion.p>
          </div>
        </motion.section>

        {/* Form & Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-5">
              {/* Form */}
              <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={scrollViewport} className="lg:col-span-3">
                <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm md:p-10">
                  <h2 className="mb-2 font-serif text-3xl font-bold">Send us a Message</h2>
                  <p className="mb-8 text-muted-foreground text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold">Full Name</label>
                        <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="rounded-xl h-12 bg-secondary/20 border-border/60" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold">Email Address</label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="rounded-xl h-12 bg-secondary/20 border-border/60" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
                      <Input id="subject" name="subject" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} required className="rounded-xl h-12 bg-secondary/20 border-border/60" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold">Message</label>
                      <Textarea id="message" name="message" placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleChange} required rows={6} className="rounded-xl bg-secondary/20 border-border/60 resize-none" />
                    </div>
                    <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-premium btn-premium-filled w-full flex items-center justify-center gap-2 h-12">
                      {isSubmitting ? (
                        <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> Sending...</>
                      ) : (
                        <><Send className="h-4 w-4" /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Info Cards */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={scrollViewport} className="lg:col-span-2 space-y-4">
                <h2 className="font-serif text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground text-sm mb-6">Choose the most convenient way to reach us.</p>
                {contactInfo.map((item) => (
                  <motion.div key={item.title} variants={staggerItem} whileHover={{ y: -4 }} className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-shadow hover:shadow-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-foreground text-sm">{item.details}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;