import { useState } from "react";
import { Mail, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome aboard!",
      description: "You've been successfully subscribed to our newsletter.",
    });
    setEmail("");
  };

  const benefits = [
    "Weekly health and fitness tips",
    "Exclusive workout routines",
    "Nutrition guides and recipes",
    "Early access to new content",
    "Expert wellness advice",
    "Product reviews and recommendations",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Newsletter</h1>
            <p className="max-w-2xl text-lg">
              Join thousands of health enthusiasts receiving weekly tips and exclusive content.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 rounded-lg border bg-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                <Mail className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="mb-4 text-2xl font-bold">Stay Informed, Stay Healthy</h2>
              <p className="mb-6 text-muted-foreground">
                Subscribe to our newsletter and receive expert health tips, workout plans, and nutrition
                guides delivered straight to your inbox every week.
              </p>
              
              <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>

              <div className="border-t pt-6">
                <h3 className="mb-4 font-semibold">What You'll Receive:</h3>
                <div className="grid gap-3 text-left sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;
