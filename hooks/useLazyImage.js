"use client";

import { useState, useRef, useEffect } from "react";

export function useLazyImage(imageUrl, placeholderUrl, options = {}) {
  const { rootMargin = "1500px" } = options;
  const [currentSrc, setCurrentSrc] = useState(placeholderUrl);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // بدء تحميل الصورة الكاملة
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              setCurrentSrc(imageUrl);
              setIsLoaded(true);
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
    };
  }, [imageUrl, rootMargin]);

  return {
    src: currentSrc,
    containerRef,
    isLoaded,
  };
}
