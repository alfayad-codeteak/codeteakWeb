import { siteDescription } from "@/lib/metadata";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.codeteak.com";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  }[];
  sameAs?: string[];
}

export function OrganizationSchema({
  name = "CodeTeak",
  url = baseUrl,
  logo = `${baseUrl}/icon-512.png`,
  description = siteDescription,
  email = "info@codeteak.com",
  phone = "+91 99952 03149",
  address = [
    {
      streetAddress:
        "4th floor, 1190 Desk NO-FD 78, Eva Info Marketing Solution Pvt Ltd, 22nd Cross Road, HSR Layout, Bengaluru Urban",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560102",
      addressCountry: "IN",
    },
    {
      streetAddress: "Index Exchange Building, Opposite Wimpy Restaurant, Naif Road",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  sameAs = [
    "https://x.com/codeteak",
    "https://www.linkedin.com/company/codeteak",
    "https://www.instagram.com/codeteaks/",
    "https://www.facebook.com/people/Codeteak-Technologies/61575111071671/",
  ],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name,
    legalName: "Codeteak Technologies",
    url,
    logo,
    image: `${baseUrl}/og-image.jpg`,
    description,
    email,
    telephone: phone,
    foundingDate: "2025",
    founder: [
      { "@type": "Person", name: "Muhammed Rizwan P", jobTitle: "Founder & CEO" },
      { "@type": "Person", name: "Mohammed Aslam", jobTitle: "Co-Founder & COO" },
    ],
    employee: [
      {
        "@type": "Person",
        "@id": `${baseUrl}/about#alfayad`,
        name: "Alfayad S",
        alternateName: "Alfayad Shameer",
        jobTitle: "Full Stack Developer & UI/UX Designer",
        url: "https://alfayad.clawdage.com",
        image: `${baseUrl}/core-team/Alfayad.png`,
        worksFor: { "@id": `${baseUrl}/#organization` },
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
        },
        knowsAbout: [
          "Full stack development",
          "UI/UX design",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "NestJS",
          "Design systems",
          "Docker",
          "Kubernetes",
        ],
        sameAs: [
          "https://alfayad.clawdage.com",
          "https://github.com/Alfayad-s",
          "https://www.linkedin.com/in/alfayad",
          "https://x.com/alfayad_shameer",
        ],
      },
      {
        "@type": "Person",
        name: "Abhinav Aneesh",
        jobTitle: "Mobile Application Developer",
        sameAs: ["https://www.linkedin.com/in/abiinavvv/", "https://github.com/abiinavvv"],
      },
      {
        "@type": "Person",
        name: "Binel Biju",
        jobTitle: "Backend Developer & Cloud Engineer",
        sameAs: ["https://www.linkedin.com/in/binel-biju/", "https://github.com/binelbpe"],
      },
      {
        "@type": "Person",
        name: "Alan Joshy",
        jobTitle: "Backend Developer & Cloud Engineer",
        sameAs: ["https://www.linkedin.com/in/alan--joshy/", "https://github.com/alanjoshy"],
      },
    ],
    address: address.map((addr) => ({
      "@type": "PostalAddress",
      streetAddress: addr.streetAddress,
      addressLocality: addr.addressLocality,
      addressRegion: addr.addressRegion,
      postalCode: addr.postalCode,
      addressCountry: addr.addressCountry,
    })),
    areaServed: ["IN", "AE", "Worldwide"],
    brand: [
      {
        "@type": "Brand",
        name: "Yaadro",
        description: "Delivery management system (DMS) and ecommerce platform for shops",
        url: `${baseUrl}/products/yaadro`,
      },
    ],
    knowsAbout: [
      "Delivery management system",
      "Ecommerce for shops",
      "Home delivery management",
      "Online ordering",
      "Web development",
      "Mobile app development",
      "Product design",
      "Cyber security",
      "Cloud infrastructure",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email,
      telephone: phone,
      availableLanguage: ["English", "Arabic"],
    },
    sameAs,
  };

  return <JsonLd data={schema} />;
}

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebSiteSchema({
  name = "CodeTeak",
  url = baseUrl,
  description = siteDescription,
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name,
    url,
    description,
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  return <JsonLd data={schema} />;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return <JsonLd data={schema} />;
}

interface ProductSchemaProps {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory?: string;
  applicationSubCategory?: string;
  operatingSystem?: string;
  featureList?: string[];
  audience?: string;
}

export function ProductSchema({
  name,
  alternateName,
  description,
  url,
  image,
  applicationCategory = "BusinessApplication",
  applicationSubCategory,
  operatingSystem = "Web, Android, iOS",
  featureList,
  audience,
}: ProductSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}${url}#software`,
    name,
    alternateName,
    description,
    url: `${baseUrl}${url}`,
    image: image ? `${baseUrl}${image}` : undefined,
    applicationCategory,
    applicationSubCategory,
    operatingSystem,
    featureList,
    audience: audience ? { "@type": "BusinessAudience", audienceType: audience } : undefined,
    publisher: { "@id": `${baseUrl}/#organization` },
    provider: { "@id": `${baseUrl}/#organization` },
  };

  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) delete schema[key];
  });

  return <JsonLd data={schema} />;
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
  areaServed?: string[];
  offers?: Array<{ name: string; description: string }>;
}

export function ServiceSchema({
  name,
  description,
  url = "/services",
  serviceType = "Software Development",
  areaServed = ["India", "United Arab Emirates", "Worldwide"],
  offers = [],
}: ServiceSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${baseUrl}${url}`,
    serviceType,
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: areaServed.map((area) => ({ "@type": "Place", name: area })),
  };

  if (offers.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer.name, description: offer.description },
      })),
    };
  }

  return <JsonLd data={schema} />;
}

export function FAQSchema({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <JsonLd data={schema} />;
}

export function ItemListSchema({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.url}`,
      description: item.description,
    })),
  };

  return <JsonLd data={schema} />;
}

interface PersonSchemaProps {
  name: string;
  alternateName?: string;
  jobTitle: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  homeLocation?: {
    addressRegion?: string;
    addressCountry?: string;
  };
  knowsAbout?: string[];
  worksFor?: string;
}

export function PersonSchema({
  name,
  alternateName,
  jobTitle,
  description,
  image = `${baseUrl}/core-team/Alfayad.png`,
  url,
  sameAs = [],
  homeLocation,
  knowsAbout = [],
  worksFor = "CodeTeak",
}: PersonSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    alternateName,
    jobTitle,
    description,
    image,
    url,
    worksFor: {
      "@type": "Organization",
      name: worksFor,
      url: baseUrl,
    },
    knowsAbout,
    sameAs,
  };

  if (homeLocation) {
    schema.homeLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: homeLocation.addressRegion,
        addressCountry: homeLocation.addressCountry,
      },
    };
  }

  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) delete schema[key];
  });

  return <JsonLd data={schema} />;
}

