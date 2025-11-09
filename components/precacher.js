"use client";

import { prebuiltassets } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";

export default function Precacher() {
  // ✅ تحميل صور poster الخاصة بالفيديوهات فقط (خفيفة وسريعة)
  // ❌ لا نحمل الصور العادية - سيتم تحميلها lazy مع rootMargin 1500px
  const videoPosters = prebuiltassets
    .filter((asset) => asset.type === "video" && asset.poster)
    .map((asset) => ({
      id: `${asset.id}_poster`,
      type: "image",
      url: asset.poster,
    }));

  useAssetPrecacher(videoPosters, {
    maxConcurrent: 2,
    delayMs: 100,
  });

  return null;
}
