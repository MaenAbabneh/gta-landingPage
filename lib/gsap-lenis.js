"use client";

import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

// register the core ScrollTrigger + CSSPlugin (for `opacity`, `transform`, etc.)
gsap.registerPlugin(ScrollTrigger, CSSPlugin);

export function useGSAPLenis() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", (e) => {
        ScrollTrigger.update();
      });

      ScrollTrigger.refresh();
    } else {
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, [lenis]);

  return lenis;
}
