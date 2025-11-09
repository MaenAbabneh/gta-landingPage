import {
  buildImageUrl,
  buildResponsiveVideoUrls,
  buildVideoThumbnail,
  buildImagePlaceholder,
} from "@/lib/cloudinary";

export const SITE_ASSIST = [
  { id: "intro_ff13rf", type: "video" },
  { id: "Jason_Duval_2_so4cun", type: "video" },
  { id: "Lucia_Caminos_1_rlbk0h", type: "video" },
  { id: "Lucai_Caminos_2_rqqw1q", type: "video" },
  { id: "Cal_Hampton_mnncgn", type: "video" },
  { id: "Vice_City_tazkqo", type: "video" },
  { id: "outro_dy82ms", type: "video" },
  { id: "Jason_Duval_01_kacoeq", type: "image" },
  { id: "Jason_Duval_02_ttet2g", type: "image" },
  { id: "Jason_Duval_03_ov4pov", type: "image" },
  { id: "Jason_Duval_04_o8svr3", type: "image" },
  { id: "Jason_Duval_05_wjqust", type: "image" },
  { id: "Jason_Duval_06_cw2nsy", type: "image" },
  { id: "Lucia_Caminos_01_xop0wy", type: "image" },
  { id: "Lucia_Caminos_02_qjfc8d", type: "image" },
  { id: "Lucia_Caminos_03_ftk7mc", type: "image" },
  { id: "Lucia_Caminos_04_zi5oly", type: "image" },
  { id: "Lucia_Caminos_05_jrgiqp", type: "image" },
  { id: "Lucia_Caminos_06_uw8s0y", type: "image" },
  { id: "Cal_Hampton_01_oydy8k", type: "image" },
  { id: "Cal_Hampton_02_ovpofu", type: "image" },
  { id: "Cal_Hampton_03_tgmisg", type: "image" },
  { id: "Cal_Hampton_04_nfkpl2", type: "image" },
  { id: "Vice_City_01_dyxolq", type: "image" },
  { id: "Vice_City_02_p4kb75", type: "image" },
  { id: "Vice_City_03_vbluvl", type: "image" },
  { id: "Vice_City_04_lbxujb", type: "image" },
  { id: "Vice_City_05_wyibjy", type: "image" },
  { id: "Vice_City_06_fmx7mb", type: "image" },
  { id: "Vice_City_07_a8vfhb", type: "image" },
  { id: "Vice_City_08_idq42h", type: "image" },
  { id: "Vice_City_09_uqekdh", type: "image" },
];

export const prebuiltassets = SITE_ASSIST.map((asset) => {
  if (asset.type === "image") {
    return {
      ...asset,
      url: buildImageUrl(asset.id),
      placeholder: buildImagePlaceholder(asset.id),
    };
  } else {
    return {
      ...asset,
      urls: buildResponsiveVideoUrls(asset.id),
      poster: buildVideoThumbnail(asset.id, {
        time: "end",
        width: 1920,
        quality: "auto:best",
      }),
    };
  }
});

const buildImageObject = (imageData) => {
  const result = {};
  for (const [key, value] of Object.entries(imageData)) {
    result[key] = {
      ...value,
      url: buildImageUrl(value.src),
      placeholder: buildImagePlaceholder(value.src),
    };
  }
  return result;
};

export const JasonImage = buildImageObject({
  Image_1: {
    src: "Jason_Duval_01_kacoeq",
    alt: "Jason sitting on a motorcycle holding a handgun.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_2: {
    src: "Jason_Duval_02_ttet2g",
    alt: "Jason inside a car sitting behind the wheel looking into the distance.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_3: {
    src: "Jason_Duval_06_cw2nsy",
    alt: "Four men in a bar. In the foreground, Jason and Cal are at the bar with beers. In the background two men are looking their way.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_4: {
    src: "Jason_Duval_04_o8svr3",
    alt: "Jason outside on the street leaning against a tree while looking at his phone.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_5: {
    src: "Jason_Duval_05_wjqust",
    alt: "Jason holding and aiming an automatic weapon.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_6: {
    src: "Jason_Duval_03_ov4pov",
    alt: "Jason and Cal on a boat. Jason is holding a fishing rod and Cal is holding binoculars up to his eyes.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 40vw",
  },
  Viwer_1: {
    src: "Jason_Viewer_01_mmasgr",
  },
  Viwer_2: {
    src: "Jason_Viewer_02_sepepk",
  },
  Viwer_3: {
    src: "Jason_Viewer_06_u15fhw",
  },
  Viwer_4: {
    src: "Jason_Viewer_04_dfrjoc",
  },
  Viwer_5: {
    src: "Jason_Viewer_05_o46vuw",
  },
  Viwer_6: {
    src: "Jason_Viewer_03_cug5oq",
  },
});

