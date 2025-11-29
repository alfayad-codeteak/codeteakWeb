"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { getTranslations, type Language } from "@/lib/translations";
import Navigation from "../components/Navigation";

export default function ContactPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
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
        if (!value.trim()) {
          return 'Last name is required';
        }
        if (value.trim().length < 2) {
          return 'Last name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
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

  // Contact form handlers
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

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen flex items-center pb-20 md:pb-20">
        <div className="container mx-auto max-w-7xl w-full">
          {/* Large Title with Animated Letters */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-bold mb-8 md:mb-16 uppercase tracking-tight leading-none flex flex-wrap items-center">
            {/* Split title and highlight for proper styling */}
            {t.contact.title.split("").map((letter, index) => {
              // Four directions rotating: 0=top-left, 1=top-right, 2=bottom-left, 3=bottom-right
              const direction = index % 4;
              const initialPositions = [
                { x: -120, y: -120, rotate: -25 }, // Top-left
                { x: 120, y: -120, rotate: 25 },   // Top-right
                { x: -120, y: 120, rotate: -25 },  // Bottom-left
                { x: 120, y: 120, rotate: 25 }     // Bottom-right
              ];
              
              const pos = initialPositions[direction];
              
              return (
                <motion.span
                  key={`contact-${index}`}
                  className="text-foreground inline-block"
                  initial={{ 
                    opacity: 0,
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                    scale: 0.2
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 1,
                    delay: index * 0.12,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
            
            {/* Space between words */}
            <span className="w-8 sm:w-12 lg:w-16"></span>
            
            {/* Highlight word letters */}
            {t.contact.titleHighlight.split("").map((letter, index) => {
              const direction = (t.contact.title.length + index) % 4;
              const initialPositions = [
                { x: -120, y: -120, rotate: -25 }, // Top-left
                { x: 120, y: -120, rotate: 25 },   // Top-right
                { x: -120, y: 120, rotate: -25 },  // Bottom-left
                { x: 120, y: 120, rotate: 25 }     // Bottom-right
              ];
              
              const pos = initialPositions[direction];
              const totalDelay = t.contact.title.length * 0.12 + 0.2 + index * 0.12;
              
              return (
                <motion.span
                  key={`us-${index}`}
                  className="text-[#FC4B01] inline-block"
                  initial={{ 
                    opacity: 0,
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                    scale: 0.2
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 1,
                    delay: totalDelay,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-foreground font-mono text-sm leading-relaxed">
                  {t.contact.email}: <a href="mailto:info@codeteak.com" className="text-[#FC4B01] hover:underline">info@codeteak.com</a>
                </p>
              </div>
              <div>
                <p className="text-foreground font-mono text-sm leading-relaxed">
                  {t.contact.phone}: <a href="tel:+919995203149" className="text-[#FC4B01] hover:underline">+91 99952 03149</a>
                </p>
              </div>
              <div className="space-y-4 pt-2">
                <h3 className="text-foreground font-mono text-sm font-semibold mb-4 uppercase tracking-wide">Offices</h3>
                <ul className="space-y-6">
                  <li>
                    <p className="text-foreground font-mono text-sm font-medium mb-2">Bengaluru</p>
                    <p className="text-foreground font-mono text-sm leading-relaxed mb-2">
                      Arine Amaryllis, Akshayanagara West,<br />
                      Akshaya Gardens, Akshayanagar,<br />
                      Bengaluru, Karnataka 560114
                    </p>
                    <a 
                      href="https://www.google.com/maps?q=12.874395210839836,77.61370881001027"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FC4B01] hover:underline text-xs inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </li>
                  <li>
                    <p className="text-foreground font-mono text-sm font-medium mb-2">Dubai</p>
                    <p className="text-foreground font-mono text-sm leading-relaxed mb-2">
                      Room No. 4, Index Exchange Building,<br />
                      Opposite Wimpy Restaurant,<br />
                      Naif Road, Dubai
                    </p>
                    <a 
                      href="https://www.google.com/maps?q=25.271468639880588,55.302489429935676"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FC4B01] hover:underline text-xs inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
                    className="px-8 py-3 bg-white text-black font-mono text-sm uppercase tracking-wide border border-black hover:bg-black hover:text-white transition-colors dark:bg-foreground dark:text-background dark:border-foreground dark:hover:bg-background dark:hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
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

