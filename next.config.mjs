import withBundleAnalyzer from "@next/bundle-analyzer";

import { gtaData } from "./constants/Links.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    const allSections = Object.values(gtaData)
      .flatMap((category) => category)
      .filter((item) => item.href)
      .map((item) => item.href.replace(/^\/+|#+/g, ""))
      .filter((section) => section && !section.includes("/"));

    return allSections.map((section) => ({
      source: `/${section}`,
      destination: "/",
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["gsap"],
  },
  reactCompiler: true,
};
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
