"use client";

import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";


export default function LenisProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.8,
        syncTouch: true,
        syncTouchLerp: 0.2,
        touchInertiaExponent: 0.7,
        duration: 0.3,
        easing: (t) => t, // linear
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        smoothWheel: true,
        normalizeScroll: true,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
