import "./globals.css";

import localFont from "next/font/local";

import Precacher from "@/components/precacher";
import LenisProvider from "@/lib/lenis";

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
  title: "Grand Theft Auto VI",
  description:
    "Full animated landing page for Grand Theft Auto VI - not just a website, it's an experience.",
  keywords: ["GTA VI", "Grand Theft Auto", "gaming", "Rockstar Games"],
  authors: [{ name: "Maen Ababneh" }],
  robots: "index, follow",
  openGraph: {
    title: "Grand Theft Auto VI",
    description:
      "Full animated landing page for Grand Theft Auto VI - not just a website, it's an experience.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontLong.variable} ${fontRound.variable}`}>
      <body className="font-round antialiased ">
        <LenisProvider>
          {children}
          <Precacher />
        </LenisProvider>
      </body>
    </html>
  );
}
