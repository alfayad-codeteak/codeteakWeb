"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations, type Language } from "@/lib/translations";

interface ServicesSectionProps {
  language: Language;
  isStandalonePage?: boolean;
}

type ServiceItem = {
  title: string;
  description: string;
  image: string;
};

type Category = {
  id: "cyberSecurity" | "productEngineering" | "productDesign";
  title: string;
  tagline: string;
  image: string;
  items: ServiceItem[];
};

export default function ServicesSection({
  language,
  isStandalonePage = false,
}: ServicesSectionProps) {
  const t = getTranslations(language);
  const [activeTab, setActiveTab] = useState<Category["id"]>("productEngineering");

  const categories: Category[] = [
    {
      id: "cyberSecurity",
      title: t.services.cyberSecurity.title,
      tagline: t.services.cyberSecurity.tagline,
      image: "/services-image/cyber-security.png",
      items: [
        { ...t.services.cyberSecurity.threatDetection, image: "/services-image/threat-detection.png" },
        { ...t.services.cyberSecurity.fraudPrevention, image: "/services-image/fraud-prevention.png" },
        { ...t.services.cyberSecurity.securityAudit, image: "/services-image/security-audit.png" },
        { ...t.services.cyberSecurity.networkSecurity, image: "/services-image/network-security.png" },
        { ...t.services.cyberSecurity.dataProtection, image: "/services-image/data-protection.png" },
        { ...t.services.cyberSecurity.incidentResponse, image: "/services-image/incident-response.png" },
      ],
    },
    {
      id: "productEngineering",
      title: t.services.productEngineering.title,
      tagline: t.services.productEngineering.tagline,
      image: "/services-image/product-engineering.png",
      items: [
        { ...t.services.productEngineering.backendDevelopment, image: "/services-image/backend-development.png" },
        { ...t.services.productEngineering.frontendDevelopment, image: "/services-image/frontend-development.png" },
        { ...t.services.productEngineering.cloudInfrastructure, image: "/services-image/cloud-infrastructure.png" },
        { ...t.services.productEngineering.devOps, image: "/services-image/devops.png" },
        { ...t.services.productEngineering.microservices, image: "/services-image/microservices.png" },
        { ...t.services.productEngineering.apiDevelopment, image: "/services-image/api-development.png" },
      ],
    },
    {
      id: "productDesign",
      title: t.services.productDesign.title,
      tagline: t.services.productDesign.tagline,
      image: "/services-image/product-design.png",
      items: [
        { ...t.services.productDesign.uiDesign, image: "/services-image/ui-design.png" },
        { ...t.services.productDesign.uxDesign, image: "/services-image/ux-design.png" },
        { ...t.services.productDesign.prototyping, image: "/services-image/prototyping.png" },
        { ...t.services.productDesign.designSystems, image: "/services-image/design-systems.png" },
        { ...t.services.productDesign.userResearch, image: "/services-image/user-research.png" },
        { ...t.services.productDesign.accessibility, image: "/services-image/accessibility.png" },
      ],
    },
  ];

  const activeCategory = categories.find((c) => c.id === activeTab) ?? categories[1];

  const ServiceCard = ({ item, index }: { item: ServiceItem; index: number }) => (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-muted/40 border border-border/60 hover:border-[#FC4B01]/35 transition-colors duration-300"
    >
      <div className="pointer-events-none absolute -top-1 -end-1 w-24 h-24 sm:w-28 sm:h-28 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-contain object-right-top rtl:object-left-top drop-shadow-sm"
          sizes="112px"
        />
      </div>
      <div className="relative z-10 p-5 sm:p-6 flex flex-col min-h-[180px]">
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3 text-brand-text">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-snug pe-20 sm:pe-24">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {item.description}
        </p>
      </div>
    </motion.article>
  );

  // ——— Homepage: compact tabbed section ———
  if (!isStandalonePage) {
    return (
      <section id="services" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t.services.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.services.subtitle}
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-10" dir="ltr">
            <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-muted/50 border border-border">
              {categories.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={isActive}
                    className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white bg-brand-strong"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.title}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-10">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 shrink-0">
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    fill
                    className="object-contain"
                    sizes="224px"
                  />
                </div>
                <div className="text-center lg:text-start max-w-xl">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight">
                    {activeCategory.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeCategory.tagline}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {activeCategory.items.map((item, index) => (
                  <ServiceCard key={item.title} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base hover:gap-3 transition-all text-brand-text"
            >
              {language === "ar" ? "عرض كل الخدمات" : "View all services"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ——— Standalone /services page: full stacked layout ———
  return (
    <section id="services" className="min-h-screen" style={{ backgroundColor: "#fff" }}>
      <div className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] mb-3 text-brand-text">
              {language === "ar" ? "ما نقدمه" : "What we offer"}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5">
              {t.services.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {categories.map((category, catIndex) => {
        const imageOnRight = catIndex % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className="py-14 md:py-24 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="container mx-auto max-w-7xl">
              <div
                className={`flex flex-col items-center gap-10 md:gap-14 lg:gap-16 mb-12 md:mb-16 ${
                  imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-[42%] flex justify-center"
                >
                  <div className="relative w-full max-w-[380px] aspect-square">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain drop-shadow-sm"
                      sizes="(max-width: 1024px) 380px, 42vw"
                      priority={catIndex === 0}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="w-full lg:w-[58%] space-y-4 md:space-y-5"
                >
                  <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-brand-text">
                    {String(catIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    {category.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {category.tagline}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {category.items.map((item, index) => (
                  <motion.div
                    key={`${category.id}-${item.title}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <ServiceCard item={item} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#fff" }}>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 max-w-4xl"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
                {language === "ar" ? "هل لديك مشروع؟" : "Have a project in mind?"}
              </h2>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "تحدث معنا وسنساعدك على اختيار الحل المناسب."
                  : "Talk to us and we will help you pick the right approach."}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-brand-strong font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              {language === "ar" ? "تواصل معنا" : "Talk to us"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
