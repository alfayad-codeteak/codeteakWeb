import type { Metadata } from "next";
import { techNewsMetadata } from "@/lib/metadata";

export const metadata: Metadata = techNewsMetadata;

export default function TechNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

