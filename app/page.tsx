"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Code, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Download,
  MessageSquare,
  User,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Sun,
  Moon,
  ArrowUp,
  ChevronDown,
  Play,
  Globe,
  Smartphone,
  Brain,
  Package,
  Plus
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "./components/Navigation";
import ServicesSection from "./components/ServicesSection";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Contact form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
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
    
    // Scroll to top on page load/refresh
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
      }
    }
  }, []);

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", lang);
      // Update HTML dir attribute for RTL support
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      // Show button when user scrolls down more than 300px
      setShowBackToTop(window.scrollY > 300);
      // Add glassmorphism to nav when scrolled
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

  // Contact form handlers
  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        if (value.trim().length < 2) {
          return 'First name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'First name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
      
      case 'lastName':
        // Last name is optional, but if provided, validate format
        if (value.trim() && !/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address (e.g., name@example.com)';
        }
        return '';
      
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters long';
        }
        if (value.trim().length > 1000) {
          return 'Message must be less than 1000 characters';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field in real-time if it has been touched
    if (touchedFields[name as keyof typeof touchedFields]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
    
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      message: true
    });

    // Validate all fields
    const errors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors above before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form and validation
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setFormErrors({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setTouchedFields({
          firstName: false,
          lastName: false,
          email: false,
          message: false
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit form. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Globe,
      title: t.services.webDevelopment.title,
      description: t.services.webDevelopment.description,
    },
    {
      icon: Smartphone,
      title: t.services.mobileAppDevelopment.title,
      description: t.services.mobileAppDevelopment.description,
    },
    {
      icon: Code,
      title: t.services.softwareDevelopment.title,
      description: t.services.softwareDevelopment.description,
    },
    {
      icon: Brain,
      title: t.services.aiIntegration.title,
      description: t.services.aiIntegration.description,
    },
    {
      icon: Shield,
      title: t.services.securityProtection.title,
      description: t.services.securityProtection.description,
    },
    {
      icon: Package,
      title: t.services.ourProducts.title,
      description: t.services.ourProducts.description,
    },
  ];



  // Parallax scroll refs
  const heroRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms
  // Removed heroY to prevent content from moving when scrolling up
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const backgroundY = useTransform(heroScrollProgress, [0, 1], [0, 50]);
  
  // Logo animation transforms - from above title to header left
  // Logo starts above title (centered) and moves to header position (top-left)
  // Using pixel values for smoother animation
  const logoScale = useTransform(heroScrollProgress, [0, 0.6], [1, 0.3]);
  const heroLogoOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  const headerLogoOpacity = useTransform(heroScrollProgress, [0.5, 0.7], [0, 1]);
  
  // Calculate position offset - from above title (centered) to top-left header
  // Transform moves logo from its centered position above title to header position
  // Ensure hero logo disappears completely before reaching header position to avoid overlap
  const logoX = useTransform(heroScrollProgress, [0, 0.5], [0, "calc(-50vw + 24px)"]);
  const logoY = useTransform(heroScrollProgress, [0, 0.5], [0, "calc(-50vh + 24px)"]);

  return (
    <div className="min-h-screen bg-background relative pb-20 md:pb-0">
      {/* Navigation Component */}
      <Navigation
        theme={theme}
        language={language}
        isMounted={isMounted}
        isScrolled={isScrolled}
        showBackToTop={showBackToTop}
        headerLogoOpacity={headerLogoOpacity}
        onThemeChange={(newTheme) => {
          setTheme(newTheme);
          updateTheme(newTheme);
        }}
        onLanguageChange={changeLanguage}
        onScrollToTop={scrollToTop}
      />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Top Section with Primary Color Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[40vh] overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute inset-0"
          style={{
            background: theme === "dark" 
                ? "linear-gradient(180deg, rgba(252, 75, 1, 0.15) 0%, rgba(252, 75, 1, 0.08) 50%, transparent 100%)"
                : "linear-gradient(180deg, rgba(252, 75, 1, 0.2) 0%, rgba(252, 75, 1, 0.1) 50%, rgba(255, 255, 255, 0.1) 100%)"
            }}
          />

          {/* Data Stream Effect on Right */}
          <div className="absolute top-20 right-8 sm:right-16 opacity-20 dark:opacity-10">
            <div className="flex flex-col gap-2 font-mono text-xs sm:text-sm text-[#FC4B01] dark:text-[#FC4B01]/70">
              {["101010", "110011", "100101", "011010", "101101", "010110"].map((code, idx) => (
      <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                >
                  {code}
      </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <motion.div 
          className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen"
          style={isMounted ? { opacity: heroOpacity } : {}}
          suppressHydrationWarning
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hero Logo - Above Title, Animates to Header on Scroll */}
            <motion.div
              ref={logoRef}
              className="flex justify-center mb-8"
              style={{
                position: "relative",
                x: logoX,
                y: logoY,
                scale: logoScale,
                opacity: heroLogoOpacity,
                zIndex: 50,
              }}
            >
              {isMounted && heroLogoOpacity.get() > 0.01 && (
                <a href="#home" className="block">
                  <Image
                    key={`hero-logo-${theme}`}
                    src={theme === "dark" ? "/logo/logo-white.svg" : "/logo/logo-black.svg"}
                    alt="CodeTeak Logo"
                    width={300}
                    height={100}
                    className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
                    priority
                  />
                </a>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">{t.hero.headline}</span>
              <br />
              <span className="text-muted-foreground">{t.hero.headlineHighlight}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
            >
              {t.hero.description}
            </motion.p>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {t.hero.stats.projects}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  {t.hero.stats.projectsLabel}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {t.hero.stats.clients}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  {t.hero.stats.clientsLabel}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {t.hero.stats.satisfaction}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  {t.hero.stats.satisfactionLabel}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {t.hero.stats.partners}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  {t.hero.stats.partnersLabel}
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#FC4B01] hover:bg-[#FC4B01]/90 dark:bg-[#FC4B01] dark:hover:bg-[#FC4B01]/90 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>
      </section>

      {/* Partners/Companies Marquee Section */}
      <section
        ref={partnersRef} 
        className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border rounded-t-[4rem] overflow-hidden bg-white dark:bg-background"
        suppressHydrationWarning
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-lg sm:text-xl text-muted-foreground font-medium">
              {t.partners.title}
            </h2>
          </motion.div>

          {/* Supermarket Partners List */}
          <div className="overflow-hidden">
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
                    {["Loyal City", "Greens Fresh Mart", "Fresh World", "Families", "Mythri", "Dream Mart", "Millions", "Rolla", "All Season", "BigMart", "Brigade", "Season Fresh", "FreshCo Hyper", "Market Fresh", "Grand Fresh Hyper Mart"].map((partner) => (
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
                    {["Loyal City", "Greens Fresh Mart", "Fresh World", "Families", "Mythri", "Dream Mart", "Millions", "Rolla", "All Season", "BigMart", "Brigade", "Season Fresh", "FreshCo Hyper", "Market Fresh", "Grand Fresh Hyper Mart"].map((partner) => (
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
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection language={language as Language} />

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          {/* Large Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-bold mb-16 uppercase tracking-tight leading-none"
          >
            <span className="text-foreground">{t.about.title} </span>
            <span className="text-[#FC4B01]">{t.about.titleHighlight}</span>
          </motion.h2>

          {/* Content */}
          <div className="max-w-4xl">
                  <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-muted-foreground">
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
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
          </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          {/* Large Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-bold mb-16 uppercase tracking-tight leading-none"
          >
            <span className="text-foreground">{t.contact.title} </span>
            <span className="text-[#FC4B01]">{t.contact.titleHighlight}</span>
          </motion.h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-foreground font-mono text-sm leading-relaxed">
                {t.contact.email}: <a href="mailto:info@codeteak.com" className="text-[#FC4B01] hover:underline">info@codeteak.com</a>
              </p>
              <p className="text-foreground font-mono text-sm leading-relaxed">
                {t.contact.phone}: <a href="tel:+919995203149" className="text-[#FC4B01] hover:underline">+91 99952 03149</a>
              </p>
              <div className="space-y-3 pt-2">
                <h3 className="text-foreground font-mono text-sm font-semibold uppercase tracking-wide">Offices</h3>
                <ul className="space-y-3">
                  <li>
                    <p className="text-foreground font-mono text-xs font-medium mb-1">Bengaluru</p>
                    <p className="text-foreground font-mono text-xs leading-relaxed">
                      Arine Amaryllis, Akshayanagara West, Akshaya Gardens,<br />
                      Akshayanagar, Bengaluru, Karnataka 560114
                    </p>
                  </li>
                  <li>
                    <p className="text-foreground font-mono text-xs font-medium mb-1">Dubai</p>
                    <p className="text-foreground font-mono text-xs leading-relaxed">
                      Index Exchange Building,<br />
                      Opposite Wimpy Restaurant, Naif Road, Dubai
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div>
                  <label className="block text-foreground font-mono text-sm mb-4">
                    {t.contact.form.firstName} / {t.contact.form.lastName}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={t.contact.form.firstName}
                        className={`w-full bg-transparent text-foreground font-mono text-sm pb-2 border-b focus:outline-none placeholder:text-foreground/50 transition-colors ${
                          formErrors.firstName && touchedFields.firstName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-foreground/30 focus:border-foreground'
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.firstName && touchedFields.firstName && (
                        <p className="text-red-500 text-xs font-mono mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={t.contact.form.lastName}
                        className={`w-full bg-transparent text-foreground font-mono text-sm pb-2 border-b focus:outline-none placeholder:text-foreground/50 transition-colors ${
                          formErrors.lastName && touchedFields.lastName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-foreground/30 focus:border-foreground'
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.lastName && touchedFields.lastName && (
                        <p className="text-red-500 text-xs font-mono mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-foreground font-mono text-sm mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t.contact.form.email}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t.contact.form.email}
                      className={`w-full bg-transparent text-foreground font-mono text-sm pb-2 border-b focus:outline-none placeholder:text-foreground/50 transition-colors ${
                        formErrors.email && touchedFields.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-foreground/30 focus:border-foreground'
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.email && touchedFields.email && (
                      <p className="text-red-500 text-xs font-mono mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-foreground font-mono text-sm mb-4">
                    {t.contact.form.message}
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t.contact.form.message}
                      rows={4}
                      className={`w-full bg-transparent text-foreground font-mono text-sm pb-2 border-b focus:outline-none placeholder:text-foreground/50 resize-none transition-colors ${
                        formErrors.message && touchedFields.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-foreground/30 focus:border-foreground'
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.message && touchedFields.message && (
                      <p className="text-red-500 text-xs font-mono mt-1">{formErrors.message}</p>
                    )}
                  </div>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg font-mono text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-white text-black font-mono text-sm uppercase tracking-wide border border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : t.contact.form.submit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

              </div>
  );
}
