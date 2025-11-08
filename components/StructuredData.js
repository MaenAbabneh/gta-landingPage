export default function StructuredData() {
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
          url: "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/heroKeyArt_a7kave",
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
        image:
          "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/hero-bg_dtrjtf",
        trailer: {
          "@type": "VideoObject",
          name: "Grand Theft Auto VI Trailer",
          description: "Official trailer for Grand Theft Auto VI",
          thumbnailUrl:
            "https://res.cloudinary.com/dlgi2ockk/video/upload/so_end/w_1920/q_auto:best/f_auto/Lucia_Caminos_1_rlbk0h.jpg",
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
