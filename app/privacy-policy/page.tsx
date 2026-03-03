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
              Last Updated: January 10, 2026
            </p>
          </header>

          <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              CodeTeak Technologies LLC (&quot;CodeTeak&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and security of personal information. This Privacy Policy explains how we collect, use, disclose, transfer, and protect personal data when you interact with our website (codeteak.com), use our Services (including custom software development, IT consultancy, UI/UX design, and related professional services), or access our Products (ready-to-deploy software solutions and platforms available via licensing or subscription models).
            </p>
            <p>
              We operate in multiple regions, including the United Arab Emirates and India, and comply with applicable data protection laws in the jurisdictions where we process personal data, such as the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL) and India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act), along with other relevant regulations. Depending on your location, specific regional requirements may apply.
            </p>
            <p>
              By using our website, Services, or Products, you consent to the practices described in this Privacy Policy. If you do not agree, please do not use our offerings.
            </p>

            <section>
              <h2 className="font-semibold text-foreground mb-2">1. Information We Collect</h2>
              <p className="mb-2">We collect personal information in the following categories:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold text-foreground">Account and Contact Information:</span> Name, email address, phone number, business name, address, and login credentials when you register for an account, request a consultation, or subscribe to our Products.</li>
                <li><span className="font-semibold text-foreground">Business and Usage Data:</span> Information related to your business operations, such as project requirements, uploaded content (e.g., logos, product descriptions, data files), transaction details, and usage metrics of our platforms.</li>
                <li><span className="font-semibold text-foreground">Payment-Related Information:</span> Billing details necessary to process transactions (we do not store full credit/debit card details ourselves; payments are handled through secure third-party processors).</li>
                <li><span className="font-semibold text-foreground">Support and Communication Data:</span> Information provided in support tickets, emails, chats, or calls.</li>
                <li><span className="font-semibold text-foreground">Technical and Device Data:</span> IP address, browser type, device information, operating system, pages visited, time spent, referral sources, and cookies or similar technologies.</li>
                <li><span className="font-semibold text-foreground">End-User Data (as Processor):</span> For merchants or clients using our Products to serve their customers, we may process end-customer personal data (e.g., order details, contact info) solely on behalf of and under the instructions of the merchant/client.</li>
              </ul>
              <p className="mt-2">We limit collection to what is necessary for providing and improving our Services and Products.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
              <p className="mb-2">We process personal information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve our Services and Products (e.g., managing subscriptions, delivering custom development, offering support).</li>
                <li>To fulfill contractual obligations and process transactions.</li>
                <li>For legitimate business interests, such as fraud prevention, security, risk management, analytics, reporting, and platform enhancements.</li>
                <li>To communicate with you about your account, updates, support requests, or (with consent where required) marketing materials.</li>
                <li>To comply with legal obligations, respond to lawful requests, or protect our rights.</li>
                <li>For product improvement, including (with explicit consent) training or enhancing AI features where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">3. Legal Basis for Processing</h2>
              <p className="mb-2">We rely on:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-semibold text-foreground">Contractual necessity</span> — to deliver Services/Products you request.</li>
                <li><span className="font-semibold text-foreground">Legitimate interests</span> — for security, fraud prevention, analytics, and improvements (balanced against your rights).</li>
                <li><span className="font-semibold text-foreground">Consent</span> — for certain activities like marketing or optional AI features.</li>
                <li><span className="font-semibold text-foreground">Legal obligations</span> — where required by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">4. Sharing and Disclosure of Information</h2>
              <p className="mb-2">We do not sell personal information. We may share data with:</p>
              <ul className="list-disc pl-5 space-y-2 mb-3">
                <li>Service providers (e.g., hosting, payment processors, cloud services, analytics tools) under strict confidentiality and security obligations.</li>
                <li>Business partners only with your consent or as necessary for contracted services.</li>
                <li>In the event of a merger, acquisition, or asset sale.</li>
                <li>To comply with legal requirements, protect safety, or enforce our agreements.</li>
              </ul>
              <p className="font-semibold text-foreground mb-2">Mandatory Disclosures (UAE/India Compliance):</p>
              <p>All credit/debit card details and personally identifiable information are not stored, sold, shared, rented, or leased to third parties by CodeTeak. We do not pass debit/credit card details to third parties. CodeTeak is not responsible for the privacy practices of linked third-party websites.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">5. International Data Transfers</h2>
              <p>As a company operating in the UAE and India with global partners, personal data may be transferred across borders. We implement appropriate safeguards (e.g., standard contractual clauses, adequacy decisions where available, or other approved mechanisms) to ensure your data receives an equivalent level of protection in line with applicable laws.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">6. Third-Party Integrations (e.g., Google OAuth, APIs)</h2>
              <p className="mb-2">For integrations such as Google Sheets, WhatsApp, or similar services:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We request only minimum necessary permissions.</li>
                <li>We comply fully with the Google API Services User Data Policy, including Limited Use restrictions.</li>
                <li>We do not transfer, sell, or allow unauthorized access to integration data.</li>
                <li>Human review occurs only with explicit consent or as required for support/security.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">7. AI Features and Data Usage</h2>
              <p>Optional AI-powered features (e.g., content generation) process data only upon activation and to the extent necessary for the requested functionality. We do not share or use your business data for third-party AI training without explicit opt-in consent.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">8. Cookies and Tracking Technologies</h2>
              <p>We use cookies, pixels, and similar technologies for session management, preferences, analytics, and essential functionality. You can manage preferences via browser settings, though disabling may affect site performance. Our Cookie Policy (linked where applicable) provides more details.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">9. Data Security</h2>
              <p>We implement industry-standard technical and organizational measures (e.g., encryption, access controls, regular audits) to protect personal data. However, no internet transmission or storage method is completely secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">10. Data Retention</h2>
              <p>We retain personal data only as long as necessary for the purposes outlined, to comply with legal obligations, or to resolve disputes. Data is anonymized or deleted when no longer required.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">11. Your Rights</h2>
              <p className="mb-2">Depending on applicable law, you may have rights to:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Access, correct, or update your personal data.</li>
                <li>Request deletion (subject to exceptions).</li>
                <li>Restrict or object to certain processing.</li>
                <li>Data portability.</li>
                <li>Withdraw consent (where processing is consent-based).</li>
                <li>Lodge a complaint with a supervisory authority.</li>
              </ul>
              <p className="mb-2">For end-customers of our merchants/clients: Contact the merchant directly, as we act as a data processor and process data per their instructions.</p>
              <p>To exercise rights, contact us at the details below. We respond in accordance with applicable timelines.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">12. Children&apos;s Privacy</h2>
              <p>Our Services and Products are not directed to individuals under 18 (or the age of majority). We do not knowingly collect data from children.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">13. Changes to This Policy</h2>
              <p>We may update this Privacy Policy. Changes will be posted here with an updated effective date. Continued use constitutes acceptance.</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-2">14. Contact Us</h2>
              <p className="space-y-1">
                <span className="block font-semibold text-foreground">CodeTeak Technologies LLC</span>
                <span className="block">
                  Email:{" "}
                  <a href="mailto:info@codeteak.com" className="text-[#FC4B01] hover:underline">info@codeteak.com</a>
                </span>
                <span className="block">
                  Mobile:{" "}
                  <a href="tel:+971525759242" className="text-[#FC4B01] hover:underline">+971 525759242</a>
                </span>
                <span className="block">
                  Website:{" "}
                  <a href="https://codeteak.com" className="text-[#FC4B01] hover:underline" target="_blank" rel="noopener noreferrer">codeteak.com</a>
                </span>
                <span className="block">
                  Office: Index Exchange Building, Opposite Wimpy Restaurant, Naif Road, Dubai
                </span>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
