"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, TrendingUp, BarChart3, PieChart, Shield, Zap, Activity, ArrowUp, Sun, Moon, Mail, Twitter, Linkedin, Github, Instagram, Truck, ShoppingCart, Users, MessageSquare, Package, MapPin, Clock, Bell, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../../components/Navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMounted, setIsMounted] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First FAQ open by default
  const yaadroVideoRef = useRef<HTMLVideoElement>(null);
  const yaadroVideoWrapRef = useRef<HTMLDivElement>(null);
  
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

  // Old /products/ecommerce URL → Yaadro page ecommerce section
  useEffect(() => {
    if (slug === "ecommerce") {
      router.replace("/products/yaadro#ecommerce");
    }
  }, [slug, router]);

  // Scroll to ecommerce section when hash is present
  useEffect(() => {
    if (slug !== "yaadro" || typeof window === "undefined") return;
    if (window.location.hash !== "#ecommerce") return;

    const timer = window.setTimeout(() => {
      document.getElementById("ecommerce")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [slug]);

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
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

  // Autoplay Yaadro hero video when scrolled into view
  useEffect(() => {
    if (slug !== "yaadro") return;

    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    const setup = () => {
      const wrap = yaadroVideoWrapRef.current;
      const video = yaadroVideoRef.current;
      if (!wrap || !video || cancelled) return false;

      // Browsers only allow reliable autoplay when muted
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      const playVideo = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Try enabling sound after playback starts (works if user already interacted with the site)
              try {
                video.muted = false;
                video.volume = 1;
              } catch {
                // keep muted if browser blocks unmute
              }
            })
            .catch(() => {
              // Retry muted play
              video.muted = true;
              void video.play().catch(() => {});
            });
        }
      };

      const pauseVideo = () => {
        if (!video.paused) video.pause();
      };

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        },
        { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
      );

      observer.observe(wrap);

      // If already in view on load
      const rect = wrap.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.75 &&
        rect.bottom > window.innerHeight * 0.25;
      if (inView) playVideo();

      return true;
    };

    // Refs may not be ready on the first tick
    let attempts = 0;
    const trySetup = () => {
      if (setup() || cancelled) return;
      attempts += 1;
      if (attempts < 20) requestAnimationFrame(trySetup);
    };
    trySetup();

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [slug]);

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
      description: "Home delivery for shops",
      longDescription:
        "Yaadro helps shops manage home delivery from start to finish. Shops, delivery partners, and customers stay connected with simple apps and a clear dashboard.",
      image: "/mockup/yaadro.png",
      features: [
        "See where every order is",
        "Apps for shops and delivery partners",
        "Simple dashboard for managers",
        "Online orders with pay on delivery",
        "Clear updates for everyone",
        "Works with Task billing",
      ],
      benefits: [
        "Faster home deliveries",
        "Less confusion between teams",
        "Customers stay updated",
        "Easy day to day control",
      ],
    },
    lens: {
      name: "Lens",
      description: "Simple camera attendance for your team",
      longDescription:
        "Lens helps any business mark attendance quickly. Staff check in by looking at the camera, no cards or fingerprints needed. It stays accurate and keeps working even when the internet is down.",
      image: "/mockup/lens.png",
      features: [
        "Quick check in with a camera look",
        "Works even without internet, then syncs later",
        "Safe records for one location or many",
        "Clear attendance reports for managers",
        "Only authorized people can view staff data",
        "Easy employee and attendance management",
        "Reliable day to day for busy teams",
        "Grows with your locations and staff",
      ],
      benefits: [
        "No cards, PINs, or fingerprint machines",
        "Keeps recording attendance offline",
        "Recognizes the right person every time",
        "Helps managers see who is present quickly",
        "Each location's data stays private",
        "Ready for real workplace use from day one",
      ],
    },
  };

  const product = products[slug];

  // Redirect handled in useEffect — avoid flashing "not found"
  if (slug === "ecommerce") {
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 md:pb-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.productDetail.notFound}</h1>
          <Link href="/products" className="text-[#6C3CE0] hover:underline">
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

    const partners = ["Loyal City", "Greens Fresh Mart", "Fresh World", "Families", "Mythri", "Dream Mart" , "Millions" , "Rolla" , "All Season", "BigMart", "Brigade","Season Fresh","FreshCo Hyper", "Market Fresh","Grand Fresh Hyper Mart"
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
          onThemeChange={(newTheme) => {
            setTheme(newTheme);
            updateTheme(newTheme);
          }}
          onLanguageChange={changeLanguage}
          onScrollToTop={scrollToTop}
        />

        {/* Hero Section */}
        <section className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center gap-5 md:gap-7 mb-8 md:mb-12 max-w-4xl mx-auto"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-[#6C3CE0]/25 bg-[#6C3CE0]/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#6C3CE0]">
                {language === "ar"
                  ? "يادرو · نظام إدارة التوصيل + متجر إلكتروني"
                  : "Yaadro · Delivery Management System + Ecommerce"}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                {language === "en" ? (
                  <>
                    <span className="block whitespace-nowrap">Deliver faster.</span>
                    <span className="block whitespace-nowrap text-[#6C3CE0]">Stay connected.</span>
                  </>
                ) : (
                  <>
                    <span className="block whitespace-nowrap">
                      <span className="text-[#6C3CE0]">توصيل</span> أسرع.
                    </span>
                    <span className="block whitespace-nowrap">اتصال أوضح.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {t.productDetail.yaadro.description}
              </p>

              <Link
                href="/contact"
                className="px-6 py-3 md:px-8 md:py-4 bg-[#6C3CE0] text-white rounded-full font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                {language === "ar" ? "ابدأ الآن" : "Get started"}
              </Link>
            </motion.div>

            {/* Hero video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="relative mt-10 md:mt-20 w-full max-w-6xl mx-auto px-4 sm:px-6 overflow-visible"
            >
              <div
                ref={yaadroVideoWrapRef}
                className="relative w-full overflow-visible"
              >
                <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-black aspect-[16/9] min-h-[240px] sm:min-h-[360px] md:min-h-[480px] lg:min-h-[560px]">
                  <video
                    ref={yaadroVideoRef}
                    className="w-full h-full object-cover cursor-pointer"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    aria-label="Yaadro delivery management demo"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      video.muted = !video.muted;
                      if (video.paused) void video.play();
                    }}
                  >
                    <source
                      src="/videos/yaadro-delivery-management.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                {/* Bottom-right Yaadro logo */}
                <div className="pointer-events-none absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-5 z-20 -rotate-[10deg]">
                  <Image
                    src="/products-image/logo-3d.png"
                    alt="Yaadro"
                    width={280}
                    height={280}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
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
                        className="flex-shrink-0 text-2xl font-semibold text-muted-foreground whitespace-nowrap"
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
                        className="flex-shrink-0 text-2xl font-semibold text-muted-foreground whitespace-nowrap"
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
                <span className="text-[#6C3CE0]">Task</span>
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
              <div className="px-2 sm:px-4 lg:px-8 mb-10 md:mb-12 flex justify-center">
                <Image
                  src="/task-integration-image.png"
                  alt="Yaadro integrated with Task"
                  width={1200}
                  height={480}
                  className="w-full max-w-4xl h-auto object-contain"
                  priority={false}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center px-4"
              >
                <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg">
                  {t.productDetail.yaadro.integration.description}
                </p>
              </motion.div>
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
                  className="absolute top-1/2 w-3 h-3 rounded-full bg-[#6C3CE0] shadow-lg z-0"
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
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#6C3CE0] flex items-center justify-center text-white font-bold text-sm z-30">
                  1
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C3CE0]/10 to-transparent" />
                  <ShoppingCart className="w-8 h-8 md:w-12 md:h-12 text-[#6C3CE0]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.createOrder.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#6C3CE0] flex items-center justify-center text-white font-bold text-sm z-30">
                  2
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C3CE0]/10 to-transparent" />
                  <Truck className="w-8 h-8 md:w-12 md:h-12 text-[#6C3CE0]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.assignPartner.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#6C3CE0] flex items-center justify-center text-white font-bold text-sm z-30">
                  3
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C3CE0]/10 to-transparent" />
                  <CheckCircle2 className="w-12 h-12 text-[#6C3CE0]" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {t.productDetail.yaadro.process.steps.completeOrder.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
                Get started
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
                        <div className="w-20 h-20 rounded-full border-8 border-[#6C3CE0] border-t-transparent flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-[#6C3CE0]" />
                        </div>
                      )}
                      {feature.visual === "line" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#6C3CE0] border-t-transparent flex items-center justify-center">
                          <Truck className="w-8 h-8 text-[#6C3CE0]" />
                        </div>
                      )}
                      {feature.visual === "donut" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#6C3CE0] border-t-transparent flex items-center justify-center">
                          <Activity className="w-8 h-8 text-[#6C3CE0]" />
                        </div>
                      )}
                      {feature.visual === "gauge" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#6C3CE0] border-t-transparent flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-[#6C3CE0]" />
                        </div>
                      )}
                      {feature.visual === "score" && (
                        <div className="w-20 h-20 rounded-full border-8 border-[#6C3CE0] border-t-transparent flex items-center justify-center">
                          <MessageSquare className="w-8 h-8 text-[#6C3CE0]" />
                        </div>
                      )}
                      {feature.visual === "insights" && (
                        <Icon className="w-12 h-12 text-[#6C3CE0]" />
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

        {/* Ecommerce platform — part of Yaadro */}
        <section id="ecommerce" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
                  <ShoppingCart className="w-4 h-4 text-[#6C3CE0]" />
                  <span className="text-sm text-muted-foreground">
                    {language === "ar" ? "متجر أونلاين لسوبرماركتك" : "Online shop for your supermarket"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {language === "ar" ? (
                    <>
                      اطلب{" "}
                      <span className="text-[#6C3CE0]">أونلاين</span>
                      <br />
                      وادفع عند الاستلام
                    </>
                  ) : (
                    <>
                      Order{" "}
                      <span className="text-[#6C3CE0]">online</span>
                      <br />
                      Pay on delivery
                    </>
                  )}
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {language === "ar"
                    ? "عملاؤك يختارون المنتجات من موقعك ويطلبون بسهولة. كل متجر له منتجاته. الدفع نقداً عند وصول الطلب."
                    : "Customers pick products from your website and order with ease. Each shop has its own products. They pay cash when the order arrives."}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#6C3CE0] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  {language === "ar" ? "تواصل معنا" : "Talk to us"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <Image
                  src="/products-image/yaadro-ecommerce-hero.jpg"
                  alt={language === "ar" ? "يادرو للتجارة الإلكترونية" : "Yaadro Ecommerce"}
                  width={900}
                  height={700}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
              {(language === "ar"
                ? [
                    { title: "اطلب بسهولة", desc: "اختر المنتجات واطلب بسرعة." },
                    { title: "ادفع عند الاستلام", desc: "لا بطاقات. ادفع نقداً عند الوصول." },
                    { title: "منتجات لكل متجر", desc: "كل متجر يعرض منتجاته وأسعاره." },
                    { title: "تابع الطلبات", desc: "الموظفون يحدّثون حالة كل طلب." },
                  ]
                : [
                    { title: "Easy to order", desc: "Pick products and order fast." },
                    { title: "Pay on delivery", desc: "No cards. Pay cash when it arrives." },
                    { title: "Your shop products", desc: "Each shop shows its own items and prices." },
                    { title: "Track orders", desc: "Staff can update every order status." },
                  ]
              ).map((h, idx) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="text-sm font-semibold text-foreground mb-2">{h.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{h.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              <div className="bg-card border border-border rounded-3xl p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                  {language === "ar" ? "الميزات" : "What you get"}
                </h3>
                <ul className="space-y-3">
                  {(language === "ar"
                    ? [
                        "منتجاتك وأسعارك الخاصة",
                        "اطلب من موقعك",
                        "ادفع عند وصول الطلب",
                        "الموظفون يديرون الطلبات",
                        "العملاء يحصلون على تحديثات",
                        "مدعوم من كودتيك",
                      ]
                    : [
                        "Your own products and prices",
                        "Order from your website",
                        "Pay when the order arrives",
                        "Staff can manage orders",
                        "Customers get order updates",
                        "Supported by CodeTeak",
                      ]
                  ).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-[#6C3CE0] mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-3xl p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                  {language === "ar" ? "لماذا يناسبك" : "Why it helps"}
                </h3>
                <ul className="space-y-3">
                  {(language === "ar"
                    ? [
                        "بع أونلاين بدون تعقيد",
                        "كل متجر منفصل",
                        "الدفع نقداً عند الاستلام",
                        "سهل للعملاء أن يطلبوا مرة أخرى",
                      ]
                    : [
                        "Sell online with no extra setup",
                        "Each shop stays separate",
                        "Cash on delivery only",
                        "Easy for customers to order again",
                      ]
                  ).map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <Zap className="w-5 h-5 text-[#6C3CE0] mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 mb-6">
                  <HelpCircle className="w-4 h-4 text-[#6C3CE0]" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === "ar" ? "أسئلة شائعة" : "Common questions"}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {language === "ar" ? (
                    <>
                      أسئلة بسيطة
                      <br />
                      <span className="text-[#6C3CE0]">قبل أن تبدأ</span>
                    </>
                  ) : (
                    <>
                      Simple answers
                      <br />
                      <span className="text-[#6C3CE0]">before you start</span>
                    </>
                  )}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "عن الطلبات والمنتجات والدفع عند الاستلام."
                    : "About orders, products, and pay on delivery."}
                </p>
              </div>

              <div className="space-y-4">
                {(language === "ar"
                  ? [
                      {
                        question: "هل يمكن الدفع أونلاين؟",
                        answer: "لا. الدفع عند الاستلام فقط. يمكن إضافة الدفع أونلاين لاحقاً.",
                      },
                      {
                        question: "هل لكل متجر منتجاته؟",
                        answer: "نعم. كل متجر له منتجاته وأسعاره الخاصة.",
                      },
                      {
                        question: "كيف يطلب العميل؟",
                        answer: "يفتح رابط متجرك، يختار المنتجات، ويطلب من الهاتف أو الكمبيوتر.",
                      },
                      {
                        question: "من يدعم النظام؟",
                        answer: "كودتيك تدير النظام وتحدّثه وتساعد عند الحاجة.",
                      },
                    ]
                  : [
                      {
                        question: "Can customers pay online?",
                        answer: "No. They pay when the order arrives. Online pay can be added later.",
                      },
                      {
                        question: "Can each shop have its own products?",
                        answer: "Yes. Every shop has its own products and prices.",
                      },
                      {
                        question: "How do customers order?",
                        answer: "They open your shop link, pick products, and order from phone or computer.",
                      },
                      {
                        question: "Who supports the system?",
                        answer: "CodeTeak runs it, updates it, and helps when you need.",
                      },
                    ]
                ).map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-[#6C3CE0]/30 transition-colors"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-base md:text-lg font-bold text-foreground flex-1">
                        {faq.question}
                      </h4>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-[#6C3CE0]/10 flex items-center justify-center flex-shrink-0"
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {openFaqIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-[#6C3CE0]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#6C3CE0]" />
                        )}
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, delay: 0.08 }}
                            className="text-muted-foreground leading-relaxed mt-4"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default design for other products (Lens)
  return (
    <div className="min-h-screen bg-background relative pb-20 md:pb-0">
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
      <main>
        {/* Product Hero - Full Screen */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 md:pt-0"
        >
            {/* Large Background Text - LENS */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
              <h1 className="text-[16rem] sm:text-[18rem] md:text-[20rem] lg:text-[28rem] xl:text-[32rem] 2xl:text-[38rem] font-black text-foreground dark:text-foreground/20 select-none leading-none tracking-tighter flex"
                dir="ltr"
                style={{
                  WebkitTextStroke: theme === "dark" ? "1px rgba(255,255,255,0.1)" : "1px rgba(0,0,0,0.1)",
                  direction: 'ltr',
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
              className="relative z-20 max-w-[280px] sm:max-w-sm md:max-w-md mx-auto px-4 mt-12 sm:mt-16 md:mt-20"
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
              className="absolute bottom-4 md:bottom-8 left-0 right-0 text-center z-10 px-4"
            >
                        <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-brand-strong text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm md:text-base"
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
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground leading-relaxed max-w-5xl">
                {language === "en" && t.productDetail.lens.heroDescription.includes("track") ? (
                  <>
                    {t.productDetail.lens.heroDescription.split("track")[0]}{" "}
                    <span className="inline-block w-4 h-4 bg-[#FC4B01] align-middle mx-1"></span>{" "}
                    track{t.productDetail.lens.heroDescription.split("track")[1]}
                  </>
                ) : language === "ar" && t.productDetail.lens.heroDescription.includes("تتبع") ? (
                  <>
                    {t.productDetail.lens.heroDescription.split("تتبع")[0]}{" "}
                    <span className="inline-block w-4 h-4 bg-[#FC4B01] align-middle mx-1"></span>{" "}
                    تتبع{t.productDetail.lens.heroDescription.split("تتبع")[1]}
                  </>
                ) : (
                  t.productDetail.lens.heroDescription
                )}
              </p>
                  </motion.div>
        </div>
        </section>

        {/* Top Features */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-14 max-w-2xl"
            >
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FC4B01] mb-3">
                {t.productDetail.lens.topFeatures.title}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3">
                {t.productDetail.lens.topFeatures.subtitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {t.productDetail.lens.topFeatures.items.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`rounded-2xl border p-6 md:p-8 ${
                    index === 1
                      ? "bg-brand-strong border-brand-strong text-white"
                      : "bg-card border-border"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block ${
                      index === 1 ? "text-white/80" : "text-[#FC4B01]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-3 leading-snug ${
                      index === 1 ? "text-white" : "text-foreground"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      index === 1 ? "text-white/90" : "text-muted-foreground"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Main Task & Challenges Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-16">
              {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 md:mb-8">
                  {t.productDetail.lens.mainTask.title}
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
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t.productDetail.lens.mainTask.description}
                </p>
            </motion.div>
        </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Face Recognition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden min-h-[200px]"
              >
                <div className="pointer-events-none absolute -bottom-2 -right-2 w-28 h-28 md:w-36 md:h-36 opacity-90">
                  <Image
                    src="/lens-product/face-recognition.png"
                    alt=""
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <div className="relative z-10 max-w-[70%]">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                    {t.productDetail.lens.features.faceRecognition.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t.productDetail.lens.features.faceRecognition.description}
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Works without internet */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-brand-strong text-white rounded-2xl p-6 md:p-8 overflow-hidden min-h-[200px]"
              >
                <div className="pointer-events-none absolute -bottom-2 -right-2 w-28 h-28 md:w-36 md:h-36 opacity-95">
                  <Image
                    src="/lens-product/offline-mode.png"
                    alt=""
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <div className="relative z-10 max-w-[70%]">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                    {t.productDetail.lens.features.offlineFirst.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/95">
                    {t.productDetail.lens.features.offlineFirst.description}
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Built for many stores */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden min-h-[200px]"
              >
                <div className="pointer-events-none absolute -bottom-2 -right-2 w-28 h-28 md:w-36 md:h-36 opacity-90">
                  <Image
                    src="/lens-product/multiple-shop-manage.png"
                    alt=""
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <div className="relative z-10 max-w-[70%]">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                    {t.productDetail.lens.features.multiTenant.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t.productDetail.lens.features.multiTenant.description}
                  </p>
                </div>
              </motion.div>
            </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
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
                  <span className="text-sm font-medium text-muted-foreground">{t.productDetail.lens.faq.tag}</span>
          </motion.div>

                {/* Main Heading */}
                <motion.h2
            initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight"
                >
                  {t.productDetail.lens.faq.title}{" "}
                  <span className="text-[#FC4B01]">{t.productDetail.lens.faq.titleHighlight}</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  {t.productDetail.lens.faq.description}
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
                {t.productDetail.lens.faq.items.map((faq, index) => (
                <motion.div
                  key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-card border border-border rounded-xl p-4 md:p-6 cursor-pointer hover:border-[#FC4B01]/30 transition-colors"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-bold text-foreground flex-1">
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

