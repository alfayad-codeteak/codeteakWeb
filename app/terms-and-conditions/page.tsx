"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

export default function TermsAndConditionsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const updateTheme = (newTheme: "light" | "dark") => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);

      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      updateTheme(initialTheme);

      const savedLanguage = localStorage.getItem("language") as
        | "en"
        | "ar"
        | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
        document.documentElement.dir =
          savedLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  return (
    <div className="min-h-screen bg-background relative pb-20 md:pb-0">
      <Navigation
        theme={theme}
        language={language}
        isMounted={isMounted}
        isScrolled={isScrolled}
        showBackToTop={showBackToTop}
        onThemeChange={(newTheme) => {
          setTheme(newTheme);
          updateTheme(newTheme);
        }}
        onLanguageChange={changeLanguage}
        onScrollToTop={scrollToTop}
      />

      <section className="pt-24 pb-20 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
              <span className="text-foreground">Terms and</span>{" "}
              <span className="text-[#FC4B01]">Conditions</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground font-mono">
              Last Updated: January 10, 2026
            </p>
          </header>

          <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              This website is owned and operated by CodeTeak Technologies LLC. By signing up for a CodeTeak Account, subscribing to any CodeTeak Product, or using any CodeTeak Services, you agree to be bound by these terms and conditions (the &quot;Terms of Service&quot;).
            </p>
            <p>
              As used in these Terms of Service, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;, and &quot;CodeTeak&quot; refer to CodeTeak Technologies LLC or the applicable regional contracting entity.
            </p>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Regional Compliance and Governing Law
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  CodeTeak operates in multiple regions. Depending on your location or the region applicable to your use of our Services or Products, specific regional policies and requirements may apply, as implemented by CodeTeak from time to time.
                </li>
                <li>
                  Any dispute, claim, or matter arising out of or in connection with this website, our Services, or Products shall be governed and construed in accordance with the laws of the applicable region as determined by CodeTeak based on your location, billing address, or other relevant factors.
                </li>
                <li>
                  Cardholder must retain copies of transaction records and these Terms of Service along with any applicable regional policies.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of your account and login credentials.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Description of Services &amp; Products
              </h2>
              <p className="mb-2">CodeTeak provides a dual-model offering:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">Services:</span>{" "}
                  Custom software development, mobile and web application creation, UI/UX design, IT consultancy, and related professional services.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Products:</span>{" "}
                  Ready-to-deploy software solutions and platforms, available via licensing, one-time purchase, or Subscription-as-a-Service (SaaS) models.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Account &amp; License Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To access certain Products or project management tools, you must register for an Account.</li>
                <li>You represent that you are at least 18 years of age or the age of majority in your jurisdiction.</li>
                <li>You confirm that your use of CodeTeak Services and Products is for business purposes only and not for personal, household, or non-commercial use.</li>
                <li>
                  When you acquire a CodeTeak Product (such as a licensed or white-label solution), you are granted a limited, non-exclusive, non-transferable license to use it solely for your internal business purposes. You may not reverse-engineer, decompile, disassemble, or attempt to derive the source code of any Product unless expressly permitted under a separate written agreement.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Project Development (Services)
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>For custom development Services, the scope, deliverables, and timeline will be defined in a Statement of Work (SOW) or similar agreement.</li>
                <li>CodeTeak reserves the right to suspend or stop work if you fail to provide required feedback, approvals, content, or assets within 14 days of our written request.</li>
                <li>Ownership of any custom-developed code or deliverables is transferred to you only upon full payment of all fees due under the applicable SOW.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Payment of Fees
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Subscription fees for Products (SaaS or recurring access) are billed in advance on a recurring basis (typically monthly).</li>
                <li>Fees for custom Services are billed based on milestones (e.g., initial deposit, beta/milestone delivery, final completion).</li>
                <li>All fees are exclusive of any applicable taxes (such as VAT, GST, or other governmental taxes), which you are responsible for based on your billing address and applicable regional requirements.</li>
                <li>If a payment attempt fails, we may retry the charge after a short period. After repeated failed attempts, CodeTeak reserves the right to suspend your account, license access, or ongoing project work until payment is received.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Payment Confirmation
              </h2>
              <p>Upon successful payment, a confirmation notice will be sent to you via email within 24 hours.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Refund &amp; Cancellation Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You may cancel any requested Services or order within 24 hours of the transaction for a full refund, subject to applicable regional policies.</li>
                <li>Refunds will be processed back to the original payment method used. Please allow up to 45 days for the refund to be completed.</li>
                <li>For subscription-based Products, refunds are provided only if CodeTeak materially fails to deliver the promised access or service. No pro-rata refunds are offered for partial periods of use.</li>
                <li>Custom Services are generally non-refundable once work has commenced, except as otherwise agreed in the SOW.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Intellectual Property &amp; Customer Content
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You retain all intellectual property rights in any content, materials, logos, data, or information you upload or provide to us (&quot;Your Content&quot;). We do not claim ownership over Your Content.</li>
                <li>The underlying design, architecture, base code, and proprietary elements of our Products and Services remain the exclusive intellectual property of CodeTeak.</li>
                <li>You grant CodeTeak a non-exclusive, royalty-free right to use your business name and logo in our portfolio, case studies, and marketing materials solely to showcase our work (subject to any confidentiality obligations).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Limitation of Liability
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To the maximum extent permitted by law, CodeTeak shall not be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, business opportunities, or interruption), whether arising in contract, tort, or otherwise.</li>
                <li>Our total aggregate liability for any claim related to these Terms shall not exceed the total fees paid by you to CodeTeak in the 6 months immediately preceding the claim.</li>
                <li>Services and Products are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, including uninterrupted, error-free, timely, or fit-for-particular-purpose performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Confidentiality
              </h2>
              <p>
                Each party agrees to protect the other&apos;s Confidential Information (including technical data, source code, business plans, and proprietary processes) and not disclose it to third parties without prior written consent. This obligation survives termination of the agreement for 3 years.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Termination
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You may terminate your Account or subscription at any time by contacting CodeTeak Support.</li>
                <li>We may terminate or suspend your access for non-payment, breach of these Terms, or other material violations.</li>
                <li>Upon termination, access to dashboards, portals, and Services will cease, and any outstanding fees for completed work become immediately due.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                DMCA &amp; Copyright Infringement
              </h2>
              <p>
                If you believe content hosted or distributed via a CodeTeak Product infringes your copyright, please submit a written takedown notice to our legal team at{" "}
                <a href="mailto:info@codeteak.com" className="text-[#FC4B01] hover:underline">info@codeteak.com</a>.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Contact Information
              </h2>
              <p className="space-y-1">
                <span className="block font-semibold text-foreground">CodeTeak Technologies LLC</span>
                <span className="block">
                  Website:{" "}
                  <a href="https://codeteak.com" className="text-[#FC4B01] hover:underline" target="_blank" rel="noopener noreferrer">
                    codeteak.com
                  </a>
                </span>
                <span className="block">
                  Email:{" "}
                  <a href="mailto:info@codeteak.com" className="text-[#FC4B01] hover:underline">
                    info@codeteak.com
                  </a>
                </span>
                <span className="block">
                  Mobile:{" "}
                  <a href="tel:+971525759242" className="text-[#FC4B01] hover:underline">
                    +971 525759242
                  </a>
                </span>
                <span className="block">
                  Location: Index Exchange Building, Opposite Wimpy Restaurant, Naif Road, Dubai
                </span>
                <span className="block mt-2 text-muted-foreground/90">
                  (Additional regional offices may apply depending on your location; contact us for region-specific details or policies.)
                </span>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

