"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../components/Navigation";
import ProductsSplash from "../components/ProductsSplash";

export default function ProductsPageClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const t = getTranslations(language as Language);

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
      image: "/products-image/yaadro.png",
      features: t.products.yaadro.features,
      accent: "#6C3CE0",
    },
    {
      id: "lens",
      name: t.products.lens.name,
      description: t.products.lens.description,
      image: "/products-image/lens.png",
      features: t.products.lens.features,
      accent: "#FC4B01",
    },
  ];

  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#fff" }}>
      <ProductsSplash />
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

      {/* Welcome to Yaadro — 3D logo */}
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="shrink-0 flex justify-center"
            >
              <Image
                src="/products-image/logo-3d.png"
                alt="Yaadro"
                width={640}
                height={640}
                className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex-1 text-center md:text-start space-y-4 max-w-xl"
            >
              <p className="text-sm sm:text-base md:text-lg font-mono tracking-[0.25em] uppercase text-muted-foreground">
                {t.products.welcome.welcomeTo}
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-tight leading-none text-[#6C3CE0]">
                {t.products.welcome.brand}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
                {t.products.welcome.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Yaadro */}
      <section
        id="about-yaadro"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t.products.aboutYaadro.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {language === "en" ? (
                <>
                  <span className="text-foreground">About </span>
                  <span className="text-[#6C3CE0]">Yaadro</span>
                </>
              ) : (
                <span className="text-[#6C3CE0]">{t.products.aboutYaadro.title}</span>
              )}
            </h2>
            <div className="space-y-5">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.products.aboutYaadro.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.products.aboutYaadro.paragraph2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product sections — Yaadro + Lens only */}
      {products.map((product, index) => {
        const imageOnRight = index % 2 === 1;

        return (
          <section
            key={product.id}
            id={product.id}
            className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="container mx-auto max-w-7xl">
              <div
                className={`flex flex-col items-center gap-10 md:gap-14 lg:gap-20 ${
                  imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: imageOnRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2 flex justify-center"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={700}
                    className="w-full max-w-xl lg:max-w-none h-auto object-contain"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: imageOnRight ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full lg:w-1/2 space-y-5 md:space-y-6"
                >
                  <p
                    className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em]"
                    style={{ color: product.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    {product.name}
                  </h2>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {product.description}
                  </p>

                  <ul className="space-y-3 pt-1">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: product.accent }}
                        />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base hover:gap-3 transition-all"
                      style={{ color: product.accent }}
                    >
                      <span>{t.products.viewDetails}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <div className="pb-20 md:pb-8" style={{ backgroundColor: "#fff" }} />
    </main>
  );
}
