import type { Metadata, Viewport } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.codeteak.com";
const siteName = "CodeTeak";
export const siteDescription =
  "CodeTeak is a software company based in Bengaluru and Dubai. We build custom web and mobile apps, and our product Yaadro is a delivery management system (DMS) and ecommerce platform for shops.";
const defaultImage = `${baseUrl}/og-image.jpg`;
const twitterHandle = "@codeteak";

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  additionalImages?: string[];
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
  additionalImages = [],
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["CodeTeak"],
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Ensure image URLs are absolute for WhatsApp and social platforms
  const toAbsoluteImageUrl = (img: string) =>
    img.startsWith("http")
      ? img
      : img.startsWith("/")
        ? `${baseUrl}${img}`
        : `${baseUrl}/${img}`;

  const allImageUrls = [image, ...additionalImages].map(toAbsoluteImageUrl);
  const ogImageUrl = allImageUrls[0];

  const defaultKeywords = Array.from(
    new Set([
      "CodeTeak",
      "Yaadro",
      "delivery management system",
      "ecommerce for shops",
      "software company Bengaluru",
      "software company Dubai",
      "software development",
      "product engineering",
      "product design",
      "cyber security",
      ...keywords,
    ])
  );

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
        ...allImageUrls.map((imgUrl) => ({
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        })),
      ],
      locale: "en_US",
      alternateLocale: ["ar_AE"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: url,
      languages: { "en": url, "x-default": url },
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
    category: "technology",
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

  // Add additional meta tags for WhatsApp and other platforms
  const isPng = /\.png$/i.test(image) || ogImageUrl.toLowerCase().includes(".png");
  metadata.other = {
    "og:image:alt": title,
    "twitter:image:alt": title,
    "og:image:secure_url": ogImageUrl, // WhatsApp requires secure_url
    "og:image:type": isPng ? "image/png" : "image/jpeg",
    "og:image:width": "1200",
    "og:image:height": "630",
  };

  return metadata;
}

// Pre-defined metadata for common pages
export const homeMetadata: Metadata = generateSEOMetadata({
  title: "CodeTeak — Software Company | Yaadro Delivery & Ecommerce",
  description:
    "CodeTeak is a software company based in Bengaluru, India and Dubai, UAE. Our product Yaadro is a delivery management system (DMS) and online store for shops. We also build custom web, mobile, and business software.",
  path: "/",
  keywords: [
    "CodeTeak software company",
    "software company Bengaluru",
    "software company Dubai",
    "software development company",
    "Yaadro",
    "delivery management system",
    "DMS for shops",
    "ecommerce platform for shops",
    "custom software development",
  ],
});

export const servicesMetadata: Metadata = generateSEOMetadata({
  title: "Services - Build, Design, and Secure Your Software",
  description:
    "CodeTeak helps you build, design, and protect your software. Product engineering (web, mobile, backend, cloud, DevOps, APIs), product design (UI, UX, prototypes, design systems), and cyber security (audits, threat detection, data protection).",
  path: "/services",
  keywords: [
    "software development services",
    "web app development",
    "mobile app development",
    "backend development",
    "frontend development",
    "cloud infrastructure",
    "DevOps and CI/CD",
    "API development",
    "UI UX design",
    "prototyping",
    "design systems",
    "cyber security services",
    "security audit",
    "threat detection",
    "data protection",
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
  title: "Products - Yaadro DMS & Ecommerce",
  description:
    "Yaadro is our delivery management system and ecommerce platform for shops: manage home deliveries and sell online with pay on delivery.",
  path: "/products",
  keywords: [
    "Yaadro",
    "delivery management system",
    "DMS",
    "ecommerce platform for shops",
    "home delivery app for shops",
    "online ordering pay on delivery",
    "business software products",
  ],
});

export const aboutMetadata: Metadata = generateSEOMetadata({
  title: "About CodeTeak - Founders and Core Team",
  description:
    "Meet the people behind CodeTeak, the team that builds Yaadro. Founded by Muhammed Rizwan P (Founder & CEO) and Mohammed Aslam (Co-Founder & COO), with core engineers including Alfayad S (Alfayad Shameer) — Kerala-based Full Stack Developer & UI/UX Designer who built the CodeTeak website — plus Abhinav Aneesh, Binel Biju, and Alan Joshy. Offices in Bengaluru and Dubai.",
  path: "/about",
  additionalImages: [
    "/core-team/rizwan.png",
    "/core-team/aslam.png",
    "/core-team/Alfayad.png",
    "/core-team/Abhinav.png",
    "/core-team/Binel.jpeg",
    "/core-team/Alan.jpeg",
  ],
  keywords: [
    "about CodeTeak",
    "software development company",
    "core development team",
    "engineering leadership",
    "full stack developer",
    "UI UX designer",
    "mobile app engineer",
    "backend developer",
    "cloud engineer",
    "DevOps specialist",
    "Muhammed Rizwan P",
    "Mohammed Aslam",
    "Alfayad S",
    "Alfayad Shameer",
    "Alfayad full stack developer",
    "Alfayad UI UX designer Kerala",
    "full stack developer Kerala",
    "UI UX designer India",
    "Next.js developer Bengaluru",
    "web designer Dubai team",
    "who built CodeTeak website",
    "Abhinav Aneesh",
    "Binel Biju",
    "Alan Joshy",
  ],
  authors: ["CodeTeak", "Muhammed Rizwan P", "Mohammed Aslam", "Alfayad S", "Abhinav Aneesh", "Binel Biju", "Alan Joshy"],
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

export const blogMetadata: Metadata = generateSEOMetadata({
  title: "Blog",
  description: "CodeTeak blog – articles, insights, and updates on software development, technology, and industry trends. Coming soon.",
  path: "/blog",
  keywords: [
    "CodeTeak blog",
    "software development blog",
    "tech insights",
    "industry updates",
  ],
  noIndex: true,
});

export const termsMetadata: Metadata = generateSEOMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using CodeTeak Technologies LLC and Yaadro services and products, including UAE statutory compliance, payments, refunds, intellectual property, and liability.",
  path: "/terms-and-conditions",
  keywords: [
    "CodeTeak terms and conditions",
    "CodeTeak legal",
    "CodeTeak UAE compliance",
    "software services terms",
    "SaaS terms",
    "Yaadro terms",
  ],
});

export const privacyMetadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for CodeTeak Technologies LLC and Yaadro, explaining how we collect, use, and protect personal information for merchants, clients, and end customers.",
  path: "/privacy-policy",
  keywords: [
    "CodeTeak privacy policy",
    "Yaadro privacy policy",
    "data protection",
    "UAE privacy",
    "merchant data",
    "end customer privacy",
  ],
});

export function generateProductMetadata(
  slug: string,
  title: string,
  description: string,
  keywords: string[] = [],
  options: { noIndex?: boolean; image?: string } = {}
): Metadata {
  return generateSEOMetadata({
    title,
    description,
    path: `/products/${slug}`,
    image: options.image,
    keywords: options.noIndex ? [] : [slug.toLowerCase(), ...keywords],
    type: "product",
    noIndex: options.noIndex,
  });
}

