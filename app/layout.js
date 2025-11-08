import "./globals.css";

import localFont from "next/font/local";

import Precacher from "@/components/precacher";
import Loading from "../components/loading";
import LenisProvider from "@/lib/lenis";
import StructuredData from "@/components/StructuredData";

const fontLong = localFont({
  src: [
    {
      path: "../public/fonts/long.woff",
      weight: "700", // أو 'bold'
    },
  ],
  variable: "--font-long",
  display: "swap",
  preload: true,
});

const fontRound = localFont({
  src: [
    {
      path: "../public/fonts/round.woff",
      weight: "500", // أو 'normal'
      style: "normal",
    },
    {
      path: "../public/fonts/round-bold.woff",
      weight: "700", // أو 'bold'
      style: "normal",
    },
    {
      path: "../public/fonts/round-black.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-round", // إنشاء متغير CSS لعائلة الخط
  display: "swap",
  preload: true,
});

export const metadata = {
  title: {
    default: "Grand Theft Auto VI | Official Landing Page",
    template: "%s | GTA VI",
  },
  description:
    "Experience Grand Theft Auto VI - An immersive animated landing page showcasing Vice City, Jason, Lucia, and Cal. Coming May 26, 2026 on PlayStation and Xbox.",
  keywords: [
    "GTA VI",
    "Grand Theft Auto VI",
    "GTA 6",
    "Rockstar Games",
    "Vice City",
    "gaming",
    "action adventure",
    "open world",
    "PlayStation",
    "Xbox",
    "2026",
    "Jason",
    "Lucia",
  ],
  authors: [{ name: "Maen Ababneh", url: "https://github.com/MaenAbabneh" }],
  creator: "Maen Ababneh",
  publisher: "Rockstar Games",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gta-vi-landing.vercel.app",
    title: "Grand Theft Auto VI | Official Landing Page",
    description:
      "Experience Grand Theft Auto VI - An immersive animated landing page showcasing Vice City, Jason, Lucia, and Cal. Coming May 26, 2026.",
    siteName: "GTA VI Landing Page",
    images: [
      {
        url: "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/hero-bg_dtrjtf",
        width: 1920,
        height: 1080,
        alt: "Grand Theft Auto VI - Vice City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Theft Auto VI | Coming May 26, 2026",
    description:
      "Experience the next chapter in the Grand Theft Auto series. Explore Vice City with Jason and Lucia.",
    images: [
      "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/hero-bg_dtrjtf",
    ],
  },
  alternates: {
    canonical: "https://gta-vi-landing.vercel.app",
  },
  category: "gaming",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontLong.variable} ${fontRound.variable}`}>
      <head>
        {/* Preconnect to Cloudinary for faster asset loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <StructuredData />
      </head>
      <body className="font-round antialiased ">
        <Loading />
        <div className="main-content" style={{ opacity: 0 }}>
          <LenisProvider>
            {children}
            <Precacher />
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
