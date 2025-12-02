const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://codeteak.com";

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
  logo = `${baseUrl}/logo.png`,
  description = "We build cutting-edge software solutions that drive your business forward. Expert development, design, and consulting services.",
  email = "info@codeteak.com",
  phone = "+91 99952 03149",
  address = [
    {
      streetAddress: "Arine Amaryllis, Akshayanagara West, Akshaya Gardens, Akshayanagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560114",
      addressCountry: "IN",
    },
    {
      streetAddress: "Index Exchange Building, Opposite Wimpy Restaurant, Naif Road",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  sameAs = [
    "https://twitter.com/codeteak",
    "https://linkedin.com/company/codeteak",
    "https://instagram.com/codeteak",
  ],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: logo,
    description,
    email,
    telephone: phone,
    address: address.map((addr) => ({
      "@type": "PostalAddress",
      streetAddress: addr.streetAddress,
      addressLocality: addr.addressLocality,
      addressRegion: addr.addressRegion,
      postalCode: addr.postalCode,
      addressCountry: addr.addressCountry,
    })),
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  potentialAction?: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export function WebSiteSchema({
  name = "CodeTeak",
  url = baseUrl,
  description = "We build cutting-edge software solutions that drive your business forward.",
  potentialAction = {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export function ProductSchema({
  name,
  description,
  url,
  image,
  brand = "CodeTeak",
  offers,
}: ProductSchemaProps) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${baseUrl}${url}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: offers
      ? {
          "@type": "Offer",
          price: offers.price || "0",
          priceCurrency: offers.priceCurrency || "USD",
          availability: offers.availability || "https://schema.org/InStock",
        }
      : undefined,
  };

  if (image) {
    schema.image = `${baseUrl}${image}`;
  }

  if (brand) {
    schema.brand = {
      "@type": "Brand",
      name: brand,
    };
  }

  // Remove undefined fields
  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
}

export function ServiceSchema({
  name,
  description,
  provider = "CodeTeak",
  areaServed = ["Worldwide"],
  serviceType = "Software Development",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
    serviceType,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

