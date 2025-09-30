"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

export function useGSAPLenis() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      console.log("✅ Lenis connected successfully!");

      // تحديث ScrollTrigger عند scroll
      lenis.on("scroll", (e) => {
        ScrollTrigger.update();
        // اختياري: لوق تفصيلي للتشخيص
        // console.log("📜 Scroll event:", e.scroll, "Direction:", e.direction);
      });

      // إعادة حساب ScrollTrigger عند تغيير المحتوى
      ScrollTrigger.refresh();
      console.log("🔄 ScrollTrigger refreshed with Lenis");
    } else {
      console.warn("⚠️ Lenis not found - smooth scrolling disabled");
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        console.log("🧹 Lenis scroll listener cleaned up");
      }
    };
  }, [lenis]);

  return lenis;
}
