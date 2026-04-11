import "./globals.css";

import localFont from "next/font/local";
import Script from "next/script";

// import CacheMonitor from "@/components/ui/CacheMonitor";
import Precacher from "@/components/ui/precacher";
import TrailerOverlay from "@/components/ui/trailervideo";
import { ScrollLockProvider } from "@/context/ScrollLockContext";
import { TrailerProvider } from "@/context/TrailerContext";
import { buildImageUrl, buildVideoThumbnail } from "@/lib/cloudinary";
import LenisProvider from "@/lib/lenis";

import Loading from "../components/ui/loading";

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

const siteUrl = "https://gta.maenababneh.dev";
const seoDescriptionEn =
  "Experience Grand Theft Auto VI - An immersive animated landing page showcasing Vice City, Jason, Lucia, and Cal. Coming May 26, 2026 on PlayStation and Xbox.";
const seoDescriptionAr =
  "عِش تجربة Grand Theft Auto VI في صفحة تفاعلية سينمائية تعرض Vice City وشخصيات Jason وLucia وCal. الإصدار في 26 مايو 2026 على PlayStation وXbox.";
const seoDescription = `${seoDescriptionEn} | ${seoDescriptionAr}`;

export const metadata = {
  // eslint-disable-next-line compat/compat
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grand Theft Auto VI | Official Landing Page",
    template: "%s | GTA VI",
  },
  description: seoDescription,
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
    "جراند ثفت أوتو 6",
    "جي تي اي 6",
    "فايس سيتي",
    "جيسون",
    "لوسيا",
  ],
  authors: [
    {
      name: "معن عبابنة | Maen Ababneh",
      url: "https://github.com/MaenAbabneh",
    },
  ],
  creator: "معن عبابنة | Maen Ababneh",
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
    alternateLocale: "ar_AR",
    url: siteUrl,
    title: "Grand Theft Auto VI | Official Landing Page",
    description: seoDescription,
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
    description: seoDescription,
    images: [buildImageUrl("hero-bg_dtrjtf")],
  },
  alternates: {
    canonical: siteUrl,
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
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Grand Theft Auto VI Landing Page",
        description: seoDescription,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: ["en-US", "ar"],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Rockstar Games",
        url: "https://www.rockstargames.com",
        logo: {
          "@type": "ImageObject",
          url: buildImageUrl("heroKeyArt_a7kave"),
        },
      },
      {
        "@type": "VideoGame",
        "@id": `${siteUrl}/#videogame`,
        name: "Grand Theft Auto VI",
        alternateName: "GTA VI",
        description:
          "Grand Theft Auto VI returns to Vice City with protagonists Jason and Lucia in an open-world action-adventure experience. | تعود Grand Theft Auto VI إلى Vice City مع البطلين Jason وLucia في تجربة عالم مفتوح.",
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
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Grand Theft Auto VI | Official Landing Page",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#videogame`,
        },
        description: seoDescription,
        inLanguage: ["en-US", "ar"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Characters",
            item: `${siteUrl}/#characters`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Vice City",
            item: `${siteUrl}/#vice-city`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "When is Grand Theft Auto VI (GTA VI) releasing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Grand Theft Auto VI is scheduled to release on May 26, 2026 on PlayStation 5 and Xbox Series X/S.",
            },
          },
          {
            "@type": "Question",
            name: "What platforms will Grand Theft Auto VI be available on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "GTA VI will be available on PlayStation 5 (PS5) and Xbox Series X and Series S",
            },
          },
          {
            "@type": "Question",
            name: "Who are the main characters in Grand Theft Auto VI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The main protagonists are Jason Duval and Lucia Caminos. Cal Hampton is also a key character in the game set in Vice City.",
            },
          },
          {
            "@type": "Question",
            name: "What is the setting of Grand Theft Auto VI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Grand Theft Auto VI is set in Vice City, drawing from the classic GTA Vice City setting. The story follows Jason and Lucia through a criminal conspiracy across the state of Leonida.",
            },
          },
          {
            "@type": "Question",
            name: "Is this an open-world game?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Grand Theft Auto VI is an open-world action-adventure game featuring the iconic Vice City with dynamic environments and interactive gameplay.",
            },
          },
        ],
      },
      {
        "@type": "Event",
        "@id": `${siteUrl}/#gta6-release-event`,
        name: "Grand Theft Auto VI Release",
        description:
          "Official release of Grand Theft Auto VI | الإطلاق الرسمي للعبة Grand Theft Auto VI",
        startDate: "2026-05-26",
        endDate: "2026-05-26",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        location: {
          "@type": "VirtualLocation",
          url: siteUrl,
        },
        organizer: {
          "@type": "Organization",
          name: "Rockstar Games",
          url: "https://www.rockstargames.com",
        },
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

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HNXLW60412"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HNXLW60412');
            `,
          }}
        />
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
                {/* {process.env.NODE_ENV === "development" && <CacheMonitor />} */}
              </div>
              <TrailerOverlay />
            </TrailerProvider>
          </ScrollLockProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
