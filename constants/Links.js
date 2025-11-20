const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlgi2ockk";
const CLD_BASE = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto`;

export const gtaData = {
  People: [
    {
      label: "JASON DUVAL",
      href: "jason",
      image: `${CLD_BASE}/jason_gx78kx`,
    },
    {
      label: "LUCIA CAMINOS",
      href: "lucia",
      image: `${CLD_BASE}/lucia_j9bdgy`,
    },
    {
      label: "Cal Hampton",
      href: "cal",
      image: `${CLD_BASE}/cal_ysuh7h`,
    },
    {
      label: "BOOBIE IKE",
      href: "boobie",
      image: `${CLD_BASE}/boobie_s0m2av`,
    },
    {
      label: "DRE'QUAN PRIEST",
      href: "dre",
      image: `${CLD_BASE}/drequan_yizlm5`,
    },
    {
      label: "REAL DIMEZ",
      href: "real",
      image: `${CLD_BASE}/dimez_dzukob`,
    },
    {
      label: "RAUL BAUTISTA",
      href: "raul",
      image: `${CLD_BASE}/raul_mpzomv`,
    },
    {
      label: "BRIAN HEDER",
      href: "brian",
      image: `${CLD_BASE}/brian_iyou7l`,
    },
  ],

  Places: [
    {
      label: "Vice City",
      href: "vice-city",
      image: `${CLD_BASE}/vice-city_a6uudi`,
    },
    {
      label: "Leonida Keys",
      href: "leonida-keys",
      image: `${CLD_BASE}/leonida-keys_bfcmpe`,
    },
    {
      label: "Grassrivers",
      href: "grassrivers",
      image: `${CLD_BASE}/grassrivers_uggitj`,
    },
    {
      label: "Port Gellhorn",
      href: "port-gellhorn",
      image: `${CLD_BASE}/port-gellhorn_wj8wwg`,
    },
    {
      label: "Ambrosia",
      href: "ambrosia",
      image: `${CLD_BASE}/ambrosia_d438ao`,
    },
    {
      label: "Mount Kalaga",
      href: "mount-kalaga",
      image: `${CLD_BASE}/kalaga_elxxtp`,
    },
  ],

  Trailers: [
    {
      title: "Grand Theft Auto VI Trailer 2",
      date: "May 6, 2025",
      duration: "2:47",
      isNew: true,
      href: "trailers",
      video_ID: "VQRLujxTm3c?si=cmgYRfzxn6XsMc3Z",
      thumbnail: "/images/t2.webp",
    },
    {
      title: "Grand Theft Auto VI Trailer 1",
      date: "December 4, 2023",
      duration: "1:31",
      isNew: false,
      href: "trailers",
      video_ID: "QdBZY2fkU-0?si=Flj6imKlgmCxQEE5",
      thumbnail: "/images/t1.webp",
    },
  ],

  Downloads: [
    {
      title: "Videos",
      thumbnail: "/images/videos-desktop.webp",
    },
    {
      title: "Screenshots",
      thumbnail: "/images/screenshots-desktop.webp",
    },
    {
      title: "Artwork & Wallpapers",
      thumbnail: "/images/artwork-desktop.webp",
    },
  ],
};
