"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

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
        ScrollTrigger.kill();
      }
    };
  }, [lenis]);

  return lenis;
}
