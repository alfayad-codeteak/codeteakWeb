import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import { homeMetadata, siteViewport } from "@/lib/metadata";
import { OrganizationSchema, WebSiteSchema } from "./components/StructuredData";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ChatWidget from "./components/ChatWidget";

// Set to true to show the AI chat widget again
const SHOW_CHAT_WIDGET = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  ...homeMetadata,
  verification: {
    other: {
      "facebook-domain-verification": "0skxahz5dp7eu1r75x25i3af72rtac",
    },
  },
};

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
        {SHOW_CHAT_WIDGET && <ChatWidget />}
        <Footer />
      </body>
    </html>
  );
}
