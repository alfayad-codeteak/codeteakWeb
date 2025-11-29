"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, Newspaper } from "lucide-react";
import NewsCard from "../components/NewsCard";
import Navigation from "../components/Navigation";
import { getTranslations, type Language } from "@/lib/translations";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  status: string;
  articles: Article[];
  totalResults?: number;
  error?: string;
  message?: string;
}

export default function TechNewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      updateTheme(initialTheme);

      const savedLanguage = localStorage.getItem("language") as "en" | "ar" | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      const handleScroll = () => {
        setShowBackToTop(window.scrollY > 300);
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", lang);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/news");

      if (!response.ok) {
        const errorData = await response.json();
        // Show more detailed error message
        const errorMessage = errorData.error || errorData.message || "Failed to fetch news";
        const details = errorData.details ? ` (${errorData.details})` : '';
        throw new Error(`${errorMessage}${details}`);
      }

      const data: NewsResponse = await response.json();

      if (data.status === "ok" && data.articles) {
        // Filter out articles without required fields
        const validArticles = data.articles.filter(
          (article) => article.title && article.url
        );
        setNews(validArticles);
      } else {
        throw new Error(data.message || "Invalid response from news API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 mb-6">
            <Newspaper className="w-4 h-4 text-[#FC4B01]" />
            <span className="text-sm font-medium text-muted-foreground">Tech News</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Latest Technology News
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments in technology, innovation, and digital trends
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-[#FC4B01] animate-spin mb-4" />
            <p className="text-muted-foreground">Loading latest tech news...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Error Loading News</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            {error.includes("API key") || error.includes("Authentication") ? (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left text-sm">
                <p className="font-semibold text-foreground mb-2">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Get a free API key from <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" className="text-[#FC4B01] hover:underline">newsapi.org</a></li>
                  <li>Create a <code className="bg-background px-1 py-0.5 rounded text-xs">.env.local</code> file in your project root</li>
                  <li>Add: <code className="bg-background px-1 py-0.5 rounded text-xs">NEWS_API_KEY=your_api_key_here</code></li>
                  <li>Restart your development server</li>
                </ol>
              </div>
            ) : null}
            <button
              onClick={fetchNews}
              className="px-6 py-3 bg-[#FC4B01] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}

        {/* News Grid */}
        {!loading && !error && news.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing {news.length} {news.length === 1 ? "article" : "articles"}
              </p>
              <button
                onClick={fetchNews}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-[#FC4B01] transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No News Available</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any tech news at the moment. Please try again later.
            </p>
            <button
              onClick={fetchNews}
              className="px-6 py-3 bg-[#FC4B01] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Refresh
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

