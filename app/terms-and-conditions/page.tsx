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
              Last Updated: March 2, 2026
            </p>
          </header>

          <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Website is owned and operated by CodeTeak Technologies LLC.
              By signing up for a CodeTeak Account, subscribing to a
              CodeTeak Product (including but not limited to Yaadro-based
              solutions), or by using any CodeTeak Services, you are
              agreeing to be bound by the following terms and conditions
              (the &quot;Terms of Service&quot;).
            </p>
            <p>
              As used in these Terms of Service, &quot;we&quot;,
              &quot;us&quot;, &quot;CodeTeak&quot; and &quot;Yaadro&quot;
              mean the applicable CodeTeak contracting party.
            </p>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                1. UAE Statutory Compliance
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  &quot;United Arab Emirates is our country of domicile&quot;
                  and we stipulate that the governing law is the local law.
                </li>
                <li>
                  &quot;Any purchase, dispute or claim arising out of or in
                  connection with this website shall be governed and
                  construed in accordance with the laws of UAE.&quot;
                </li>
                <li>
                  &quot;Visa or MasterCard debit and credit cards in AED
                  will be accepted for payment.&quot;
                </li>
                <li>
                  &quot;The displayed price and currency at the checkout
                  page, will be the same price and currency printed on the
                  Transaction Receipt and the amount charged to the card
                  will be shown in your card currency.&quot;
                </li>
                <li>
                  &quot;We will not trade with or provide any services to
                  OFAC and sanctioned countries.&quot;
                </li>
                <li>
                  &quot;Cardholder must retain a copy of transaction
                  records and https://codeteak.com policies and
                  rules.&quot;
                </li>
                <li>
                  &quot;User is responsible for maintaining the
                  confidentiality of his account.&quot;
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                2. Description of Services &amp; Products
              </h2>
              <p>
                CodeTeak provides a dual-model offering:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <span className="font-semibold text-foreground">
                    Services:
                  </span>{" "}
                  Custom software development, mobile app creation, UI/UX
                  design, and IT consultancy.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Products:
                  </span>{" "}
                  Ready-to-deploy software solutions and e-commerce
                  platforms (such as the Yaadro ecosystem), available via
                  licensing or Subscription-as-a-Service (SaaS).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                3. Account &amp; License Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  To access CodeTeak products (like the Yaadro vendor
                  portal) or project management tools, you must register
                  for an Account.
                </li>
                <li>
                  You must be at least 18 years of age or the age of
                  majority in your jurisdiction.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Business Use:
                  </span>{" "}
                  You confirm that you are using CodeTeak Services/Products
                  for business purposes and not for personal or household
                  use.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    License:
                  </span>{" "}
                  When you purchase a CodeTeak Product (like a
                  white-label version of Yaadro), you are granted a
                  limited, non-transferable license. You may not
                  reverse-engineer, decompile, or attempt to extract the
                  source code of our products unless expressly permitted in
                  a separate written agreement.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                4. Project Development (Services)
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  For custom projects, a Statement of Work (SOW) will
                  define the scope.
                </li>
                <li>
                  CodeTeak reserves the right to stop work if the Client
                  fails to provide necessary feedback or assets within 14
                  days of a request.
                </li>
                <li>
                  Ownership of custom code is transferred to the client
                  only upon 100% completion of payment.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                5. Payment of Fees
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">
                    Subscription Fees:
                  </span>{" "}
                  Fees for products (SaaS) are billed in advance in 30-day
                  intervals.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Project Fees:
                  </span>{" "}
                  Custom services are billed based on milestones (e.g.,
                  Deposit, Beta Launch, Final Delivery).
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Taxes:
                  </span>{" "}
                  All Fees are exclusive of UAE VAT (5%) or other
                  governmental taxes. You are responsible for all
                  applicable Taxes based on your billing address.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Payment Failure:
                  </span>{" "}
                  If payment fails, we will attempt to charge the card
                  again after 3 days. After 3 failed attempts, CodeTeak
                  reserves the right to suspend the product license or
                  project work.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                6. Payment Confirmation
              </h2>
              <p>
                Once the payment is made, a confirmation notice will be
                sent to the client via email within 24 hours of receipt.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                7. Refund &amp; Cancellation Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">
                    Cancellation:
                  </span>{" "}
                  Customers can cancel their requested services/orders
                  within 24 hours of the transaction.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Refunds:
                  </span>{" "}
                  Refunds will be made back to the original payment
                  solution used by the customer. Please allow for up to 45
                  days for the refund transfer to be completed.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Product Policy:
                  </span>{" "}
                  For SaaS products (like Yaadro subscriptions), refunds
                  are only provided if CodeTeak fails to provide the
                  service/platform access as promised. Pro-rata refunds
                  for partial months of use are not provided.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                8. Intellectual Property &amp; Customer Content
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">
                    Your Content:
                  </span>{" "}
                  We do not claim any IP rights over the materials (logos,
                  product descriptions, data) you upload to our platforms.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    CodeTeak IP:
                  </span>{" "}
                  The design, architecture, and &quot;base code&quot; of
                  products like Yaadro remain the exclusive intellectual
                  property of CodeTeak.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Promotional Rights:
                  </span>{" "}
                  CodeTeak has the non-exclusive right to use your business
                  name and logo in our portfolio and marketing materials to
                  demonstrate our work.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                9. Limitation of Liability
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  CodeTeak and Yaadro shall not be liable for any direct,
                  indirect, incidental, or consequential damages (including
                  loss of profits, data, or business interruption).
                </li>
                <li>
                  Our total liability for any claim arising out of these
                  terms shall not exceed the amount paid by you to
                  CodeTeak in the 6 months preceding the claim.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    &quot;As Is&quot; Basis:
                  </span>{" "}
                  Services and Products are provided &quot;as is&quot;
                  without any warranty that they will be uninterrupted,
                  timely, or error-free.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                10. Confidentiality
              </h2>
              <p>
                Both parties agree to protect &quot;Confidential
                Information.&quot; This includes technical processes,
                formulas, software code, and business plans. This
                obligation survives the termination of the agreement for a
                period of 3 years.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                11. Termination
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You may cancel your Account at any time by contacting
                  CodeTeak Support.
                </li>
                <li>
                  Upon termination, CodeTeak will cease providing
                  Services, and your access to product dashboards
                  (including Yaadro vendor panels) will be revoked.
                </li>
                <li>
                  Any outstanding balances for work completed up to the
                  termination date become immediately due.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                12. DMCA &amp; Copyright
              </h2>
              <p>
                If you believe that a user of a CodeTeak product (e.g., a
                vendor on Yaadro) is infringing on your copyright, please
                submit a Takedown Notice to our legal team at
                {" "}
                <span className="font-mono text-foreground">
                  info@codeteak.com
                </span>
                .
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">
                13. Contact Information
              </h2>
              <p className="space-y-1">
                <span className="block">
                  CodeTeak IT Solutions
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
                  Location: Index Exchange Building, Opposite Wimpy
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

