import {
  buildImagePlaceholder,
  buildImageUrl,
  buildResponsiveVideoUrls,
  buildVideoThumbnail,
} from "@/lib/cloudinary";

export const SITE_ASSIST = [
  // To provide a mobile-optimized video, add a `mobileId` property.
  // e.g. { id: 'intro_ff13rf', mobileId: 'intro_ff13rf_mobile', type: 'video' }
  
  { id: "intro_ff13rf", type: "video", mobileId: "Lucia_Caminos_mobile_rkbhmx" },
  { id: "Jason_Duval_2_i1i3s6", type: "video", mobileId: "Jason_Duval_mobile_2_pigkcq" },
  { id: "Lucia_Caminos_1_rlbk0h", type: "video", mobileId: "intro_mobile_tx8cql" },
  { id: "Lucai_Caminos_2_rqqw1q", type: "video", mobileId: "Lucia_Caminos_mobile_2_qa9spk" },
  { id: "Cal_Hampton_mnncgn", type: "video", mobileId: "Cal_Hampton_mobile_eo0dgu" },
  { id: "Vice_City_tazkqo", type: "video", mobileId: "vice_City_mobile_tugsol" },
  { id: "outro_dy82ms", type: "video", mobileId: "Outro_mobile_pdesiw" },
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
      // If an asset includes a `mobileId` property, buildResponsiveVideoUrls will
      // accept an object: { mobile, tablet, desktop }. We pass the desktop id
      // by default and let the helper pick fallback values.
      urls: buildResponsiveVideoUrls(
        asset.mobileId
          ? { mobile: asset.mobileId, desktop: asset.id || asset.mobileId }
          : asset.id
      ),
      poster: buildVideoThumbnail(asset.id || asset.mobileId, {
        time: "end",
        width: 1920,
        quality: "auto:best",
      }),
      // posterMobile for smaller screens; build from mobileId if provided, else fall back
      posterMobile: buildVideoThumbnail(asset.mobileId || asset.id, {
        time: "end",
        width: 720,
        quality: "auto:best",
      }),
    };
  }
});

/**
 * getAssetById(id)
 * -----------------
 * Lookup helper that returns the `prebuiltassets` entry for the given id.
 * The function will first try to match a desktop `id`, then a `mobileId`.
 *
 * Returns: the full asset object from `prebuiltassets` or `null` if not found.
 *
 * Example:
 *   const asset = getAssetById('Jason_Duval_2_i1i3s6');
 *   // asset.urls, asset.poster, asset.posterMobile are available if defined
 */
export function getAssetById(id) {
  if (!id) return null;
  // First try exact id match
  let found = prebuiltassets.find((a) => a.id === id);
  if (found) return found;
  // Next try mobileId match
  found = prebuiltassets.find((a) => a.mobileId === id);
  return found || null;
}

/**
 * getAssetIds(id)
 * ----------------
 * Normalization helper returning a small object used by most components and
 * hooks. It accepts a desktop id or a mobile id and returns a fallback-safe
 * structure with the following fields:
 *   - desktop: publicId string used for desktop
 *   - mobile: publicId string used for mobile
 *   - poster: desktop poster URL or null
 *   - posterMobile: poster URL for mobile or fallback to poster
 *   - urls: prebuilt video urls (desktop/tablet/mobile) if available
 *
 * Returns an object even when the asset isn't present in `prebuiltassets` —
 * this makes the caller logic simple and safe.
 *
 * Example:
 *   const { desktop, mobile, posterMobile } = getAssetIds('Cal_Hampton_mnncgn');
 */
