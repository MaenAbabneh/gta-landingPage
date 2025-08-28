import { gtaData } from "./constants/Links.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Extract all section names dynamically from gtaData
    const allSections = Object.values(gtaData)
      .flatMap((category) => category)
      .filter((item) => item.href)
      .map((item) => item.href.replace(/^\/+|#+/g, ""))
      .filter((section) => section && !section.includes("/"));

    // Create rewrite rules for all sections
    return allSections.map((section) => ({
      source: `/${section}`,
      destination: "/",
    }));
  },
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // يسمح بتحميل أي صورة من أي مسار على هذا النطاق
      },
    ],
  },
};

export default nextConfig;
