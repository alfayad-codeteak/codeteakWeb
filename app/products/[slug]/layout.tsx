import type { Metadata } from "next";
import { generateProductMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Product information based on slug
  const productInfo: Record<
    string,
    { title: string; description: string }
  > = {
    yaadro: {
      title: "Yaadro - Delivery Management System",
      description:
        "Yaadro is a comprehensive delivery management system designed to seamlessly connect supermarkets, delivery partners, and customers. With dedicated mobile apps for supermarkets and delivery partners, plus a powerful web dashboard, Yaadro streamlines the entire delivery process from order placement to doorstep delivery.",
    },
    lens: {
      title: "Lens - AI-Powered Face Recognition Attendance System",
      description:
        "Lens is an AI-powered face recognition attendance system for retail stores and supermarkets. It provides contactless, automated attendance tracking with offline capabilities, real-time analytics, and enterprise-grade security. Features DeepFace ML with 90%+ accuracy in employee identification.",
    },
  };

  const product = productInfo[slug] || {
    title: "Product",
    description: "Discover our innovative software products designed to solve real-world business challenges.",
  };

  return generateProductMetadata(slug, product.title, product.description);
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

