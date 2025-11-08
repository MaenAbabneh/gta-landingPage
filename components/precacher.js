"use client";

import { prebuiltassets } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";

export default function Precacher() {
  // ✅ تحميل الصور فقط (لا فيديوهات - ثقيلة جداً 58MB)
  const imagesToPrecache = prebuiltassets.filter(
    (asset) => asset.type === "image"
  );

  useAssetPrecacher(imagesToPrecache, {
    maxConcurrent: 2, // زيادة التوازي للصور
    delayMs: 100, // تقليل التأخير
  });

  return null;
}
