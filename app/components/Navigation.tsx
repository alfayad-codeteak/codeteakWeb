"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ArrowRight, 
  Mail,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Sun,
  Moon,
  ArrowUp,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslations, type Language } from "@/lib/translations";

interface NavigationProps {
  theme: "light" | "dark";
  language: "en" | "ar";
  isMounted: boolean;
  isScrolled: boolean;
  showBackToTop: boolean;
  headerLogoOpacity?: any;
  onThemeChange: (theme: "light" | "dark") => void;
  onLanguageChange: (lang: "en" | "ar") => void;
  onScrollToTop: () => void;
}

export default function Navigation({
  theme,
  language,
  isMounted,
  isScrolled,
  showBackToTop,
  headerLogoOpacity,
  onThemeChange,
  onLanguageChange,
  onScrollToTop,
}: NavigationProps) {
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
  const [logoKey, setLogoKey] = useState(0);
  const pathname = usePathname();
  
  // Force logo re-render when theme changes
  useEffect(() => {
    setLogoKey(prev => prev + 1);
  }, [theme]);
  
  const t = getTranslations(language as Language);

  // Close mobile dropdown when pathname changes or clicking outside
  useEffect(() => {
    setIsMobileProductOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside on mobile
  useEffect(() => {
    if (!isMobileProductOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-product-dropdown')) {
        setIsMobileProductOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileProductOpen]);

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const isHomePage = pathname === "/";

  return (
    <>
      {/* Top Left - Company Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
        style={isHomePage && headerLogoOpacity ? { 
          opacity: headerLogoOpacity,
          pointerEvents: isScrolled ? 'auto' : 'none'
        } : {}}
      >
        <Link href="/" className="block">
          {isMounted && (
            <img
              key={`logo-${theme}-${logoKey}`}
              src={`${theme === "dark" ? "/logo/logo-white.svg" : "/logo/logo-black.svg"}?v=${logoKey}&theme=${theme}`}
              alt="CodeTeak Logo"
              className="h-[12px] md:h-8 w-auto"
              style={{ maxWidth: '40px', height: 'auto' }}
            />
          )}
        </Link>
      </motion.div>

      {/* Theme Toggle - Mobile Top Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 md:hidden z-50 w-10 h-10 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-foreground hover:border-[#FC4B01]/50 transition-all shadow-lg"
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

      {/* Top Right - Navigation Items (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:flex fixed top-6 right-6 z-50 items-center gap-6 px-4 py-2 rounded-full transition-all duration-300 ${
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
        <Link href="/" className={pathname === "/" ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm"}>
          {t.nav.home}
        </Link>
        
        {/* Product Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsProductHovered(true)}
          onMouseLeave={() => setIsProductHovered(false)}
        >
          <Link href="/products" className={pathname.startsWith("/products") ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm cursor-pointer font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm cursor-pointer"}>
            {t.nav.product}
          </Link>
          
          {/* Dropdown Menu */}
          {isProductHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-96 z-50 hidden md:block"
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
        
        <Link href="/services" className={pathname === "/services" ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm"}>
          {t.nav.services}
        </Link>
        <Link href="/about" className={pathname === "/about" ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm"}>
          {t.nav.about}
        </Link>
        <Link href="/tech-news" className={pathname === "/tech-news" ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm"}>
          {t.nav.blog}
        </Link>
        <Link href="/contact" className={pathname === "/contact" ? "text-foreground hover:text-[#FC4B01] transition-colors text-sm font-medium" : "text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm"}>
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
              className="absolute top-full right-0 pt-3"
              onMouseEnter={() => setIsLanguageHovered(true)}
            >
              <div className="bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-2xl overflow-hidden min-w-[120px]"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="p-2">
                  <button
                    onClick={() => onLanguageChange("en")}
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
                    onClick={() => onLanguageChange("ar")}
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
          onClick={onScrollToTop}
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

      {/* Bottom Left - Social Media Icons (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex fixed bottom-6 left-6 z-50 flex-col gap-4"
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

      {/* Bottom Right - Company Email (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex fixed bottom-6 right-6 z-50"
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

      {/* Bottom Center - Theme Toggle Button (Desktop Only) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/10 items-center justify-center text-foreground hover:border-[#FC4B01]/50 transition-all"
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

      {/* Mobile Bottom Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-50 px-4 pt-5 pb-safe pb-5 rounded-t-3xl backdrop-blur-xl border-t border-white/20 dark:border-white/10"
        style={{
          background: theme === "dark" 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 -8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link 
            href="/" 
            className={`flex flex-col items-center gap-1.5 px-4 py-3 min-h-[56px] min-w-[56px] rounded-xl transition-colors touch-manipulation ${
              pathname === "/" 
                ? "text-[#FC4B01]" 
                : "text-muted-foreground"
            }`}
          >
            <span className="text-sm font-medium">{t.nav.home}</span>
          </Link>
          
          <div
            className="relative mobile-product-dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileProductOpen(!isMobileProductOpen);
            }}
          >
            <div className={`flex flex-col items-center gap-1.5 px-4 py-3 min-h-[56px] min-w-[56px] rounded-xl transition-colors cursor-pointer touch-manipulation ${
              pathname.startsWith("/products") 
                ? "text-[#FC4B01]" 
                : "text-muted-foreground"
            }`}>
              <span className="text-sm font-medium">{t.nav.product}</span>
            </div>
          </div>
          
          <Link 
            href="/services" 
            className={`flex flex-col items-center gap-1.5 px-4 py-3 min-h-[56px] min-w-[56px] rounded-xl transition-colors touch-manipulation ${
              pathname === "/services" 
                ? "text-[#FC4B01]" 
                : "text-muted-foreground"
            }`}
          >
            <span className="text-sm font-medium">{t.nav.services}</span>
          </Link>
          
          <Link 
            href="/about" 
            className={`flex flex-col items-center gap-1.5 px-4 py-3 min-h-[56px] min-w-[56px] rounded-xl transition-colors touch-manipulation ${
              pathname === "/about" 
                ? "text-[#FC4B01]" 
                : "text-muted-foreground"
            }`}
          >
            <span className="text-sm font-medium">{t.nav.about}</span>
          </Link>
          
          <Link 
            href="/contact" 
            className={`flex flex-col items-center gap-1.5 px-4 py-3 min-h-[56px] min-w-[56px] rounded-xl transition-colors touch-manipulation ${
              pathname === "/contact" 
                ? "text-[#FC4B01]" 
                : "text-muted-foreground"
            }`}
          >
            <span className="text-sm font-medium">{t.nav.contact}</span>
          </Link>
        </div>
      </motion.div>

      {/* Mobile Product Modal - Centered */}
      <AnimatePresence>
        {isMobileProductOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileProductOpen(false)}
            />
            
            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm z-[70] md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">Products</h3>
                    <button
                      onClick={() => setIsMobileProductOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                
                {/* Modal Content */}
                <div className="p-4 space-y-3">
                  <Link
                    href="/products/yaadro"
                    className="block p-4 rounded-xl hover:bg-muted/50 transition-colors border border-border/50"
                    onClick={() => setIsMobileProductOpen(false)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src="/mockup/yaadro.png"
                          alt="Yaadro"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-foreground mb-1">{t.product.yaadro.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{t.product.yaadro.description}</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/products/lens"
                    className="block p-4 rounded-xl hover:bg-muted/50 transition-colors border border-border/50"
                    onClick={() => setIsMobileProductOpen(false)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src="/mockup/lens.png"
                          alt="Lens"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-foreground mb-1">{t.product.lens.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{t.product.lens.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