export const LuciaImage = buildImageObject({
  Image_1: {
    src: "Lucia_Caminos_01_xop0wy",
    alt: "Lucia punching a heavy bag in a gym.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_2: {
    src: "Lucia_Caminos_02_qjfc8d",
    alt: "Lucia in sunglasses resting her arms on the side of a pool with a tropical drink beside her and a phone on the other side.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_3: {
    src: "Lucia_Caminos_05_jrgiqp",
    alt: "Inside a jail, Lucia and another woman are handcuffed and wearing orange jumpsuits as they walk by a window where another woman watches through the glass. An officer stands nearby.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_4: {
    src: "Lucia_Caminos_04_zi5oly",
    alt: "Lucia holding a handgun while hiding behind a slightly open door. On the other side a man is pointing a handgun through the open gap.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_5: {
    src: "Lucia_Caminos_06_uw8s0y",
    alt: "Lucia crossing her arms while holding a phone is surrounded by people dancing and flashing lights.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_6: {
    src: "Lucia_Caminos_03_ftk7mc",
    alt: "Lucia leaning on a motorcyle. She is wearing a leather jacket and looking into the distance.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Viwer_1: {
    src: "Lucia_Viewer_01_oaqmzv",
  },
  Viwer_2: {
    src: "Lucia_Viewer_02_psphdq",
  },
  Viwer_3: {
    src: "Lucia_Viewer_05_hwnddd",
  },
  Viwer_4: {
    src: "Lucia_Viewer_04_aqjllz",
  },
  Viwer_5: {
    src: "Lucia_Viewer_06_xr57ov",
  },
  Viwer_6: {
    src: "Lucia_Viewer_03_j5qclp",
  },
});

export const CalImage = buildImageObject({
  Image_1: {
    src: "Cal_Hampton_01_oydy8k",
    alt: "Cal Hampton standing in an urban setting with graffiti art in the background",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_2: {
    src: "Cal_Hampton_02_ovpofu",
    alt: "Cal Hampton sitting on stairs in a gritty urban environment",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_3: {
    src: "Cal_Hampton_03_tgmisg",
    alt: "Cal Hampton walking down a city street at night with neon lights",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_4: {
    src: "Cal_Hampton_04_nfkpl2",
    alt: "Cal Hampton leaning against a brick wall with urban street art",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Viwer_1: {
    src: "Cal_Viewer_01_lg8imp",
  },
  Viwer_2: {
    src: "Cal_Viewer_02_wfjl8r",
  },
  Viwer_3: {
    src: "Cal_Viwer_03_hgfgeu",
  },
  Viwer_4: {
    src: "Cal_Viewer_04_om5qtm",
  },
});

export const ViceCityImage = buildImageObject({
  Image_1: {
    src: "Vice_City_01_dyxolq",
    alt: "A vibrant cityscape of Vice City at sunset, showcasing its iconic skyline and waterfront.",
    size: "100vw",
  },
  Image_2: {
    src: "Vice_City_02_p4kb75",
    alt: "Aerial view of Vice City's bustling downtown area with neon lights and busy streets at night.",
    size: "100vw",
  },
  Image_3: {
    src: "Vice_City_03_vbluvl",
    alt: "A serene beach scene in Vice City with palm trees, sandy shores, and a colorful sunset.",
    size: "100vw",
  },
  Image_4: {
    src: "Vice_City_04_lbxujb",
    alt: "A lively street in Vice City filled with vintage cars, pedestrians, and vibrant storefronts.",
    size: "100vw",
  },
  Image_5: {
    src: "Vice_City_05_wyibjy",
    alt: "A nighttime view of Vice City's skyline reflected in the calm waters of the bay.",
    size: "100vw",
  },
  Image_6: {
    src: "Vice_City_06_fmx7mb",
    alt: "A panoramic shot of Vice City's iconic landmarks against a backdrop of a setting sun.",
    size: "100vw",
  },
  Image_7: {
    src: "Vice_City_07_a8vfhb",
    alt: "A bustling market scene in Vice City with colorful stalls, vendors, and shoppers.",
    size: "100vw",
  },
  Image_8: {
    src: "Vice_City_08_idq42h",
    alt: "A scenic view of Vice City's coastline with boats, piers, and a vibrant sunset sky.",
    size: "100vw",
  },
  Image_9: {
    src: "Vice_City_09_uqekdh",
    alt: "A dynamic street scene in Vice City featuring classic cars, neon signs, and lively nightlife.",
    size: "100vw",
  },
  Viewer_1: {
    src: "Vice_City_viewer_01_wtpvem",
  },
  Viewer_2: {
    src: "Vice_City_viewer_02_ndpkfc",
  },
  Viewer_3: {
    src: "Vice_City_viewer_03_fksrhu",
  },
  Viewer_4: {
    src: "Vice_City_viewer_04_rjsol4",
  },
  Viewer_5: {
    src: "Vice_City_viewer_05_xurgeb",
  },
  Viewer_6: {
    src: "Vice_City_viewer_06_atdrd2",
  },
  Viewer_7: {
    src: "Vice_City_viewer_07_rdd1pp",
  },
  Viewer_8: {
    src: "Vice_City_viewer_08_twvp9l",
  },
  Viewer_9: {
    src: "Vice_City_viewer_09_adyvi3",
  },
});

export const HeroImage = buildImageObject({
  HeroBG: {
    src: "hero-bg_dtrjtf",
  },
  HeroKeyArt: {
    src: "heroKeyArt_a7kave",
  },
});
