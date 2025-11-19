"use client";

import { useState, useRef, useEffect } from "react";
import {
  getCachedAsset,
  cacheAsset,
  isCacheSupported,
} from "@/lib/cacheManager";

export function useLazyImage(imageUrl, placeholderUrl, options = {}) {
  const { rootMargin = "1000px" } = options;
  const [currentSrc, setCurrentSrc] = useState(placeholderUrl);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (!entry.isIntersecting) return;

          // Try cache only if supported, but always load the image from network as fallback
          let cached = null;
          if (isCacheSupported()) {
            try {
              cached = await getCachedAsset(imageUrl);
            } catch (error) {
              console.warn("Cache read failed, using network:", error.message);
              cached = null;
            }
          }

          if (cached) {
            try {
              const blob = await cached.blob();
              const objectUrl = URL.createObjectURL(blob);
              // Revoke previous object URL if any
              if (objectUrlRef.current) {
                try {
                  URL.revokeObjectURL(objectUrlRef.current);
                } catch {}
              }
              objectUrlRef.current = objectUrl;
              setCurrentSrc(objectUrl);
              setIsLoaded(true);
              observer.disconnect();
              return;
            } catch (error) {
              // Fall back to network load
              console.warn("Failed to use cached blob, loading network image:", error.message);
            }
          }

          // Network fallback - always load image even when Cache API not supported
          const img = new Image();
          let didSet = false;
          img.onload = () => {
            // Revoke previous object URL if any; we're switching to a network URL
            if (objectUrlRef.current) {
              try {
                URL.revokeObjectURL(objectUrlRef.current);
              } catch {}
              objectUrlRef.current = null;
            }
            setCurrentSrc(imageUrl);
            setIsLoaded(true);
            didSet = true;
            if (isCacheSupported()) {
              cacheAsset(imageUrl).catch(() => {
                // Silently ignore cache failures
              });
            }
            observer.disconnect();
          };
          img.onerror = () => {
            // Keep placeholder if loading failed
            didSet = true;
            observer.disconnect();
          };
          img.decoding = "async";
          img.loading = "lazy";
          img.src = imageUrl;
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
      // Clean up object URL if created
      if (objectUrlRef.current) {
        try {
          URL.revokeObjectURL(objectUrlRef.current);
        } catch {}
        objectUrlRef.current = null;
      }
    };
  }, [imageUrl, rootMargin]);

  return {
    src: currentSrc,
    containerRef,
    isLoaded,
  };
}
