"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPLASH_MS = 2200;

export default function ProductsSplash() {
  const [showSplash, setShowSplash] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const key = "productsSplashShown";
    if (sessionStorage.getItem(key) === "true") {
      setShowSplash(false);
      return;
    }

    setShowSplash(true);
    sessionStorage.setItem(key, "true");

    const timer = setTimeout(() => setShowSplash(false), SPLASH_MS);
    return () => clearTimeout(timer);
  }, []);

  const skipSplash = () => setShowSplash(false);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#fff" }}
        >
          <button
            type="button"
            onClick={skipSplash}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-5 py-2.5 text-sm font-medium text-black/70 hover:text-black bg-white/80 hover:bg-white border border-black/20 rounded-full transition-colors"
            aria-label="Skip splash screen"
          >
            Skip
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 px-6"
          >
            <Image
              src="/products-image/logo-3d.png"
              alt="Yaadro"
              width={320}
              height={320}
              className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain"
              priority
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-sm sm:text-base font-mono uppercase tracking-[0.3em] text-[#6C3CE0]"
            >
              Yaadro
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
