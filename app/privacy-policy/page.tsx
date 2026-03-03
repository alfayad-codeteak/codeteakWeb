"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

export default function PrivacyPolicyPage() {
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
              <span className="text-foreground">Privacy</span>{" "}
              <span className="text-[#FC4B01]">Policy</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground font-mono">
              Last Updated: March 2, 2026
            </p>
          </header>

          <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Introduction
              </h2>
              <p className="mb-3">
                At CodeTeak Technologies LLC, our mission is to provide
                world-class IT solutions and power the next generation of
                commerce through our products like Yaadro.ae. To do this,
                we collect and use information about:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>
                  <span className="font-semibold text-foreground">
                    Merchants and Clients:
                  </span>{" "}
                  Businesses using CodeTeak services or Yaadro products to
                  power their operations.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    End Customers:
                  </span>{" "}
                  Individuals who shop at a Yaadro-powered business or use
                  applications developed by CodeTeak.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Visitors:
                  </span>{" "}
                  Anyone visiting CodeTeak.com, Yaadro.ae, or contacting
                  our support team.
                </li>
              </ul>
              <p className="mb-3">
                This Privacy Policy helps you understand how we collect,
                use, and share your personal information. By using our
                Services or Products, you agree to these practices.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">
                  Mandatory UAE Disclosures:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    &quot;All credit/debit cards’ details and personally
                    identifiable information will NOT be stored, sold,
                    shared, rented or leased to any third parties.&quot;
                  </li>
                  <li>
                    &quot;https://codeteak.com and its products (including
                    Yaadro.ae) will not pass any debit/credit card details
                    to third parties.&quot;
                  </li>
                  <li>
                    &quot;CodeTeak is not responsible for the privacy
                    policies of websites to which it links. If you provide
                    any information to such third parties, different rules
                    regarding the collection and use of your personal
                    information may apply.&quot;
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Our Values
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">
                    Your information belongs to you:
                  </span>{" "}
                  We aim to limit the information we collect to only what
                  is necessary. We delete or anonymize data when it is no
                  longer needed.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    We protect your information from others:
                  </span>{" "}
                  We will refuse requests for your personal information
                  unless you give us permission or we are legally required
                  to do so.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    We help you meet privacy obligations:
                  </span>{" "}
                  For merchants using Yaadro.ae, we build our products to
                  be privacy-friendly and provide documentation to help you
                  comply with your local privacy laws.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Why we process your information
              </h2>
              <p className="mb-3">
                We process your information to fulfill contractual
                obligations (e.g., managing your Yaadro subscription or
                developing your custom software) and for &quot;legitimate
                interests&quot; such as:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Preventing risk, fraud, and unauthorized access.</li>
                <li>
                  Answering support tickets and providing technical
                  assistance.
                </li>
                <li>
                  Providing reporting, analytics, and performance insights
                  for your business.
                </li>
                <li>
                  Improving our AI models and platform features (with your
                  consent).
                </li>
                <li>Assisting with marketing and communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Your rights over your information
              </h2>
              <p className="mb-3">
                Whether you are a client of our agency or a vendor on
                Yaadro, you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-3">
                <li>
                  <span className="font-semibold text-foreground">
                    Access and Portability:
                  </span>{" "}
                  Request a copy of the personal information we hold about
                  you.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Correction:
                  </span>{" "}
                  Request that we amend inaccurate information.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Deletion:
                  </span>{" "}
                  Request that we delete your personal data under certain
                  conditions.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Restriction:
                  </span>{" "}
                  Object to certain processing (like direct marketing).
                </li>
              </ul>
              <p>
                <span className="font-semibold text-foreground">
                  Note for End Customers:
                </span>{" "}
                If you are a customer shopping on a store powered by
                Yaadro.ae, you must contact that merchant directly to
                exercise your rights. CodeTeak acts as a &quot;Data
                Processor&quot; on behalf of the merchant and cannot decide
                how to process your data without their instruction.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Where we send your information
              </h2>
              <p>
                CodeTeak is a UAE &amp; INDIA based company. We may work
                with global partners and process data across borders. When
                we transfer data outside of your country, we take steps to
                ensure it is protected according to the highest data
                protection standards.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Google OAuth &amp; Integration Data
              </h2>
              <p className="mb-3">
                For users of CodeTeak Connect or integrations involving
                Google Sheets and WhatsApp:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  We strictly adhere to the Google API Services User Data
                  Policy, including &quot;Limited Use&quot; requirements.
                </li>
                <li>
                  Our app requests only the minimum permissions necessary
                  to enhance your workflow (e.g., syncing Yaadro orders to
                  Google Sheets).
                </li>
                <li>
                  We do not transfer or sell this data to third parties,
                  nor do we allow humans to read your data without explicit
                  consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                AI Data Sharing and Third-Party Use
              </h2>
              <p className="mb-3">
                At CodeTeak and Yaadro, we prioritize the security of your
                business data:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">
                    No Forced Sharing:
                  </span>{" "}
                  We do not share, sell, or distribute your data to
                  third-party AI models or services without your explicit
                  consent.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Opt-in AI Features:
                  </span>{" "}
                  While our platform offers advanced AI features (such as
                  automated product descriptions or chatbots), your data is
                  only processed by these models if you choose to activate
                  these features.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Transparency:
                  </span>{" "}
                  If you use our AI integrations, we ensure that the data
                  is processed only to the extent necessary to provide the
                  specific AI functionality you requested.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                How we use “cookies”
              </h2>
              <p>
                We use cookies to maintain your session, remember your
                preferences, and analyze how users interact with our
                websites and the Yaadro platform. You can manage your
                cookie preferences through your browser settings, though
                some features of our products may not function correctly
                without them.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                How we protect your information
              </h2>
              <p>
                Our security teams work tirelessly to protect the integrity
                of our platforms. We use industry-standard encryption and
                security protocols. However, no method of transmission over
                the Internet is 100% secure; therefore, we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                Payment Confirmation
              </h2>
              <p>
                Once a payment is made for any CodeTeak service or Yaadro
                subscription, a confirmation notice will be sent to the
                client via email within 24 hours of receipt.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                How you can reach us
              </h2>
              <p className="space-y-1">
                <span className="block">CodeTeak Support</span>
                <span className="block">
                  Email:{" "}
                  <a
                    href="mailto:info@codeteak.com"
                    className="text-[#FC4B01] hover:underline"
                  >
                    info@codeteak.com
                  </a>
                </span>
                <span className="block">
                  Mobile:{" "}
                  <a
                    href="tel:+971525759242"
                    className="text-[#FC4B01] hover:underline"
                  >
                    +971 525759242
                  </a>
                </span>
                <span className="block">
                  Website:{" "}
                  <a
                    href="https://codeteak.com"
                    className="text-[#FC4B01] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    codeteak.com
                  </a>
                </span>
                <span className="block">
                  Office: Index Exchange Building, Opposite Wimpy
                  Restaurant, Naif Road, Dubai
                </span>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

