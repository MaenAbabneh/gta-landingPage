"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import { buildVideoUrl } from "@/lib/cloudinary";

// --- The Reusable Hook ---
export function useResponsiveVideo(publicId) {
  const [videoSource, setVideoSource] = useState(null);

  // This hook only runs once to determine the correct video source.
  useGSAP(() => {
    if (!publicId) return;

    // Build URLs using shared helper for consistency
    const desktopUrl = buildVideoUrl(publicId);
    const mobileUrl = buildVideoUrl(publicId); // Can customize for mobile later

    // 3. Use GSAP's MatchMedia to detect the device and set the source
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
  }, [publicId]); // Dependency array ensures this runs if the publicId changes

  return videoSource;
}
