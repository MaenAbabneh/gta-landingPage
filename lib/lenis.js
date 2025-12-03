"use client";

import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { initScrollManager } from "@/lib/scroll-manager";

export default function LenisProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    // init scroll manager with instance (ensure global scroll-manager can use lenis)
    const interval = setInterval(() => {
      if (lenisRef.current?.lenis) {
        try {
          initScrollManager(lenisRef.current.lenis);
        } catch (e) {
          if (process.env.NODE_ENV === "development")
            console.debug("[LenisProvider] initScrollManager failed", e);
        }
        if (process.env.NODE_ENV === "development") {
          console.debug("[LenisProvider] lenisRef ready", {
            lenis: lenisRef.current.lenis,
          });
        }
        clearInterval(interval);
      }
    }, 50);

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        syncTouch: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        wheelMultiplier: 1.3,
        touchMultiplier: 2,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
