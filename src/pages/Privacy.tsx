import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Cookie, Database, Lock, UserCheck, Baby, Bell, Mail } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We may collect personal information that you voluntarily provide to us when you subscribe to our newsletter, fill out a contact form, leave comments on our articles, or participate in surveys or promotions."
        },
        {
          subtitle: "Automatic Information",
          text: "When you visit our website, we automatically collect certain information including your IP address, browser type and version, pages visited and time spent, referring website, and device information."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          text: "We use the information we collect to send newsletters and promotional materials, respond to your inquiries and requests, improve our website and content, analyze usage patterns and trends, prevent fraudulent activity, and comply with legal obligations."
        }
      ]
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking",
      content: [
        {
          text: "We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us understand how you interact with our content and allow us to remember your preferences. You can control cookies through your browser settings."
        }
      ]
    },
    {
      icon: Shield,
      title: "Third-Party Services",
      content: [
        {
          text: "We may use third-party services such as Google Analytics and advertising networks. These services may collect information about your online activities over time and across different websites. We recommend reviewing their privacy policies for more information."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
        }
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          text: "You have the right to access your personal information, correct inaccurate information, request deletion of your information, opt-out of marketing communications, and object to processing of your information. To exercise these rights, please contact us."
        }
      ]
    },
    {
      icon: Baby,
      title: "Children's Privacy",
      content: [
        {
          text: "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
        }
      ]
    },
    {
      icon: Bell,
      title: "Policy Updates",
      content: [
        {
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on this page with an updated effective date."
        }
      ]
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
              <Shield className="mr-2 h-4 w-4" />
              Your Privacy Matters
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in stagger-1">
              Privacy Policy
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
                Dimedicare ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit
                our website. Please read this policy carefully to understand our practices regarding your
                personal data.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="container mx-auto px-4 pb-20">
          <div className="mx-auto max-w-4xl space-y-8">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="group rounded-2xl border bg-card p-8 transition-all duration-500 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      {item.subtitle && (
                        <h3 className="mb-2 text-lg font-semibold text-foreground">{item.subtitle}</h3>
                      )}
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-fade-in">
                <Mail className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-3xl font-bold animate-fade-in stagger-1">Questions About Privacy?</h2>
              <p className="mb-6 text-lg text-muted-foreground animate-fade-in stagger-2">
                If you have any questions about this Privacy Policy, please contact us at
              </p>
              <a 
                href="mailto:privacy@dimedicare.com"
                className="inline-flex items-center text-xl font-semibold text-primary transition-colors hover:text-primary/80 animate-fade-in stagger-3"
              >
                privacy@dimedicare.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;