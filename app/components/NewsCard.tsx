"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";

interface NewsCardProps {
  article: {
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    source: {
      name: string;
    };
  };
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <Link
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {/* Image */}
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <div className="text-muted-foreground/50 text-4xl">📰</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Source and Date */}
          <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
            <span className="font-medium text-[#FC4B01]">
              {article.source.name}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-[#FC4B01] transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          {article.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {article.description}
            </p>
          )}

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-[#FC4B01] text-sm font-medium mt-auto pt-4 border-t border-border">
            <span>Read Article</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

