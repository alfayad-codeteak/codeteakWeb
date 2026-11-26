import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://codeteak.com";

/**
 * Professional sitemap for https://codeteak.com
 * Used by search engines for discovery and crawl priority.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${baseUrl}/services-image/product-engineering.png`,
        `${baseUrl}/services-image/product-design.png`,
        `${baseUrl}/services-image/cyber-security.png`,
      ],
    },
    {
      url: `${baseUrl}/products`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/products-image/yaadro.png`],
    },
    {
      url: `${baseUrl}/products/yaadro`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [
        `${baseUrl}/products-image/yaadro.png`,
        `${baseUrl}/products-image/yaadro-ecommerce-hero.jpg`,
        `${baseUrl}/task-integration-image.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tech-news`,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  return routes;
}
