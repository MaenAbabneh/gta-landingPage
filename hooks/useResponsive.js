"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import { getAssetById } from "@/constants/assest";
import {
  buildResponsiveVideoUrls,
  buildVideoThumbnail,
} from "@/lib/cloudinary";

// دالة للحصول على حجم الشاشة الحالي (client-side فقط)
/**
 * getScreenSize()
 * ----------------
 * Helper to get a current screen breakpoint label (mobile/tablet/desktop).
 * NOTE: This helper is provided for convenience but is not used anywhere in
 * the current codebase. Consider using `getAssetIds()` + `useLazyVideo()` or
 * `gsap.matchMedia()` for responsive behavior in components.
 */
export function getScreenSize() {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1280) return "tablet";
  return "desktop";
}

/**
 * useResponsiveVideo
 * يختار مصدر الفيديو و poster المناسبين بحسب حجم الشاشة
 * يقبل publicIdOrIds كسلسلة (id) أو كائن { mobile, tablet, desktop }
 */
/**
 * useResponsiveVideo(publicIdOrIds)
 * --------------------------------
 * DEPRECATED: This hook is currently not used by any components in the
 * repository. It provides breakpoint-based selection of video sources and
 * posters via GSAP's matchMedia, but `useLazyVideo` already supports
 * responsive object inputs ({ desktop, tablet, mobile }) together with
 * lazy-loading and caching and is the recommended replacement.
 *
 * If you aim to keep code minimal and unify behavior, prefer using
 * `useLazyVideo({ desktop, mobile })` (which supports mobile-specific
 * publicIds and posterMobile) instead of `useResponsiveVideo`.
 *
 * This comment will remain as a deprecation note while the hook is
 * unchanged for now. If you'd like, I can remove the hook entirely.
 */
export function useResponsiveVideo(publicIdOrIds) {
  const [videoSource, setVideoSource] = useState(null);
  const [posterSource, setPosterSource] = useState(null);

  useGSAP(
    () => {
      const isObject =
        typeof publicIdOrIds === "object" && publicIdOrIds !== null;
      const asset = !isObject ? getAssetById(publicIdOrIds) : null;

      if (!isObject && (!asset || !asset.urls)) return;

      // تعيين poster
      const width = typeof window !== "undefined" ? window.innerWidth : 1920;
      if (!isObject) {
        if (width < 768 && asset.posterMobile) {
          setPosterSource(asset.posterMobile);
        } else if (asset.poster) {
          setPosterSource(asset.poster);
        }
      } else {
        const idForPoster =
          width < 768
            ? publicIdOrIds.mobile || publicIdOrIds.desktop
            : publicIdOrIds.desktop ||
              publicIdOrIds.tablet ||
              publicIdOrIds.mobile;
        const posterWidth = width < 768 ? 720 : width < 1280 ? 1280 : 1920;
        const url = buildVideoThumbnail(idForPoster, {
          time: "end",
          width: posterWidth,
          quality: "auto:best",
          format: "auto",
        });
        setPosterSource(url);
      }

      const urls = isObject
        ? buildResponsiveVideoUrls(publicIdOrIds)
        : asset.urls;

      // helper to set video by width
      const setByWidth = () => {
        const w = typeof window !== "undefined" ? window.innerWidth : 1920;
        if (w < 768) setVideoSource(urls.mobile);
        else if (w < 1280) setVideoSource(urls.tablet);
        else setVideoSource(urls.desktop);
      };
      setByWidth();

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1280px)", () => setVideoSource(urls.desktop));
      mm.add("(min-width: 768px) and (max-width: 1279px)", () =>
        setVideoSource(urls.tablet)
      );
      mm.add("(max-width: 767px)", () => setVideoSource(urls.mobile));

      return () => {
        mm.revert();
      };
    },
    {
      dependencies: [publicIdOrIds],
    }
  );

  return { videoSrc: videoSource, posterUrl: posterSource };
}
