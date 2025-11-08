"use client";

import { useEffect, useState, useRef } from "react";
import { prebuiltassets } from "@/constants/assest";
import { buildVideoThumbnail } from "@/lib/cloudinary";

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
  const { eager = false, rootMargin = "200px" } = options;

  const [videoUrl, setVideoUrl] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // حدد دقة الposter تبعاً لحجم الشاشة وآخر إطار
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const posterWidth = w < 768 ? 720 : w < 1280 ? 1280 : 1920;
    const url = buildVideoThumbnail(publicId, {
      time: "end",
      width: posterWidth,
      quality: "auto:best",
    });
    setPosterUrl(url);

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

    return () => observer.disconnect();
  }, [publicId, eager]);

  const loadVideo = () => {
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

    setVideoUrl(url);
    setIsLoading(false);
  };

  return {
    videoUrl,
    posterUrl,
    containerRef,
    isLoading,
  };
}
