export default function sitemap() {
  const baseUrl = "https://gta.maenababneh.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
