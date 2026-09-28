import type { Metadata } from "next";
import { servicesMetadata } from "@/lib/metadata";
import { translations } from "@/lib/translations";
import { BreadcrumbSchema, ServiceSchema } from "@/app/components/StructuredData";

export const metadata: Metadata = servicesMetadata;

const s = translations.en.services;

const serviceCategories = [
  {
    name: s.productEngineering.title,
    description: s.productEngineering.tagline,
    serviceType: "Software Development",
    offers: [
      s.productEngineering.backendDevelopment,
      s.productEngineering.frontendDevelopment,
      s.productEngineering.cloudInfrastructure,
      s.productEngineering.devOps,
      s.productEngineering.microservices,
      s.productEngineering.apiDevelopment,
    ],
  },
  {
    name: s.productDesign.title,
    description: s.productDesign.tagline,
    serviceType: "UI/UX Design",
    offers: [
      s.productDesign.uiDesign,
      s.productDesign.uxDesign,
      s.productDesign.prototyping,
      s.productDesign.designSystems,
      s.productDesign.userResearch,
      s.productDesign.accessibility,
    ],
  },
  {
    name: s.cyberSecurity.title,
    description: s.cyberSecurity.tagline,
    serviceType: "Cyber Security",
    offers: [
      s.cyberSecurity.threatDetection,
      s.cyberSecurity.fraudPrevention,
      s.cyberSecurity.securityAudit,
      s.cyberSecurity.networkSecurity,
      s.cyberSecurity.dataProtection,
      s.cyberSecurity.incidentResponse,
    ],
  },
];

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      {serviceCategories.map((category) => (
        <ServiceSchema
          key={category.name}
          name={category.name}
          description={category.description}
          serviceType={category.serviceType}
          offers={category.offers.map((offer) => ({ name: offer.title, description: offer.description }))}
        />
      ))}
      {children}
    </>
  );
}
