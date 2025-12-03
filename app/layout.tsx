import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import { generateSEOMetadata } from "@/lib/metadata";
import { OrganizationSchema, WebSiteSchema } from "./components/StructuredData";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Innovative Software Solutions",
  description: "We build cutting-edge software solutions that drive your business forward. Expert development, design, and consulting services. Transform your ideas into digital excellence.",
  keywords: [
    "CodeTeak",
    "software development",
    "web development",
    "mobile app development",
    "cyber security",
    "product engineering",
    "product design",
    "cloud infrastructure",
    "DevOps",
    "UI/UX design",
    "software solutions",
    "technology consulting",
    "Bengaluru",
    "Dubai",
    "UAE",
    "India",
  ],
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreen />
        <GoogleAnalytics />
        <OrganizationSchema />
        <WebSiteSchema />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
