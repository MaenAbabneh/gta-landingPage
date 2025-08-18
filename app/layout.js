import localFont from "next/font/local";
import "./globals.css";

const fontLong = localFont({
  src: "../public/fonts/long.woff",
  variable: "--font-long",
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
});

export const metadata = {
  title: "Grand Theft Auto VI",
  description:
    "full animated landing page for grand theft auto vi not just website it's a experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontLong.variable} ${fontRound.variable}`}>
      <body className="font-round antialiased ">{children}</body>
    </html>
  );
}
