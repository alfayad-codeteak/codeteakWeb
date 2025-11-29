"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Eye, 
  Sparkles, 
  TrendingUp, 
  Brain, 
  Workflow, 
  Search,
  Server,
  Layout,
  Cloud,
  GitBranch,
  Code,
  Palette,
  UserCheck,
  FileCode,
  Layers,
  Users,
  Accessibility
} from "lucide-react";
import { getTranslations, type Language } from "@/lib/translations";

interface ServicesSectionProps {
  language: Language;
  isStandalonePage?: boolean;
}

export default function ServicesSection({ language, isStandalonePage = false }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<"aiMl" | "productEngineering" | "productDesign">("aiMl");
  const t = getTranslations(language);

  const aiMlServices = [
    {
      icon: Eye,
      title: t.services.aiMl.computerVision.title,
      description: t.services.aiMl.computerVision.description,
    },
    {
      icon: Sparkles,
      title: t.services.aiMl.generativeAi.title,
      description: t.services.aiMl.generativeAi.description,
    },
    {
      icon: TrendingUp,
      title: t.services.aiMl.predictiveAnalytics.title,
      description: t.services.aiMl.predictiveAnalytics.description,
    },
    {
      icon: Brain,
      title: t.services.aiMl.nlp.title,
      description: t.services.aiMl.nlp.description,
    },
    {
      icon: Workflow,
      title: t.services.aiMl.aiOps.title,
      description: t.services.aiMl.aiOps.description,
    },
    {
      icon: Search,
      title: t.services.aiMl.anomalyDetection.title,
      description: t.services.aiMl.anomalyDetection.description,
    },
  ];

  const productEngineeringServices = [
    {
      icon: Server,
      title: t.services.productEngineering.backendDevelopment.title,
      description: t.services.productEngineering.backendDevelopment.description,
    },
    {
      icon: Layout,
      title: t.services.productEngineering.frontendDevelopment.title,
      description: t.services.productEngineering.frontendDevelopment.description,
    },
    {
      icon: Cloud,
      title: t.services.productEngineering.cloudInfrastructure.title,
      description: t.services.productEngineering.cloudInfrastructure.description,
    },
    {
      icon: GitBranch,
      title: t.services.productEngineering.devOps.title,
      description: t.services.productEngineering.devOps.description,
    },
    {
      icon: Code,
      title: t.services.productEngineering.microservices.title,
      description: t.services.productEngineering.microservices.description,
    },
    {
      icon: FileCode,
      title: t.services.productEngineering.apiDevelopment.title,
      description: t.services.productEngineering.apiDevelopment.description,
    },
  ];

  const productDesignServices = [
    {
      icon: Palette,
      title: t.services.productDesign.uiDesign.title,
      description: t.services.productDesign.uiDesign.description,
    },
    {
      icon: UserCheck,
      title: t.services.productDesign.uxDesign.title,
      description: t.services.productDesign.uxDesign.description,
    },
    {
      icon: FileCode,
      title: t.services.productDesign.prototyping.title,
      description: t.services.productDesign.prototyping.description,
    },
    {
      icon: Layers,
      title: t.services.productDesign.designSystems.title,
      description: t.services.productDesign.designSystems.description,
    },
    {
      icon: Users,
      title: t.services.productDesign.userResearch.title,
      description: t.services.productDesign.userResearch.description,
    },
    {
      icon: Accessibility,
      title: t.services.productDesign.accessibility.title,
      description: t.services.productDesign.accessibility.description,
    },
  ];

  const tabs = [
    { id: "aiMl" as const, label: t.services.aiMl.title },
    { id: "productEngineering" as const, label: t.services.productEngineering.title },
    { id: "productDesign" as const, label: t.services.productDesign.title },
  ];

  const getActiveServices = () => {
    switch (activeTab) {
      case "aiMl":
        return aiMlServices;
      case "productEngineering":
        return productEngineeringServices;
      case "productDesign":
        return productDesignServices;
    }
  };

  const getActiveTagline = () => {
    switch (activeTab) {
      case "aiMl":
        return t.services.aiMl.tagline;
      case "productEngineering":
        return t.services.productEngineering.tagline;
      case "productDesign":
        return t.services.productDesign.tagline;
    }
  };

  return (
    <section id="services" className={`${isStandalonePage ? 'min-h-screen' : ''} py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/30 to-background`}>
      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        {!isStandalonePage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t.services.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>
        )}

        {/* Tab Navigation - Liquid Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="relative inline-flex p-0.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/10 dark:border-white/20 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Active Tab Indicator */}
            <motion.div
              layoutId="activeTab"
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#FC4B01] via-[#FF6B35] to-[#FC4B01] shadow-lg shadow-[#FC4B01]/50"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{
                left: `${tabs.findIndex(t => t.id === activeTab) * (100 / tabs.length)}%`,
                width: `${100 / tabs.length}%`,
              }}
            />

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-6 py-1.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  minWidth: `${100 / tabs.length}%`,
                }}
              >
                <motion.span
                  initial={false}
                  animate={{
                    scale: activeTab === tab.id ? 1.05 : 1,
                    fontWeight: activeTab === tab.id ? 600 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {tab.label}
                </motion.span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="mb-12"
          >
            {/* Title and Tagline Section */}
            <div className="flex flex-col items-center mb-12">
              <motion.h3
                key={`title-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              >
                {tabs.find(t => t.id === activeTab)?.label}
              </motion.h3>
              <motion.p
                key={`tagline-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg text-muted-foreground text-center max-w-2xl"
              >
                {getActiveTagline()}
              </motion.p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getActiveServices().map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={`${activeTab}-${service.title}`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + (index * 0.08),
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 bg-card rounded-xl border-2 border-border hover:border-[#FC4B01]/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FC4B01]/5 via-transparent to-[#9D4EDD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-[#FC4B01]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FC4B01]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#FC4B01]" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#FC4B01] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

