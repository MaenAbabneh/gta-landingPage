"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    let windowLoaded = false;
    let criticalAssetsLoaded = false;

    // إخفاء scrollbar في البداية
    if (typeof window !== "undefined") {
      document.documentElement.style.overflow = "hidden";
    }

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
      "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/hero-bg_dtrjtf",
      "https://res.cloudinary.com/dlgi2ockk/image/upload/f_auto/q_auto/heroKeyArt_a7kave",
      // thumbnails الفيديوهات الحرجة
      "https://res.cloudinary.com/dlgi2ockk/video/upload/so_end/w_1920/q_auto:best/f_auto/Jason_Duval_2_so4cun.jpg",
      "https://res.cloudinary.com/dlgi2ockk/video/upload/so_end/w_1920/q_auto:best/f_auto/Lucia_Caminos_1_rlbk0h.jpg",
      "https://res.cloudinary.com/dlgi2ockk/video/upload/so_end/w_1920/q_auto:best/f_auto/Lucai_Caminos_2_rqqw1q.jpg",
    ];

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
              setIsVisible(false);
              // إظهار scrollbar بعد انتهاء الأنيميشن
              document.documentElement.style.overflow = "auto";
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
        // تأكد من إظهار scrollbar عند unmount
        document.documentElement.style.overflow = "auto";
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
