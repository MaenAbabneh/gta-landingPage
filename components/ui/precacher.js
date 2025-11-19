"use client";

import { useEffect } from "react";
import { prebuiltassets } from "@/constants/assest";
import { useAssetPrecacher } from "@/hooks/useAssetPrecacher";
import { cleanOldCaches, getCacheStats } from "@/lib/cacheManager";

export default function Precacher({ onStart }) {
  // Clean old cache versions on mount
  useEffect(() => {
    cleanOldCaches().then(() => {
      // Log cache stats for debugging
      getCacheStats().then((stats) => {
        if (stats.supported) {
          // Format percentage with a small-number-friendly display
          const rawPct = stats.storage.percentage * 100;
          const pctDisplay =
            rawPct === 0
              ? "0%"
              : rawPct < 0.1
                ? `<0.1%`
                : rawPct < 1
                  ? `${rawPct.toFixed(2)}%`
                  : `${rawPct.toFixed(1)}%`;

          console.log("📦 Cache Storage:", {
            assets: stats.totalAssets,
            usage: `${(stats.storage.usage / (1024 * 1024)).toFixed(2)} MB`,
            quota: `${(stats.storage.quota / (1024 * 1024)).toFixed(2)} MB`,
            percentage: pctDisplay,
          });
        }
      });
    });
  }, []);

  // ✅ تحميل كل الفيديوهات في الخلفية عند التحميل الأولي (بدون التأثير على التحميل الأولي)
  const allVideos = prebuiltassets
    .filter((asset) => asset.type === "video" && asset.urls)
    .map((asset) => ({
      id: asset.id,
      type: "video",
      urls: asset.urls,
    }));

  // Also include poster images for proactive caching so that poster images are
  // available even when the video variant cached differs from the one requested
  // later. Posters are image resources and will be cached by the asset precacher
  // as images.
  const posterImages = prebuiltassets
    .filter((asset) => asset.type === "video" && asset.poster)
    .map((asset) => ({
      id: `${asset.id}-poster`,
      type: "image",
      url: asset.poster,
    }));

  const assetsToCache = [...allVideos, ...posterImages];

  useAssetPrecacher(assetsToCache, {
    maxConcurrent: 2,
    delayMs: 200,
    onStart,
  });

  // يمكن إبقاء تحميل صور poster كما هو إذا رغبت
  // يمكنك إضافة أيضاً مزيدًا من المنطق هنا (مثلاً: تحميل poster بدقة أعلى
  // أو تحميل poster variants منفصلة) لكن الآن نضمن أن الposter الافتراضي يتم
  // تضمينه في pre-cache عبر useAssetPrecacher.

  return null;
}
