import "./globals.css";

import localFont from "next/font/local";

import Precacher from "@/components/ui/precacher";
import Loading from "../components/ui/loading";
import CacheMonitor from "@/components/ui/CacheMonitor";

import LenisProvider from "@/lib/lenis";
import { ScrollLockProvider } from "@/context/ScrollLockContext";
import Script from "next/script";
import { buildVideoThumbnail, buildImageUrl } from "@/lib/cloudinary";
import { TrailerProvider } from "@/context/TrailerContext";
import TrailerOverlay from "@/components/ui/trailervideo";

const fontLong = localFont({
  src: [
    {
      path: "../public/fonts/long.woff",
      weight: "700", // أو 'bold'
    },
  ],
  variable: "--font-long",
  display: "swap",
  preload: false,
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
        url: buildImageUrl("hero-bg_dtrjtf"),
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
    images: [buildImageUrl("hero-bg_dtrjtf")],
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
  themeColor: "#ffb0c4",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://gta-vi-landing.vercel.app/#website",
        url: "https://gta-vi-landing.vercel.app",
        name: "Grand Theft Auto VI Landing Page",
        description:
          "Experience Grand Theft Auto VI - An immersive animated landing page showcasing Vice City, Jason, Lucia, and Cal.",
        publisher: {
          "@id": "https://gta-vi-landing.vercel.app/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://gta-vi-landing.vercel.app/#organization",
        name: "Rockstar Games",
        url: "https://www.rockstargames.com",
        logo: {
          "@type": "ImageObject",
          url: buildImageUrl("heroKeyArt_a7kave"),
        },
      },
      {
        "@type": "VideoGame",
        "@id": "https://gta-vi-landing.vercel.app/#videogame",
        name: "Grand Theft Auto VI",
        alternateName: "GTA VI",
        description:
          "Grand Theft Auto VI returns to Vice City with protagonists Jason and Lucia in an open-world action-adventure experience.",
        genre: ["Action", "Adventure", "Open World"],
        publisher: {
          "@type": "Organization",
          name: "Rockstar Games",
        },
        gamePlatform: ["PlayStation 5", "Xbox Series X", "Xbox Series S"],
        datePublished: "2026-05-26",
        image: buildImageUrl("hero-bg_dtrjtf"),
        trailer: {
          "@type": "VideoObject",
          name: "Grand Theft Auto VI Trailer",
          description:
            "Official trailer for Grand Theft Auto VI showcasing Vice City, Jason, and Lucia",
          thumbnailUrl:
            buildVideoThumbnail("Lucia_Caminos_1_rlbk0h") ||
            buildImageUrl("Lucia_Caminos_1_rlbk0h"),
          uploadDate: "2023-12-05T00:00:00Z",
          duration: "PT1M30S",
          contentUrl: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
          embedUrl: "https://www.youtube.com/embed/QdBZY2fkU-0",
        },
        character: [
          {
            "@type": "Person",
            name: "Jason",
          },
          {
            "@type": "Person",
            name: "Lucia",
          },
          {
            "@type": "Person",
            name: "Cal",
          },
        ],
        gameLocation: {
          "@type": "Place",
          name: "Vice City",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://gta-vi-landing.vercel.app/#webpage",
        url: "https://gta-vi-landing.vercel.app",
        name: "Grand Theft Auto VI | Official Landing Page",
        isPartOf: {
          "@id": "https://gta-vi-landing.vercel.app/#website",
        },
        about: {
          "@id": "https://gta-vi-landing.vercel.app/#videogame",
        },
        description:
          "Experience Grand Theft Auto VI - An immersive animated landing page showcasing Vice City, Jason, Lucia, and Cal. Coming May 26, 2026 on PlayStation and Xbox.",
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`loading-active ${fontLong.variable} ${fontRound.variable}`}
    >
      <head>
        {/* Preconnect to Cloudinary for faster asset loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-round antialiased ">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LenisProvider>
          <ScrollLockProvider>
            <TrailerProvider>
              <Loading />
              <div className="main-content" style={{ opacity: 0 }}>
                {children}
                <Precacher />
                {process.env.NODE_ENV === "development" && <CacheMonitor />}
              </div>
              <TrailerOverlay />
            </TrailerProvider>
          </ScrollLockProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
