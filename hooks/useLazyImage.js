"use client";

import { useEffect,useRef, useState } from "react";

import {
  cacheAsset,
  getCachedAsset,
  isCacheSupported,
} from "@/lib/cacheManager";

export function useLazyImage(imageUrl, placeholderUrl, options = {}) {
  const { rootMargin = "1500px" } = options;
  const [currentSrc, setCurrentSrc] = useState(placeholderUrl);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    let currentObjectUrl = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            // Check Cache Storage first
            if (isCacheSupported()) {
              try {
                const cached = await getCachedAsset(imageUrl);
                if (cached) {
                  const blob = await cached.blob();
                  // Revoke any previously-created object URL for this hook
                  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
                  const objectUrl = URL.createObjectURL(blob);
                  currentObjectUrl = objectUrl;
                  setCurrentSrc(objectUrl);
                  setIsLoaded(true);
                  observer.disconnect();
                  return;
                }
              } catch (error) {
                // Cache read failed, continue to normal load
                console.warn(
                  "Cache read failed, using network:",
                  error.message
                );
              }
            }

            // Not cached: load normally and cache in background
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              setCurrentSrc(imageUrl);
              setIsLoaded(true);

              // Cache in background (silently fail if error)
              if (isCacheSupported()) {
                cacheAsset(imageUrl).catch(() => {
                  // Silently ignore cache failures
                });
              }
            };
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      // Clean up any created object URL to avoid memory leaks
      if (currentObjectUrl) {
        try {
          URL.revokeObjectURL(currentObjectUrl);
        } catch {}
      }
    };
  }, [imageUrl, rootMargin]);

  return {
    src: currentSrc,
    containerRef,
    isLoaded,
  };
}
