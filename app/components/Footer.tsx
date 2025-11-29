"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  X,
  Instagram,
  Youtube,
  Facebook,
  Linkedin as LinkedinIcon,
  Cloud,
  MapPin,
  Wind,
  Thermometer,
  Battery,
} from "lucide-react";
import { getTranslations, type Language } from "@/lib/translations";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "ar">(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem("language") as "en" | "ar") || "en";
    }
    return "en";
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Listen to storage events (for cross-tab updates)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "language" && e.newValue) {
          setLanguage(e.newValue as "en" | "ar");
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Check for language changes periodically
      intervalRef.current = setInterval(() => {
        const currentLanguage = localStorage.getItem("language") as "en" | "ar" | null;
        if (currentLanguage) {
          setLanguage(prev => {
            if (prev !== currentLanguage) {
              return currentLanguage;
            }
            return prev;
          });
        }
      }, 500);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        // Using Bengaluru coordinates as default
        const response = await fetch('/api/weather?lat=12.874395210839836&lon=77.61370881001027');
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Get battery information
  useEffect(() => {
    const getBatteryInfo = async () => {
      if (typeof window !== 'undefined' && 'getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          
          const updateBattery = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          };

          // Initial update
          updateBattery();

          // Listen for battery changes
          battery.addEventListener('chargingchange', updateBattery);
          battery.addEventListener('levelchange', updateBattery);

          return () => {
            battery.removeEventListener('chargingchange', updateBattery);
            battery.removeEventListener('levelchange', updateBattery);
          };
        } catch (error) {
          console.error('Failed to get battery info:', error);
        }
      }
    };

    getBatteryInfo();
  }, []);

  const t = getTranslations(language as Language);

  // Footer social media with brand colors and usernames
  const footerSocialLinks: Array<{
    icon: typeof X | null;
    href: string;
    label: string;
    username: string;
    color: string;
  }> = [
    { 
      icon: X, 
      href: "#", 
      label: "X", 
      username: "@codeteak",
      color: "#000000"
    },
    { 
      icon: Instagram, 
      href: "#", 
      label: "Instagram", 
      username: "codeteaks",
      color: "#E4405F"
    },
    { 
      icon: LinkedinIcon, 
      href: "#", 
      label: "Linkedin", 
      username: "Codeteak",
      color: "#0077B5"
    },
    { 
      icon: Youtube, 
      href: "#", 
      label: "YouTube", 
      username: "@codeteak",
      color: "#FF0000"
    },
    { 
      icon: Facebook, 
      href: "#", 
      label: "Facebook", 
      username: "@codeteak",
      color: "#1877F2"
    },
  ];

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="bg-card rounded-3xl p-8 sm:p-12 mb-8">
          {/* Top Section - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            {/* Left Column - Brand Introduction */}
            <div>
              <p className="text-foreground text-sm leading-relaxed">
                {t.footer.brand.description}
              </p>
            </div>

            {/* Middle-Left Column - Explore */}
            <div>
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wide">{t.footer.explore.title}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#home" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
                    {t.footer.explore.home}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
                    {t.footer.explore.about}
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
                    {t.footer.explore.services}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
                    {t.footer.explore.products}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-muted-foreground hover:text-[#FC4B01] transition-colors text-sm">
                    {t.footer.explore.contact}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle-Right Column - Follow Me */}
            <div>
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wide">{t.footer.follow.title}</h3>
              <ul className="space-y-3">
                {footerSocialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <a 
                        href={social.href} 
                        className="flex items-center gap-2 text-muted-foreground hover:opacity-80 transition-all text-sm"
                        style={{ 
                          color: hoveredSocial === social.label ? social.color : undefined 
                        }}
                        onMouseEnter={() => setHoveredSocial(social.label)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        {Icon ? (
                          <Icon className="w-4 h-4" style={{ color: hoveredSocial === social.label ? social.color : undefined }} />
                        ) : (
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: hoveredSocial === social.label ? social.color : '#8B5CF6' }} />
                        )}
                        <span>{social.username}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Column - Call to Action */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[#FC4B01] font-semibold mb-2 text-sm uppercase tracking-wide">{t.footer.call}</h3>
                <p className="text-muted-foreground text-sm mb-3">Let&apos;s work together</p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FC4B01] text-white hover:opacity-90 transition-opacity"
                  aria-label={t.footer.call}
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2 text-sm uppercase tracking-wide">{t.footer.courses}</h3>
                <p className="text-muted-foreground text-sm mb-3">Creative tools</p>
                <Link
                  href="/#courses"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
                  aria-label={t.footer.courses}
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section - Large Brand Name */}
          <div className="border-t border-border pt-12">
            <motion.h2 
              key={hoveredSocial || 'default'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-7xl sm:text-8xl lg:text-9xl lowercase font-bold mb-12 tracking-tight transition-colors duration-300" 
              style={{ 
                fontFamily: 'sans-serif',
                color: hoveredSocial 
                  ? footerSocialLinks.find(s => s.label === hoveredSocial)?.color || 'inherit'
                  : undefined
              }}
            >
              {hoveredSocial 
                ? footerSocialLinks.find(s => s.label === hoveredSocial)?.username || t.footer.codeteak
                : t.footer.codeteak + '.'
              }
            </motion.h2>

            {/* Bottom Footer Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                <span>{t.footer.copyright}</span>
                <Link href="#privacy" className="hover:text-[#FC4B01] transition-colors">
                  {t.footer.privacy}
                </Link>
              </div>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                {/* Locations */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Bengaluru Location */}
                  <div className="relative group">
                    <a
                      href="https://www.google.com/maps?q=12.874395210839836,77.61370881001027"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#FC4B01] transition-colors"
                    >
                      <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="font-medium">Bengaluru</span>
                    </a>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                      <div className="bg-foreground text-background text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                        <p className="font-medium mb-1">Bengaluru Office</p>
                        <p className="text-background/90">
                          Arine Amaryllis, Akshayanagara West, Akshaya Gardens, Akshayanagar, Bengaluru, Karnataka 560114
                        </p>
                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dubai Location */}
                  <div className="relative group">
                    <a
                      href="https://www.google.com/maps?q=25.271468639880588,55.302489429935676"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#FC4B01] transition-colors"
                    >
                      <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="font-medium">Dubai</span>
                    </a>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                      <div className="bg-foreground text-background text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                        <p className="font-medium mb-1">Dubai Office</p>
                        <p className="text-background/90">
                          Room No. 4, Index Exchange Building, Opposite Wimpy Restaurant, Naif Road
                        </p>
                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Time, Weather, and Battery */}
                <div className="flex flex-wrap items-center gap-4">
                  <span>{new Date().toLocaleTimeString(language === 'ar' ? 'ar-AE' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                  {weatherLoading ? (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Cloud className="w-4 h-4 animate-pulse" />
                      <span className="text-xs">Loading...</span>
                    </div>
                  ) : weather ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Temperature */}
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-[#FC4B01]" />
                        <span className="text-xs font-medium">{Math.round(weather.main.temp)}°C</span>
                      </div>
                      {/* Cloudiness */}
                      <div className="flex items-center gap-1">
                        <Cloud className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs">{weather.clouds.all}%</span>
                      </div>
                      {/* Wind */}
                      <div className="flex items-center gap-1">
                        <Wind className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs">{weather.wind.speed} m/s</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Cloud className="w-4 h-4" />
                      <span className="text-xs">N/A</span>
                    </div>
                  )}
                  {/* Battery */}
                  {batteryLevel !== null && (
                    <div className="flex items-center gap-1">
                      <Battery 
                        className={`w-4 h-4 ${
                          batteryLevel > 50 ? 'text-green-500' : 
                          batteryLevel > 20 ? 'text-yellow-500' : 
                          'text-red-500'
                        } ${isCharging ? 'animate-pulse' : ''}`} 
                      />
                      <span className="text-xs font-medium">
                        {batteryLevel}%{isCharging && ' ⚡'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

