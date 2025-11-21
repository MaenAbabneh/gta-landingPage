"use client";

import { useEffect, useState, useRef } from "react";
import { getAssetById } from "@/constants/assest";
import {
  buildVideoThumbnail,
  buildResponsiveVideoUrls,
} from "@/lib/cloudinary";
import {
  getCachedAsset,
  cacheAsset,
  isCacheSupported,
} from "@/lib/cacheManager";

/**
 * Hook للتحميل الذكي للفيديوهات
 * يُحمّل الفيديو فقط عند دخوله viewport أو قربه
 *
 * @param {string} publicId - معرّف الفيديو في Cloudinary
 * @param {Object} options - خيارات التحميل
 * @param {boolean} options.eager - تحميل فوري (للفيديوهات above-fold)
 * @param {string} options.rootMargin - مسافة التحميل المسبق (default: "1000px")
 * @returns {Object} { videoUrl, posterUrl, posterMobile , containerRef, isLoading }
 */
export function useLazyVideo(publicIdOrIds, options = {}) {
  const { eager = false, rootMargin = "1000px" } = options;

  const [videoUrl, setVideoUrl] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [posterMobile, setPosterMobile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const currentObjectUrlRef = useRef(null);

  useEffect(() => {
    // publicIdOrIds can be a string (legacy) or an object: { desktop, tablet, mobile }
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    const isObject =
      typeof publicIdOrIds === "object" && publicIdOrIds !== null;
    const asset = !isObject ? getAssetById(publicIdOrIds) : null;
    let posterCandidate = null;
    if (asset) {
      if (width < 768 && asset.posterMobile) {
        posterCandidate = asset.posterMobile;
      } else if (asset.poster) {
        posterCandidate = asset.poster;
      }
      // also keep the mobile poster handy for callers that want to use <picture>
      if (asset.posterMobile) setPosterMobile(asset.posterMobile);
    } else {
      // fallback to dynamically generated thumbnail if we don't have an asset
      const posterWidth = width < 768 ? 720 : width < 1280 ? 1280 : 1920;
      const idForPoster = isObject
        ? publicIdOrIds.mobile || publicIdOrIds.desktop
        : publicIdOrIds;
      posterCandidate = buildVideoThumbnail(idForPoster, {
        time: "end",
        width: posterWidth,
        quality: "auto:best",
        format: "auto",
      });
    }
    if (posterCandidate) {
      setPosterUrl(posterCandidate);
      // background cache of poster (optional)
      if (isCacheSupported()) {
        cacheAsset(posterCandidate).catch(() => {});
      }
    }
    // If we don't have a posterMobile already and we're in a mobile context
    // and used a generated poster, we can set posterMobile to the same candidate.
    if (!posterMobile && width < 768) {
      setPosterMobile(posterCandidate);
    }

    // إذا eager، حمّل فوراً
    if (eager) {
      loadVideo();
      return;
    }

    // وإلا استخدم IntersectionObserver
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoUrl) {
          loadVideo();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (currentObjectUrlRef.current) {
        try {
          URL.revokeObjectURL(currentObjectUrlRef.current);
        } catch {}
      }
    };
  }, [publicIdOrIds, eager]);

  const loadVideo = async () => {
    setIsLoading(true);

    // ابحث عن الفيديو في prebuiltassets (إذا مرّرت string publicId)
    // أو إذا مررت object publicIds فابنِ urls مباشرة
    const isObjectAgain =
      typeof publicIdOrIds === "object" && publicIdOrIds !== null;
    let assetUrls = null;
    if (isObjectAgain) {
      assetUrls = buildResponsiveVideoUrls(publicIdOrIds);
    } else {
      const assetFound = getAssetById(publicIdOrIds);
      if (!assetFound || !assetFound.urls) {
        setIsLoading(false);
        return;
      }
      assetUrls = assetFound.urls;
    }
    if (!assetUrls) {
      setIsLoading(false);
      return;
    }

    // اختر URL المناسب بناءً على حجم الشاشة
    const width = window.innerWidth;
    let url;
    if (width < 768) {
      url = assetUrls.mobile;
    } else if (width < 1280) {
      url = assetUrls.tablet;
    } else {
      url = assetUrls.desktop;
    }

    // Check Cache Storage first
    if (isCacheSupported()) {
      try {
        const cached = await getCachedAsset(url);
        if (cached) {
          // Create object URL from cached response
          const blob = await cached.blob();
          // Revoke previous object URL if any
          if (currentObjectUrlRef.current) {
            try {
              URL.revokeObjectURL(currentObjectUrlRef.current);
            } catch {}
          }
          const objectUrl = URL.createObjectURL(blob);
          currentObjectUrlRef.current = objectUrl;
          setVideoUrl(objectUrl);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // Cache read failed, continue to network
        console.warn("Cache read failed, using network:", error.message);
      }
    }

    // Not cached: use regular URL and cache in background
    setVideoUrl(url);
    setIsLoading(false);

    // Cache video in background (fire-and-forget, silently fail)
    if (isCacheSupported()) {
      cacheAsset(url).catch(() => {
        // Silently ignore cache failures
      });
    }
  };

  return {
    videoUrl,
    posterUrl,
    posterMobile,
    containerRef,
    isLoading,
  };
}
