"use client";

import { prebuiltassets } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";

export default function Precacher() {
  // ✅ تحميل الصور فقط (لا فيديوهات - ثقيلة جداً 58MB)
  const imageAssets = prebuiltassets.filter((asset) => asset.type === "image");
  // ✅ أضف صور poster الخاصة بالفيديوهات (خفيفة وسريعة)
  const videoPosters = prebuiltassets
    .filter((asset) => asset.type === "video" && asset.poster)
    .map((asset) => ({
      id: `${asset.id}_poster`,
      type: "image",
      url: asset.poster,
    }));

  const imagesToPrecache = [...imageAssets, ...videoPosters];

  useAssetPrecacher(imagesToPrecache, {
    maxConcurrent: 2, // زيادة التوازي للصور
    delayMs: 100, // تقليل التأخير
  });

  return null;
}
