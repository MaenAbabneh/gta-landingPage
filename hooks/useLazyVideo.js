"use client";

import { useEffect, useState, useRef } from "react";
import { prebuiltassets } from "@/constants/assest";
import { buildVideoThumbnail } from "@/lib/cloudinary";
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
 * @param {string} options.rootMargin - مسافة التحميل المسبق (default: "200px")
 * @returns {Object} { videoUrl, posterUrl, containerRef, isLoading }
 */
export function useLazyVideo(publicId, options = {}) {
  const { eager = false, rootMargin = "1000px" } = options;

  const [videoUrl, setVideoUrl] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const currentObjectUrlRef = useRef(null);

  useEffect(() => {
    // حدد دقة الposter تبعاً لحجم الشاشة وآخر إطار
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const posterWidth = w < 768 ? 720 : w < 1280 ? 1280 : 1920;
    const url = buildVideoThumbnail(publicId, {
      time: "end", // آخر إطار (أفضل من الأول)
      width: posterWidth,
      quality: "auto:best", // Cloudinary يختار الأفضل تلقائياً
      format: "auto", // WebP/AVIF تلقائياً
    });
    setPosterUrl(url);
    // Cache the poster in the background when we have the poster URL.
    // This is helpful so the poster is present even if the video variant is
    // still being downloaded or if the video itself is not cached yet.
    if (url && isCacheSupported()) {
      cacheAsset(url).catch(() => {
        // Silently fail, caching is optional
      });
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
  }, [publicId, eager]);

  const loadVideo = async () => {
    setIsLoading(true);

    // ابحث عن الفيديو في prebuiltassets
    const asset = prebuiltassets.find((a) => a.id === publicId);
    if (!asset || !asset.urls) {
      setIsLoading(false);
      return;
    }

    // اختر URL المناسب بناءً على حجم الشاشة
    const width = window.innerWidth;
    let url;
    if (width < 768) {
      url = asset.urls.mobile;
    } else if (width < 1280) {
      url = asset.urls.tablet;
    } else {
      url = asset.urls.desktop;
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
    containerRef,
    isLoading,
  };
}
