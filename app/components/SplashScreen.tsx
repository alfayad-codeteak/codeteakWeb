"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if splash has been shown before in this session
    if (typeof window !== "undefined") {
      // For testing: uncomment the line below to always show splash screen
      // sessionStorage.removeItem("splashShown");
      
      const splashShown = sessionStorage.getItem("splashShown");
      
      if (splashShown === "true") {
        setShowSplash(false);
        return;
      }

      // Show splash screen
      setShowSplash(true);
      
      // Mark splash as shown immediately to prevent showing again in same session
      sessionStorage.setItem("splashShown", "true");
    }
  }, []);

  const skipSplash = () => {
    setShowSplash(false);
  };

  const handleVideoEnd = () => {
    setShowSplash(false);
  };

  const handleVideoLoaded = () => {
    console.log("Splash video loaded successfully");
    setIsVideoLoaded(true);
  };
  
  const handleVideoCanPlay = () => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  };

  const handleVideoError = (e: any) => {
    console.error("Splash video error:", e);
    // If video fails to load, hide splash after 2 seconds
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted || !showSplash) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          {/* Skip button - bottom middle (mobile & desktop) */}
          <button
            type="button"
            onClick={skipSplash}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-5 py-2.5 text-sm font-medium text-black/70 hover:text-black bg-white/80 hover:bg-white border border-black/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black/30"
            aria-label="Skip splash screen"
          >
            Skip
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Show loading state while video loads */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isVideoLoaded ? 1 : 0,
                scale: isVideoLoaded ? 1 : 0.9
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                loop={false}
                preload="auto"
                onEnded={handleVideoEnd}
                onLoadedData={handleVideoLoaded}
                onCanPlay={handleVideoCanPlay}
                onError={handleVideoError}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              >
                <source src="/videos/splash.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

