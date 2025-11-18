"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { HeroImage } from "@/constants/assest";
import { buildVideoThumbnail } from "@/lib/cloudinary";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);
  const { requestLock, releaseLock } = useScrollLockContext();

  useEffect(() => {
    let windowLoaded = false;
    let criticalAssetsLoaded = false;

    // Request lock via context at mount
    if (process.env.NODE_ENV === "development")
      console.debug("[Loading] mount: requesting lock");
    if (typeof window !== "undefined") {
      // fallback: add a class to html to force overflow hidden in case of timing issues
      document.documentElement.classList.add("loading-active");
    }

    // request lock using ref-count API
    requestLock();

    // مراقبة window.onload
    const handleLoad = () => {
      windowLoaded = true;
      checkAssetsAndStartTimer();
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    // تحميل الصور الحرجة من Cloudinary
    const criticalImages = [
      HeroImage.HeroBG.url,
      HeroImage.HeroKeyArt.url,
      // video thumbnails - use buildVideoThumbnail to generate compatible URLs
      buildVideoThumbnail("Jason_Duval_2_so4cun", { time: "end", width: 1920, quality: "auto:best" }),
      buildVideoThumbnail("Lucia_Caminos_1_rlbk0h", { time: "end", width: 1920, quality: "auto:best" }),
      buildVideoThumbnail("Lucai_Caminos_2_rqqw1q", { time: "end", width: 1920, quality: "auto:best" }),
    ].filter(Boolean);

    let loadedCount = 0;
    const totalCritical = criticalImages.length;

    criticalImages.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalCritical) {
          criticalAssetsLoaded = true;
          checkAssetsAndStartTimer();
        }
      };
      img.src = src;
    });

    // بعد تحميل كل شيء، انتظر 3 ثوانٍ إضافية ثم ابدأ cross fade
    function checkAssetsAndStartTimer() {
      if (windowLoaded && criticalAssetsLoaded && loaderRef.current) {
        // انتظر 3 ثوانٍ كاملة قبل بدء الـ cross fade
        setTimeout(() => {
          // Cross fade: loading يختفي والمحتوى يظهر في نفس الوقت
          const mainContent = document.querySelector(".main-content");

          // Timeline للتأثير المتزامن
          const tl = gsap.timeline({
            onComplete: () => {
              if (process.env.NODE_ENV === "development")
                console.debug("[Loading] animation complete: releasing lock");
              setIsVisible(false);
              // Unlock scroll after loading animation finishes via release
              releaseLock();
              if (typeof window !== "undefined") {
                document.documentElement.classList.remove("loading-active");
              }
            },
          });

          tl.to(
            loaderRef.current,
            {
              opacity: 0,
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          ).to(
            mainContent,
            {
              opacity: 1,
              duration: 1.5,
              ease: "power2.inOut",
            },
            0 // يبدأ في نفس الوقت (cross fade)
          );
        }, 3000);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
        if (process.env.NODE_ENV === "development")
          console.debug("[Loading] unmount: releasing lock");
        // Unlock if the component unmounts unexpectedly
        releaseLock();
        document.documentElement.classList.remove("loading-active");
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="flex items-center justify-center w-screen h-screen bg-gta-gradient-primary fixed inset-0 z-[9999] loading-screen"
      style={{ backgroundColor: "#111117", opacity: 1 }}
    >
      <div className="loading-animation w-25 h-25"></div>
    </div>
  );
};

export default Loading;
