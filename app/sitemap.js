import { gtaData } from "@/constants/Links"; 

export default function sitemap() {
  const baseUrl = "https://gta-vi-landing.vercel.app";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];


  const allSections = Object.values(gtaData)
    .flatMap((category) => category)
    .filter((item) => item.href) 
    .map((item) => item.href.replace(/^\/+|#+/g, "")) 
    .filter((section) => section && !section.includes("/"));

  allSections.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly", 
      priority: 0.8, 
    });
  });

  return routes;
}