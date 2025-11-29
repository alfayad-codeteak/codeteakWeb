"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../components/Navigation";

export default function ProductsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
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

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

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

  const products = [
    {
      id: "yaadro",
      name: t.products.yaadro.name,
      description: t.products.yaadro.description,
      image: "/mockup/yaadro.png",
      features: t.products.yaadro.features
    },
    {
      id: "lens",
      name: t.products.lens.name,
      description: t.products.lens.description,
      image: "/mockup/lens.png",
      features: t.products.lens.features
    }
  ];

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

      {/* Main Content */}
      <main className="pt-20 md:pt-24 pb-20 md:pb-0 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              {t.products.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-[#FC4B01]/50">
                    {/* Product Image */}
                    <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="w-full h-full object-contain p-8"
                      />
                    </div>
                    
                    {/* Product Content */}
                    <div className="p-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{product.name}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Features List */}
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FC4B01]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[#FC4B01] font-semibold group-hover:gap-3 transition-all">
                        <span>{t.products.viewDetails}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

