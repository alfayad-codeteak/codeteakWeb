"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../components/Navigation";
import TeamSection from "../components/TeamSection";

export default function AboutPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const t = getTranslations(language as Language);

  const updateTheme = (newTheme: "light" | "dark") => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme); // Update React state immediately
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      
      // Check for saved theme preference or default to dark
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      updateTheme(initialTheme);

      // Check for saved language preference or default to English
      const savedLanguage = localStorage.getItem("language") as "en" | "ar" | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
        document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation Component */}
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

      {/* About Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 min-h-screen flex items-center pb-20 md:pb-20">
        <div className="container mx-auto max-w-7xl w-full">
          {/* Large Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-bold mb-8 md:mb-16 uppercase tracking-tight leading-none"
          >
            <span className="text-foreground">{t.about.title} </span>
            <span className="text-[#FC4B01]">{t.about.titleHighlight}</span>
          </motion.h2>

          {/* Content */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t.about.description1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.description2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-16"
          >
            <span className="block text-sm sm:text-base md:text-lg font-mono tracking-[0.25em] uppercase text-muted-foreground">
              Meet our
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-[#FC4B01] mt-2">
              Founder
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-12"
          >
            {/* Founder image */}
            <div className="w-full md:w-[38%] flex justify-center md:justify-start">
              <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-full overflow-hidden border border-border/60  bg-gradient-to-b from-muted/40 to-background">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
                <div className="absolute inset-[3px] rounded-full overflow-hidden">
                  <img
                    src="/core-team/rizwan.png"
                    alt="Muhammed Rizwan P"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Founder text */}
            <div className="w-full md:w-[62%] space-y-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Founder & Core Member
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Muhammed Rizwan P
                </h3>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Rizwan founded CodeTeak with a simple belief: modern software should feel
                effortless for users while being deeply reliable for businesses. With a
                background in full‑stack engineering and product thinking, he spends his
                time working closely with clients, shaping problem statements into clear
                roadmaps, and guiding the team toward shipping pragmatic, high‑impact
                solutions.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                As the founder, he sits at the intersection of strategy, design, and
                engineering—from early discovery workshops, through architecture
                decisions, to reviewing final builds. His focus is on building long‑term
                partnerships, not just one‑off projects, so that every product we ship can
                evolve, scale, and keep creating value over time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-foreground">
              {t.faq.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t.faq.subtitle}
            </p>
          </motion.div>

          <div className="space-y-4">
            {t.faq.items.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-[#FC4B01] pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

