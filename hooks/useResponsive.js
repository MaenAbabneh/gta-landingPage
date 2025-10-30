"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import { buildVideoUrl } from "@/lib/cloudinary";

export function useResponsiveVideo(publicId) {
  const [videoSource, setVideoSource] = useState(null);

  useGSAP(() => {
    if (!publicId) return;

    const desktopUrl = buildVideoUrl(publicId);
    const mobileUrl = buildVideoUrl(publicId); 


    const mm = gsap.matchMedia();
    mm
      .add("(min-width: 769px)", () => {
        setVideoSource(desktopUrl);
      })
      .add("(max-width: 768px)", () => {
        setVideoSource(mobileUrl);
      });

    // Cleanup function
    return () => {
      mm.revert();
    };
  }, [publicId]); 

  return videoSource;
}
