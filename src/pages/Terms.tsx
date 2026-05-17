import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, CheckCircle, AlertTriangle, Stethoscope, ShieldX, FileWarning, Link2, RefreshCw, Scale, Mail } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: "Agreement to Terms",
      content: "By accessing and using Dimedicare, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website."
    },
    {
      icon: FileText,
      title: "Use License",
      content: "Permission is granted to temporarily access the materials on Dimedicare for personal, non-commercial use only. This license shall automatically terminate if you violate any of these restrictions. Upon termination, you must destroy any downloaded materials in your possession."
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      content: "The materials on Dimedicare are provided on an 'as is' basis. Dimedicare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      icon: Stethoscope,
      title: "Medical Disclaimer",
      content: "The content on this website is for informational purposes only and should not be considered medical advice. The information provided is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition."
    },
    {
      icon: ShieldX,
      title: "Limitations of Liability",
      content: "In no event shall Dimedicare or its suppliers be liable for any damages including, without limitation, damages for loss of data or profit, or due to business interruption arising out of the use or inability to use the materials on Dimedicare, even if Dimedicare has been notified orally or in writing of the possibility of such damage."
    },
    {
      icon: FileWarning,
      title: "Accuracy of Materials",
      content: "The materials appearing on Dimedicare could include technical, typographical, or photographic errors. Dimedicare does not warrant that any of the materials on its website are accurate, complete, or current. Dimedicare may make changes to the materials contained on its website at any time without notice."
    },
    {
      icon: Link2,
      title: "External Links",
      content: "Dimedicare has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Dimedicare of the site. Use of any such linked website is at the user's own risk."
    },
    {
      icon: RefreshCw,
      title: "Modifications",
      content: "Dimedicare may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service. We encourage you to periodically review this page for the latest information on our terms."
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location for any disputes arising from or related to these terms."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-24 text-primary-foreground">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm animate-fade-in">
              <FileText className="mr-2 h-4 w-4" />
              Legal Information
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in stagger-1">
              Terms & Conditions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 animate-fade-in stagger-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border bg-muted/30 p-8 animate-fade-in">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to Dimedicare. These Terms and Conditions govern your use of our website and services.
                By accessing or using Dimedicare, you agree to comply with and be bound by these terms. 
                Please read them carefully before using our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="container mx-auto px-4 pb-20">
          <div className="mx-auto max-w-4xl space-y-6">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="group rounded-2xl border bg-card p-8 transition-all duration-500 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-16">{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="bg-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-2xl border-2 border-accent/30 bg-card p-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-accent">Important Health Notice</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The information provided on Dimedicare is intended for general informational purposes only. 
                    It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified health provider with any questions 
                    you may have regarding a medical condition. Never disregard professional medical advice or delay 
                    in seeking it because of something you have read on this website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-fade-in">
                <Mail className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-3xl font-bold animate-fade-in stagger-1">Questions About Our Terms?</h2>
              <p className="mb-6 text-lg text-muted-foreground animate-fade-in stagger-2">
                If you have any questions about these Terms & Conditions, please contact us at
              </p>
              <a 
                href="mailto:legal@dimedicare.com"
                className="inline-flex items-center text-xl font-semibold text-primary transition-colors hover:text-primary/80 animate-fade-in stagger-3"
              >
                legal@dimedicare.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;