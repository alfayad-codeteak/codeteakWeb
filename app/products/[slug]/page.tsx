"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, TrendingUp, BarChart3, PieChart, Shield, Zap, Activity, ArrowUp, Sun, Moon, Mail, Twitter, Linkedin, Github, Instagram, Truck, ShoppingCart, Users, MessageSquare, Package, MapPin, Clock, Bell, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../../components/Navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMounted, setIsMounted] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First FAQ open by default
  
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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const products: Record<string, {
    name: string;
    description: string;
    longDescription: string;
    image: string;
    features: string[];
    benefits: string[];
  }> = {
    yaadro: {
      name: "Yaadro",
      description: "Delivery management system for supermarkets",
      longDescription: "Yaadro is a comprehensive delivery management system designed to seamlessly connect supermarkets, delivery partners, and customers. With dedicated mobile apps for supermarkets and delivery partners, plus a powerful web dashboard, Yaadro streamlines the entire delivery process from order placement to doorstep delivery.",
      image: "/mockup/yaadro.png",
      features: [
        "Real-time order tracking and management",
        "Dedicated mobile apps for supermarkets and delivery partners",
        "Comprehensive web dashboard for supermarket management",
        "Seamless communication between all parties",
        "Automated delivery assignment and routing",
        "Real-time notifications and updates",
        "Inventory management integration",
        "Payment processing and order history"
      ],
      benefits: [
        "Streamline delivery operations effortlessly",
        "Improve communication between all stakeholders",
        "Enhance customer satisfaction with real-time updates",
        "Increase delivery efficiency and reduce costs"
      ]
    },
    lens: {
      name: "Lens",
      description: "AI-Powered Face Recognition Attendance System",
      longDescription: "YaadroLens is an AI-powered face recognition attendance system for retail stores and supermarkets. It provides contactless, automated attendance tracking with offline capabilities, real-time analytics, and enterprise-grade security.",
      image: "/mockup/lens.png",
      features: [
        "DeepFace ML with 90%+ accuracy in employee identification",
        "Offline-first architecture - works without internet, auto-syncs when online",
        "Multi-tenant SaaS platform with secure, isolated data for multiple shops",
        "Real-time analytics dashboards and comprehensive reports",
        "Enterprise-grade security with JWT authentication and role-based access",
        "Employee management and attendance tracking",
        "ML performance monitoring and system health checks",
        "Scalable architecture supporting multiple locations and growing teams"
      ],
      benefits: [
        "Contactless attendance tracking - no physical check-ins required",
        "Works offline - automatically syncs when connection is restored",
        "90%+ accuracy in employee identification using advanced AI",
        "Real-time insights and analytics for better workforce management",
        "Enterprise security with multi-tenant data isolation",
        "Production-ready solution built on FastAPI, PostgreSQL, and Redis"
      ]
    }
  };

  const product = products[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 md:pb-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.productDetail.notFound}</h1>
          <Link href="/products" className="text-[#FC4B01] hover:underline">
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </div>
    );
  }

  // Special design for Yaadro
  if (slug === "yaadro") {
    const smartFeatures = [
      {
        title: t.productDetail.yaadro.smartFeatures.supermarketApp.title,
        description: t.productDetail.yaadro.smartFeatures.supermarketApp.description,
        icon: ShoppingCart,
        visual: "chart"
      },
      {
        title: t.productDetail.yaadro.smartFeatures.deliveryPartnerApp.title,
        description: t.productDetail.yaadro.smartFeatures.deliveryPartnerApp.description,
        icon: Truck,
        visual: "line"
      },
      {
        title: t.productDetail.yaadro.smartFeatures.webDashboard.title,
        description: t.productDetail.yaadro.smartFeatures.webDashboard.description,
        icon: Activity,
        visual: "donut"
      },
      {
        title: t.productDetail.yaadro.smartFeatures.realTimeTracking.title,
        description: t.productDetail.yaadro.smartFeatures.realTimeTracking.description,
        icon: MapPin,
        visual: "gauge"
      },
      {
        title: t.productDetail.yaadro.smartFeatures.smartCommunication.title,
        description: t.productDetail.yaadro.smartFeatures.smartCommunication.description,
        icon: MessageSquare,
        visual: "score"
      },
      {
        title: t.productDetail.yaadro.smartFeatures.orderManagement.title,
        description: t.productDetail.yaadro.smartFeatures.orderManagement.description,
        icon: Package,
        visual: "insights"
      }
    ];

    const partners = ["Loyal City", "Greens Fresh Mart", "Fresh World", "Families", "Mythri", "Dream Mart" , "Milliens" , "Rolla" , "All Season", "BigMart", "Brigade","Season Fresh","FreshCo Hyper", "Market Fresh","Grand Fresh Hyper Mart"
    ];

    return (
      <div className="min-h-screen bg-background relative pb-20 md:pb-0">
        {/* Navigation Component */}
        <Navigation
          theme={theme}
          language={language}
          isMounted={isMounted}
          isScrolled={isScrolled}
          showBackToTop={showBackToTop}
          onThemeChange={updateTheme}
          onLanguageChange={changeLanguage}
          onScrollToTop={scrollToTop}
        />

        {/* Hero Section */}
        <section className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-0">
              {/* Left Side - Headline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 md:space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
                  {language === "en" ? (
                    <>
                      Deliver Smarter,
                      <br />
                      <span className="text-[#FC4B01]">Connect Effortlessly</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#FC4B01]">تسليم</span> أذكى،
                      <br />
                      اتصال سلس
                    </>
                  )}
                </h1>
              </motion.div>

              {/* Right Side - Description & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6 flex flex-col items-start lg:items-end"
              >
                <p className="text-base sm:text-lg text-muted-foreground max-w-md text-left lg:text-right leading-relaxed">
                  {t.productDetail.yaadro.description}
                </p>
                <Link
                  href="/contact"
                  className="px-6 py-3 md:px-8 md:py-4 bg-[#FC4B01] text-white rounded-full font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Center - App Mockup with Floating Elements */}
            <div className="relative mt-8 md:mt-16 flex justify-center items-center gap-4 md:gap-8 overflow-hidden">
              {/* Red Mockup - Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3, x: -150, y: 80, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 0.5 },
                  scale: { duration: 1, delay: 0.5, type: "spring", stiffness: 120, damping: 15 },
                  x: { duration: 1, delay: 0.5, type: "spring", stiffness: 100, damping: 12 },
                  y: { duration: 1, delay: 0.5, type: "spring", stiffness: 100, damping: 12 },
                  rotate: { duration: 1, delay: 0.5, type: "spring", stiffness: 80 }
                }}
                className="relative z-0"
              >
                <motion.div
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }
                  }}
                  className="w-48 h-[360px] sm:w-64 sm:h-[480px] md:w-80 md:h-[600px] flex items-center justify-center"
                >
                  <Image
                    src="/mockup/red.png"
                    alt="Yaadro Red Mockup"
                    width={320}
                    height={640}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>

              {/* Main App Mockup - Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 0.8 },
                  scale: { duration: 1, delay: 0.8, type: "spring", stiffness: 120, damping: 15 },
                  y: { duration: 1, delay: 0.8, type: "spring", stiffness: 100, damping: 12 }
                }}
                className="relative z-10"
              >
                <motion.div
                  animate={{
                    y: [0, -25, 0],
                  }}
                  transition={{
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.8
                    }
                  }}
                  className="w-48 h-[360px] sm:w-64 sm:h-[480px] md:w-80 md:h-[600px] flex items-center justify-center"
                >
                  <Image
                    src="/mockup/mockup-yaadro.png"
                    alt="Yaadro App Mockup"
                    width={320}
                    height={640}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Blue Mockup - Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3, x: 150, y: 80, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 1.1 },
                  scale: { duration: 1, delay: 1.1, type: "spring", stiffness: 120, damping: 15 },
                  x: { duration: 1, delay: 1.1, type: "spring", stiffness: 100, damping: 12 },
                  y: { duration: 1, delay: 1.1, type: "spring", stiffness: 100, damping: 12 },
                  rotate: { duration: 1, delay: 1.1, type: "spring", stiffness: 80 }
                }}
                className="relative z-0"
              >
                <motion.div
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.1
                    }
                  }}
                  className="w-48 h-[360px] sm:w-64 sm:h-[480px] md:w-80 md:h-[600px] flex items-center justify-center"
                >
                  <Image
                    src="/mockup/blue.png"
                    alt="Yaadro Blue Mockup"
                    width={320}
                    height={640}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
              </motion.div>
            </motion.div>
              
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-sm text-muted-foreground mb-8"
            >
              {t.productDetail.yaadro.partners.title}
            </motion.p>
            
            {/* First Marquee - Left to Right */}
            <div className="overflow-hidden mb-8">
                <motion.div
                className="flex gap-8 md:gap-12 items-center"
                animate={{
                  x: [0, "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* Render partners twice for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={`marquee1-${setIndex}`} className="flex gap-8 md:gap-12 items-center flex-shrink-0">
                    {partners.map((partner) => (
                      <div
                        key={`${setIndex}-${partner}`}
                        className="flex-shrink-0 text-2xl font-semibold text-muted-foreground/60 whitespace-nowrap"
                      >
                        {partner}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Second Marquee - Right to Left */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8 md:gap-12 items-center"
                animate={{
                  x: ["-50%", 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* Render partners twice for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={`marquee2-${setIndex}`} className="flex gap-8 md:gap-12 items-center flex-shrink-0">
                    {partners.map((partner) => (
                      <div
                        key={`${setIndex}-${partner}`}
                        className="flex-shrink-0 text-2xl font-semibold text-muted-foreground/60 whitespace-nowrap"
                      >
                        {partner}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4"
              >
                {t.productDetail.yaadro.integration.title}{" "}
                <span className="text-[#FC4B01]">Task</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                {t.productDetail.yaadro.integration.subtitle}
              </motion.p>
                </motion.div>

            {/* Integration Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Container */}
              <div className="p-4 sm:p-8 lg:p-12 xl:p-16">
                {/* Integration Flow - Desktop */}
                <div className="hidden md:flex items-center justify-center gap-8 lg:gap-16 mb-12">
                  {/* Task Logo */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex-shrink-0"
                  >
                    <Image
                      src="/logo/task-logo.png"
                      alt="Task Logo"
                      width={240}
                      height={240}
                      className="w-40 h-40 md:w-60 md:h-60 object-contain"
                    />
                  </motion.div>

                  {/* Animated Divider */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center justify-center gap-3"
                  >
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        className="w-3 h-3 rounded-full"
                        animate={{
                          backgroundColor: [
                            "#FC4B01", // Orange
                            "#DC2626", // Red
                            "#2563EB", // Blue
                            "#FC4B01", // Back to Orange
                          ],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Yaadro Logos */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex gap-6 items-center"
                  >
                    {/* Yaadro Red */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="relative"
                    >
                      <div className="bg-card border border-border rounded-full p-6">
                        <Image
                          src="/logo/yaadro-red.png"
                          alt="Yaadro Red"
                          width={120}
                          height={120}
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Yaadro Blue */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="relative"
                    >
                      <div className="bg-card border border-border rounded-full p-6">
                        <Image
                          src="/logo/yaadro-blue.png"
                          alt="Yaadro Blue"
                          width={120}
                          height={120}
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Integration Flow - Mobile */}
                <div className="md:hidden flex flex-col items-center gap-8 mb-12">
                  {/* Task Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative"
                  >
                    <Image
                      src="/logo/task-logo.png"
                      alt="Task Logo"
                      width={200}
                      height={200}
                      className="w-32 h-32 md:w-48 md:h-48 object-contain"
                    />
                  </motion.div>

                  {/* Animated Divider */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center gap-3"
                  >
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        className="w-3 h-3 rounded-full"
                        animate={{
                          backgroundColor: [
                            "#FC4B01", // Orange
                            "#DC2626", // Red
                            "#2563EB", // Blue
                            "#FC4B01", // Back to Orange
                          ],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Yaadro Logos */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-6 items-center"
                  >
                    {/* Yaadro Red */}
                    <div className="bg-card border border-border rounded-full p-5">
                      <Image
                        src="/logo/yaadro-red.png"
                        alt="Yaadro Red"
                        width={100}
                        height={100}
                        className="w-24 h-24 object-contain"
                      />
                    </div>

                    {/* Yaadro Blue */}
                    <div className="bg-card border border-border rounded-full p-5">
                      <Image
                        src="/logo/yaadro-blue.png"
                        alt="Yaadro Blue"
                        width={100}
                        height={100}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-center"
                >
                  <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg">
                    {t.productDetail.yaadro.integration.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-16"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4"
              >
                {t.productDetail.yaadro.process.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                {t.productDetail.yaadro.process.subtitle}
              </motion.p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Connection Lines - Desktop Only */}
              <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-2 overflow-visible z-0">
                <div className="w-full h-full border-t-2 border-dashed border-muted-foreground/30 dark:border-muted-foreground/50 absolute top-1/2 -translate-y-1/2" />
                {/* Animated Traveling Dot */}
                <motion.div
                  className="absolute top-1/2 w-3 h-3 rounded-full bg-[#FC4B01] shadow-lg z-0"
                  style={{
                    transform: "translateY(-50%) translateX(-50%)",
                  }}
                  animate={{
                    left: ["16.67%", "83.33%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              
              {/* Step 1: Create Order */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex flex-col items-center text-center z-20"
              >
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FC4B01] flex items-center justify-center text-white font-bold text-sm z-30">
                  1
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FC4B01]/10 to-transparent" />
                  <ShoppingCart className="w-8 h-8 md:w-12 md:h-12 text-[#FC4B01]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.createOrder.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t.productDetail.yaadro.process.steps.createOrder.description}
                </p>
              </motion.div>

              {/* Step 2: Assign Partner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative flex flex-col items-center text-center z-20"
              >
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FC4B01] flex items-center justify-center text-white font-bold text-sm z-30">
                  2
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FC4B01]/10 to-transparent" />
                  <Truck className="w-8 h-8 md:w-12 md:h-12 text-[#FC4B01]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.assignPartner.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t.productDetail.yaadro.process.steps.assignPartner.description}
                </p>
              </motion.div>

              {/* Step 3: Complete Order */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative flex flex-col items-center text-center z-20"
              >
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FC4B01] flex items-center justify-center text-white font-bold text-sm z-30">
                  3
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FC4B01]/10 to-transparent" />
                  <CheckCircle2 className="w-12 h-12 text-[#FC4B01]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.completeOrder.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t.productDetail.yaadro.process.steps.completeOrder.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Smart Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-foreground"
              >
                {t.productDetail.yaadro.smartFeatures.title}
              </motion.h2>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </motion.button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {smartFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      {feature.visual === "chart" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#FC4B01] border-t-transparent flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-[#FC4B01]" />
                        </div>
                      )}
                      {feature.visual === "line" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#FC4B01] border-t-transparent flex items-center justify-center">
                          <Truck className="w-8 h-8 text-[#FC4B01]" />
                        </div>
                      )}
                      {feature.visual === "donut" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#FC4B01] border-t-transparent flex items-center justify-center">
                          <Activity className="w-8 h-8 text-[#FC4B01]" />
                        </div>
                      )}
                      {feature.visual === "gauge" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#FC4B01] border-t-transparent flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-[#FC4B01]" />
                        </div>
                      )}
                      {feature.visual === "score" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#FC4B01] border-t-transparent flex items-center justify-center">
                          <MessageSquare className="w-8 h-8 text-[#FC4B01]" />
                        </div>
                      )}
                      {feature.visual === "insights" && (
                        <Icon className="w-12 h-12 text-[#FC4B01]" />
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default design for other products (Lens)
  return (
    <div className="min-h-screen bg-background relative">
      {/* Top Left - Company Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/" className="block">
          <Image
            src={theme === "dark" ? "/logo/logo-white.svg" : "/logo/logo-black.svg"}
            alt="CodeTeak Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </motion.div>

      {/* Top Right - Navigation Items */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-6 right-6 z-50 flex items-center gap-6 px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]' 
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: theme === "dark" 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        } : {}}
      >
        <Link href="/" className="text-foreground hover:text-[#FC4B01] transition-colors text-sm">
          {t.nav.home}
        </Link>
        
        {/* Product Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsProductHovered(true)}
          onMouseLeave={() => setIsProductHovered(false)}
        >
          <Link href="/products" className="text-[#FC4B01] transition-colors text-sm cursor-pointer font-medium">
            {t.nav.product}
          </Link>
          
          {/* Dropdown Menu */}
          {isProductHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-96"
              onMouseEnter={() => setIsProductHovered(true)}
            >
              <div className="bg-card/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="p-6">
                  {/* Yaadro Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 pb-6 border-b border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src="/mockup/yaadro.png"
                          alt="Yaadro"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-bold text-base mb-3 uppercase tracking-wider">{t.product.yaadro.title}</h3>
                        <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                          {t.product.yaadro.description}
                        </p>
                        <Link
                          href="/products/yaadro"
                          className="inline-flex items-center gap-2 text-[#FC4B01] hover:text-[#FC4B01]/80 transition-colors text-sm font-medium group"
                        >
                          {t.product.learnMore}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Lens Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src="/mockup/lens.png"
                          alt="Lens"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-bold text-base mb-3 uppercase tracking-wider">{t.product.lens.title}</h3>
                        <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                          {t.product.lens.description}
                        </p>
                        <Link
                          href="/products/lens"
                          className="inline-flex items-center gap-2 text-[#FC4B01] hover:text-[#FC4B01]/80 transition-colors text-sm font-medium group"
                        >
                          {t.product.learnMore}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <Link href="/#about" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
          {t.nav.about}
        </Link>
        <Link href="/#contact" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
          {t.nav.contact}
        </Link>

        {/* Language Selector */}
        <div
          className="relative"
          onMouseEnter={() => setIsLanguageHovered(true)}
          onMouseLeave={() => setIsLanguageHovered(false)}
        >
            <button className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm flex items-center gap-1">
              <span className="text-lg">{language === "en" ? "🇮🇳" : "🇦🇪"}</span>
              <span>{language === "en" ? "EN" : "AR"}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          
          {/* Language Dropdown */}
          {isLanguageHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 pt-3 mt-2"
              onMouseEnter={() => setIsLanguageHovered(true)}
            >
              <div className="bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-2xl overflow-hidden min-w-[120px]"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="p-2">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      language === "en" 
                        ? "bg-[#FC4B01]/10 text-[#FC4B01] font-medium" 
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>{t.common.english}</span>
                  </button>
                  <button
                    onClick={() => changeLanguage("ar")}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      language === "ar" 
                        ? "bg-[#FC4B01]/10 text-[#FC4B01] font-medium" 
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>🇦🇪</span>
                    <span>{t.common.uae}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Top Center - Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center gap-2 text-foreground hover:border-[#FC4B01]/50 transition-all"
          style={{
            background: theme === "dark" 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm font-medium">{t.common.top}</span>
        </motion.button>
      )}

      {/* Bottom Left - Social Media Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 left-6 z-50 flex flex-col gap-4"
      >
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              className="text-muted-foreground hover:text-[#FC4B01] transition-colors"
              aria-label={social.label}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.div>

      {/* Bottom Right - Company Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a
          href="mailto:hello@codeteak.com"
          className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm flex items-center gap-2"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <Mail className="w-4 h-4" />
          <span>hello@codeteak.com</span>
        </a>
      </motion.div>

      {/* Bottom Center - Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={toggleTheme}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-foreground hover:border-[#FC4B01]/50 transition-all"
        style={{
          background: theme === "dark" 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.button>

      {/* Main Content */}
      <main>
        {/* Product Hero - Full Screen */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* Large Background Text - LENS */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
              <h1 className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] 2xl:text-[30rem] font-black text-foreground dark:text-foreground/20 select-none leading-none tracking-tighter flex"
                style={{
                  WebkitTextStroke: theme === "dark" ? "1px rgba(255,255,255,0.1)" : "1px rgba(0,0,0,0.1)",
                } as React.CSSProperties}
              >
                {["L", "E", "N", "S"].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0,
                      y: index % 2 === 0 ? -100 : 100,
                      x: index % 2 === 0 ? -50 : 50,
                      scale: 0.5
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.2 + index * 0.15,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
          </motion.div>

            {/* Centered Mockup */}
          <motion.div
              initial={{ opacity: 0, y: 100, rotate: -15, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: [0, -20, 0],
                rotate: [8, 10, 8],
                scale: 1
              }}
              transition={{ 
                duration: 1,
                delay: 0.4,
                type: "spring",
                stiffness: 80,
                damping: 15,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="relative z-20 max-w-sm sm:max-w-md mx-auto"
            >
                <Image
                  src={product.image}
                  alt={product.name}
                width={400}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                priority
              />
            </motion.div>

            {/* Content Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-8 left-0 right-0 text-center z-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FC4B01] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

        {/* Description Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl text-foreground leading-relaxed max-w-5xl">
                YaadroLens is an innovative AI-powered face recognition system that enables retail stores and supermarkets to{" "}
                <span className="inline-block w-4 h-4 bg-[#FC4B01] align-middle mx-1"></span>{" "}
                track employee attendance contactlessly with over 90% accuracy, even when offline.
              </p>
            </motion.div>
            </div>
        </section>

        {/* Main Task & Challenges Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 md:mb-8">
                  01/ MAIN TASK & CHALLENGES
                </h2>
                </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The primary goal of YaadroLens is to provide a seamless solution for contactless employee attendance management through advanced face recognition technology. The platform aims to meet the needs of retail stores, supermarkets, and businesses seeking automated, accurate, and secure attendance tracking with offline capabilities.
                </p>
              </motion.div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Face Recognition Technology */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  FACE RECOGNITION TECHNOLOGY
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced DeepFace ML with ArcFace embeddings delivering over 90% accuracy in employee identification, ensuring reliable and precise attendance tracking.
                </p>
          </motion.div>

              {/* Card 2: Offline-First Architecture - Highlighted */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#FC4B01] text-white rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-4">
                  OFFLINE-FIRST ARCHITECTURE
                </h3>
                <p className="leading-relaxed">
                  Works seamlessly without internet connectivity, automatically syncing all attendance data when connection is restored. Perfect for locations with unreliable network coverage.
                </p>
              </motion.div>

              {/* Card 3: Multi-Tenant SaaS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
                <h3 className="text-xl font-bold text-foreground mb-4">
                  MULTI-TENANT SAAS
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure, isolated data management for multiple shops and locations. Enterprise-grade security with JWT authentication, role-based access control, and rate limiting.
                </p>
              </motion.div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Section - Header and Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 mb-6"
                >
                  <HelpCircle className="w-4 h-4 text-[#FC4B01]" />
                  <span className="text-sm font-medium text-muted-foreground">Frequently asked questions</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                >
                  Frequently asked{" "}
                  <span className="text-[#FC4B01]">questions</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  Choose a solution that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful attendance management.
                </motion.p>
              </motion.div>

              {/* Right Section - FAQ Items */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {[
                  {
                    question: "What is YaadroLens?",
                    answer: "YaadroLens is an AI-powered face recognition attendance system designed for retail stores and supermarkets. It provides contactless, automated attendance tracking with offline capabilities, real-time analytics, and enterprise-grade security using DeepFace ML technology."
                  },
                  {
                    question: "How does YaadroLens work?",
                    answer: "YaadroLens uses advanced DeepFace ML with ArcFace embeddings to identify employees with over 90% accuracy. The system captures employee faces at entry points, matches them against registered profiles, and automatically records attendance. It works offline and syncs data when internet connection is restored."
                  },
                  {
                    question: "Is YaadroLens secure?",
                    answer: "Yes, YaadroLens employs enterprise-grade security measures including JWT authentication, role-based access control, multi-tenant data isolation, and rate limiting. All face recognition data is encrypted and stored securely with proper access controls."
                  },
                  {
                    question: "Can YaadroLens work without internet?",
                    answer: "Yes, YaadroLens features an offline-first architecture. The system continues to function and record attendance even without internet connectivity. All data is stored locally and automatically synchronized when the connection is restored."
                  },
                  {
                    question: "What is the accuracy of face recognition?",
                    answer: "YaadroLens achieves over 90% accuracy in employee identification using DeepFace ML with ArcFace embeddings. The system continuously learns and improves its recognition capabilities through ML performance monitoring."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-[#FC4B01]/30 transition-colors"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-foreground flex-1">
                        {faq.question}
                      </h3>
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-[#FC4B01]/10 flex items-center justify-center flex-shrink-0"
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {openFaqIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-[#FC4B01]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#FC4B01]" />
                        )}
          </motion.div>
        </div>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ 
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ 
                              duration: 0.3,
                              delay: 0.1
                            }}
                            className="text-muted-foreground leading-relaxed mt-4"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

