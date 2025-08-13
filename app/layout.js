import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

const fontLong = localFont({
  src: "./fonts/long.woff",
  variable: "--font-long",
});

const fontRound = localFont({
  src: [
    {
      path: "./fonts/round.woff",
      weight: "400", // أو 'normal'
      style: "normal",
    },
    {
      path: "./fonts/round-bold.woff",
      weight: "700", // أو 'bold'
      style: "normal",
    },
  ],
  variable: "--font-round", // إنشاء متغير CSS لعائلة الخط
});

export const metadata = {
  title: "grand theft auto vi",
  description:
    "full animated landing page for grand theft auto vi not just website it's a experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fontLong.variable} ${fontRound.variable} font-sans antialiased`}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
