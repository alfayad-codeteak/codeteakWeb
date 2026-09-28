import { translations } from "@/lib/translations";

const en = translations.en;

export interface ProductSeo {
  slug: string;
  name: string;
  title: string;
  description: string;
  image: string;
  category: string;
  audience: string;
  keywords: string[];
  features: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const productSeo: Record<string, ProductSeo> = {
  yaadro: {
    slug: "yaadro",
    name: "Yaadro",
    title: "Yaadro - Delivery Management System (DMS) & Ecommerce",
    description:
      "Yaadro is a delivery management system and ecommerce platform for shops. Track every home delivery, assign delivery partners, and keep customers updated. Give each shop its own online store with pay on delivery. Works with Task billing.",
    image: "/products-image/yaadro.png",
    category: "Delivery management system (DMS) and ecommerce",
    audience: "Shops, supermarkets, and delivery partners",
    keywords: [
      "Yaadro",
      "Yaadro DMS",
      "delivery management system",
      "DMS for shops",
      "ecommerce platform for shops",
      "home delivery app for shops",
      "delivery management software",
      "supermarket delivery app",
      "delivery partner app",
      "live order tracking",
      "online ordering for shops",
      "pay on delivery",
      "cash on delivery online store",
      "Task billing integration",
    ],
    features: [
      ...en.products.yaadro.features,
      `${en.productDetail.yaadro.smartFeatures.supermarketApp.title}: ${en.productDetail.yaadro.smartFeatures.supermarketApp.description}`,
      `${en.productDetail.yaadro.smartFeatures.deliveryPartnerApp.title}: ${en.productDetail.yaadro.smartFeatures.deliveryPartnerApp.description}`,
      `${en.productDetail.yaadro.smartFeatures.webDashboard.title}: ${en.productDetail.yaadro.smartFeatures.webDashboard.description}`,
      "Works with Task billing: delivery orders created in Task appear in Yaadro automatically",
    ],
    faq: [
      {
        question: "What is Yaadro?",
        answer:
          "Yaadro is a delivery management system (DMS) and ecommerce platform for shops. It connects the shop, the delivery partner, and the customer, so every order can be tracked until it arrives, and customers can order online and pay on delivery.",
      },
      {
        question: "How does Yaadro work?",
        answer: `1) ${en.productDetail.yaadro.process.steps.createOrder.description} 2) ${en.productDetail.yaadro.process.steps.assignPartner.description} 3) ${en.productDetail.yaadro.process.steps.completeOrder.description}`,
      },
      {
        question: "Does Yaadro work with Task billing?",
        answer: en.productDetail.yaadro.integration.description,
      },
      {
        question: "Can customers pay online?",
        answer: "No. They pay when the order arrives. Online pay can be added later.",
      },
      {
        question: "Can each shop have its own products?",
        answer: "Yes. Every shop has its own products and prices.",
      },
      {
        question: "How do customers order?",
        answer: "They open your shop link, pick products, and order from phone or computer.",
      },
    ],
  },
  lens: {
    slug: "lens",
    name: "Lens",
    title: "Lens - Simple Camera Attendance for Any Business",
    description:
      "Lens is a simple attendance system for any business. Staff clock in by looking at a tablet camera. See who is at work live, track pay and salary advances, and download reports in one click. Works even without internet.",
    image: "/products-image/lens.png",
    category: "Staff attendance and payroll tracking",
    audience: "Any business with staff: shops, offices, restaurants, clinics, warehouses",
    keywords: [
      "Lens attendance",
      "face attendance system",
      "camera attendance app",
      "staff attendance tablet",
      "employee attendance app",
      "contactless attendance",
      "offline attendance system",
      "salary advance tracking",
      "attendance reports",
      "attendance for small business",
    ],
    features: [
      ...en.productDetail.lens.topFeatures.items.map((item) => `${item.title}: ${item.description}`),
      `Works without internet: ${en.productDetail.lens.features.offlineFirst.description}`,
      `One or many locations: ${en.productDetail.lens.features.multiTenant.description}`,
    ],
    faq: en.productDetail.lens.faq.items,
  },
};
