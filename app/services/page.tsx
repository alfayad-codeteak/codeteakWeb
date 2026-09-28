"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ServicesSection from "../components/ServicesSection";
import type { Language } from "@/lib/translations";

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  // Force light theme on this page; restore previous theme when leaving
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    window.scrollTo(0, 0);

    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");

    root.classList.remove("dark");

    const savedLanguage = localStorage.getItem("language") as "en" | "ar" | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLanguage;
    }

    return () => {
      const restore = savedTheme || (wasDark ? "dark" : "light");
      if (restore === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

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

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#fff" }}>
      <Navigation
        theme="light"
        language={language}
        isMounted={isMounted}
        isScrolled={isScrolled}
        showBackToTop={showBackToTop}
        hideThemeToggle
        onThemeChange={() => {
          // Theme locked to light on this page
        }}
        onLanguageChange={changeLanguage}
        onScrollToTop={scrollToTop}
      />

      <main>
        <ServicesSection language={language as Language} isStandalonePage={true} />
      </main>

      <div className="pb-20 md:pb-8" style={{ backgroundColor: "#fff" }} />
    </div>
  );
}
