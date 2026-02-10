"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../components/Navigation";

export default function BlogPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const t = getTranslations(language as Language);

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
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      updateTheme(initialTheme);
      const savedLanguage = localStorage.getItem("language") as "en" | "ar" | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
        document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  if (!isMounted) return null;

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

      <section className="pt-24 pb-20 md:py-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-2xl w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 w-full flex flex-col items-center justify-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground uppercase tracking-tight">
              {t.blog.comingSoonPrefix}
              <span className="text-[#FC4B01]">{t.blog.comingSoonHighlight}</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
