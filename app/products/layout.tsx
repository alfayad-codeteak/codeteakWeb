import type { Metadata } from "next";
import { productsMetadata } from "@/lib/metadata";

export const metadata: Metadata = productsMetadata;

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

