import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://codeteak.com";
const siteName = "CodeTeak";
const defaultDescription = "We build cutting-edge software solutions that drive your business forward. Expert development, design, and consulting services.";
const defaultImage = `${baseUrl}/og-image.jpg`; // You can create and add this image later
const twitterHandle = "@codeteak"; // Update with actual Twitter handle

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  path = "",
  image = defaultImage,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["CodeTeak"],
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | ${siteName}`;

  const defaultKeywords = [
    "CodeTeak",
    "software development",
    "web development",
    "mobile app development",
    "cyber security",
    "product engineering",
    "product design",
    "cloud infrastructure",
    "DevOps",
    "UI/UX design",
    "software solutions",
    "technology consulting",
    ...keywords,
  ];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: defaultKeywords.join(", "),
    authors: authors.map((author) => ({ name: author })),
    creator: "CodeTeak",
    publisher: "CodeTeak",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: type === "article" ? "article" : "website",
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      alternateLocale: ["ar_AE"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(baseUrl),
    applicationName: siteName,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteName,
    },
  };

  // Add article-specific metadata
  if (type === "article" && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors,
    };
  }

  // Add JSON-LD structured data hints in description for better SEO
  metadata.other = {
    "og:image:alt": title,
    "twitter:image:alt": title,
  };

  return metadata;
}

// Pre-defined metadata for common pages
export const homeMetadata: Metadata = generateSEOMetadata({
  title: "Innovative Software Solutions",
  description: "Transform your ideas into digital excellence. We craft innovative software solutions including web development, mobile apps, cyber security, and AI integration. 100+ projects delivered with 95% client satisfaction.",
  path: "/",
  keywords: [
    "software development company",
    "web development services",
    "mobile app development",
    "cyber security solutions",
    "product engineering",
    "custom software",
    "technology solutions",
  ],
});

export const servicesMetadata: Metadata = generateSEOMetadata({
  title: "Our Services",
  description: "Comprehensive software development services including Cyber Security, Product Engineering, and Product Design. From threat detection to scalable cloud infrastructure, we deliver cutting-edge solutions for your business.",
  path: "/services",
  keywords: [
    "cyber security services",
    "threat detection",
    "fraud prevention",
    "product engineering",
    "backend development",
    "frontend development",
    "cloud infrastructure",
    "DevOps services",
    "UI design",
    "UX design",
    "product design",
  ],
});

export const contactMetadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description: "Get in touch with CodeTeak for your software development needs. We have offices in Bengaluru, India and Dubai, UAE. Email us at info@codeteak.com or call +91 99952 03149.",
  path: "/contact",
  keywords: [
    "contact CodeTeak",
    "software development contact",
    "get a quote",
    "consultation",
    "Bengaluru office",
    "Dubai office",
  ],
});

export const productsMetadata: Metadata = generateSEOMetadata({
  title: "Our Products",
  description: "Discover CodeTeak's innovative products including Yaadro analytics platform and Lens visual data insights. Built with cutting-edge technology to solve real-world business challenges.",
  path: "/products",
  keywords: [
    "Yaadro",
    "Lens",
    "analytics platform",
    "data insights",
    "business intelligence",
    "data visualization",
  ],
});

export const aboutMetadata: Metadata = generateSEOMetadata({
  title: "About Us",
  description: "Learn about CodeTeak - a passionate team of developers, designers, and consultants creating exceptional software solutions. With 100+ projects delivered, we help startups and enterprises build scalable applications.",
  path: "/about",
  keywords: [
    "about CodeTeak",
    "software development company",
    "development team",
    "technology experts",
    "software consultants",
  ],
});

export const techNewsMetadata: Metadata = generateSEOMetadata({
  title: "Tech News",
  description: "Stay updated with the latest technology news, trends, and insights from the software development world. Curated tech news and industry updates.",
  path: "/tech-news",
  keywords: [
    "tech news",
    "technology updates",
    "software development news",
    "tech trends",
    "industry news",
  ],
  type: "article",
});

// Product-specific metadata generator
export function generateProductMetadata(slug: string, title: string, description: string): Metadata {
  const productKeywords = [
    slug.toLowerCase(),
    title,
    "analytics",
    "data insights",
    "business intelligence",
    "software product",
  ];

  return generateSEOMetadata({
    title,
    description,
    path: `/products/${slug}`,
    keywords: productKeywords,
    type: "product",
  });
}

