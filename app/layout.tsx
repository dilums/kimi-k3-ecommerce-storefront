import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aurelle — Considered Goods for Modern Living",
    template: "%s — Aurelle",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "considered goods",
    "independent studios",
    "ceramics",
    "textiles",
    "lighting",
    "furniture",
    "slow living",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Aurelle — Considered Goods for Modern Living",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/hero/hero-main.webp", width: 1200, height: 800, alt: "A considered interior with Aurelle pieces" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelle — Considered Goods for Modern Living",
    description: SITE_DESCRIPTION,
    images: ["/images/hero/hero-main.webp"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Applies a saved dark preference before first paint; light is the
            default regardless of system preference. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("aurelle-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`}
        </Script>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
