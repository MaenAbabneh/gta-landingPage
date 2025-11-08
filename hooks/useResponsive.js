"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { prebuiltassets } from "@/constants/assest";

// دالة للحصول على حجم الشاشة الحالي (client-side فقط)
export function getScreenSize() {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1280) return "tablet";
  return "desktop";
}

export function useResponsiveVideo(publicId) {
  const [videoSource, setVideoSource] = useState(null);

  useGSAP(() => {
    if (!publicId) return;

    const asset = prebuiltassets.find((a) => a.id === publicId);
    if (!asset || !asset.urls) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1280px)", () => {
      setVideoSource(asset.urls.desktop);
    })
      .add("(min-width: 768px) and (max-width: 1279px)", () => {
        setVideoSource(asset.urls.tablet);
      })
      .add("(max-width: 767px)", () => {
        setVideoSource(asset.urls.mobile);
      });

    // Cleanup function
    return () => {
      mm.revert();
    };
  }, [publicId]);

  return videoSource;
}