export function getAssetIds(id) {
  const asset = getAssetById(id);
  if (!asset) {
    return {
      desktop: id,
      mobile: id,
      poster: null,
      posterMobile: null,
      urls: null,
    };
  }
  return {
    desktop: asset.id || asset.mobileId,
    mobile: asset.mobileId || asset.id,
    poster: asset.poster || null,
    posterMobile: asset.posterMobile || asset.poster || null,
    urls: asset.urls || null,
  };
}

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
    alt: "Jason Duval, GTA VI protagonist, sitting on a motorcycle in Vice City holding a handgun.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_2: {
    src: "Jason_Duval_02_ttet2g",
    alt: "Jason Duval, main character from Grand Theft Auto 6, inside a car behind the wheel in Vice City.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_3: {
    src: "Jason_Duval_06_cw2nsy",
    alt: "Jason Duval and Cal Hampton, GTA VI characters, at a bar with beers in Vice City criminal scene.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_4: {
    src: "Jason_Duval_04_o8svr3",
    alt: "Jason Duval from Grand Theft Auto VI on Vice City street leaning against a tree looking at phone.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_5: {
    src: "Jason_Duval_05_wjqust",
    alt: "Jason Duval GTA 6 protagonist armed and aiming automatic weapon in action scene.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_6: {
    src: "Jason_Duval_03_ov4pov",
    alt: "Jason Duval and Cal Hampton from GTA VI on a boat relaxing in Vice City.",
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
    alt: "Lucia Caminos, GTA VI female protagonist, punching heavy bag in gym training scene.",
    size: "( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_2: {
    src: "Lucia_Caminos_02_qjfc8d",
    alt: "Lucia Caminos from Grand Theft Auto 6 relaxing by pool in Vice City with tropical drink.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_3: {
    src: "Lucia_Caminos_05_jrgiqp",
    alt: "Lucia Caminos GTA VI character in jail scene wearing orange jumpsuit with other inmates.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  Image_4: {
    src: "Lucia_Caminos_04_zi5oly",
    alt: "Lucia Caminos from GTA 6 holding handgun in action scene behind door in Vice City.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_5: {
    src: "Lucia_Caminos_06_uw8s0y",
    alt: "Lucia Caminos GTA VI protagonist in nightlife scene surrounded by dancing people and lights.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_6: {
    src: "Lucia_Caminos_03_ftk7mc",
    alt: "Lucia Caminos, Grand Theft Auto VI character, leaning on motorcycle in leather jacket.",
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
    alt: "Cal Hampton, GTA VI supporting character, standing in urban Vice City setting with graffiti art.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_2: {
    src: "Cal_Hampton_02_ovpofu",
    alt: "Cal Hampton from Grand Theft Auto 6 sitting on stairs in gritty Vice City urban environment.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_3: {
    src: "Cal_Hampton_03_tgmisg",
    alt: "Cal Hampton GTA VI character walking down Vice City street at night with neon lights.",
    size: " (max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw",
  },
  Image_4: {
    src: "Cal_Hampton_04_nfkpl2",
    alt: "Cal Hampton from GTA 6 leaning against brick wall with urban street art in Vice City.",
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
    alt: "Grand Theft Auto Vice City vibrant cityscape at sunset showcasing iconic skyline and waterfront.",
    size: "100vw",
  },
  Image_2: {
    src: "Vice_City_02_p4kb75",
    alt: "Vice City GTA VI downtown aerial view with neon lights and busy streets at night.",
    size: "100vw",
  },
  Image_3: {
    src: "Vice_City_03_vbluvl",
    alt: "Grand Theft Auto VI Vice City serene beach scene with palm trees and colorful sunset.",
    size: "100vw",
  },
  Image_4: {
    src: "Vice_City_04_lbxujb",
    alt: "GTA 6 Vice City street lively scene with vintage cars pedestrians and vibrant storefronts.",
    size: "100vw",
  },
  Image_5: {
    src: "Vice_City_05_wyibjy",
    alt: "Grand Theft Auto VI Vice City nighttime skyline reflected in calm bay waters.",
    size: "100vw",
  },
  Image_6: {
    src: "Vice_City_06_fmx7mb",
    alt: "GTA VI Vice City panoramic iconic landmarks against backdrop of setting sun.",
    size: "100vw",
  },
  Image_7: {
    src: "Vice_City_07_a8vfhb",
    alt: "Grand Theft Auto Vice City bustling market scene with colorful stalls vendors and shoppers.",
    size: "100vw",
  },
  Image_8: {
    src: "Vice_City_08_idq42h",
    alt: "Vice City GTA 6 scenic coastline with boats piers and vibrant sunset sky.",
    size: "100vw",
  },
  Image_9: {
    src: "Vice_City_09_uqekdh",
    alt: "Grand Theft Auto VI Vice City dynamic street scene with classic cars neon signs and nightlife.",
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
