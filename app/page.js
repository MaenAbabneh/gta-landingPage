"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import Hero from "@/components/sections/hero";
import Jason from "@/components/sections/jason/jason";
import JasonIntro from "@/components/sections/intro";
import { BouncingArrow } from "@/components/svg";
import { useGSAPLenis } from "@/lib/gsap-lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pathname = usePathname();
  const arrowRef = useRef(null);
  const arrowWrapperRef = useRef(null);
  const lenis = useLenis();

  // تفعيل التكامل بين GSAP و Lenis لجميع ScrollTriggers
  useGSAPLenis();

  useEffect(() => {
    const sectionId = pathname.substring(1);
    if (sectionId && document.getElementById(sectionId) && lenis) {
      const timer = setTimeout(() => {
        lenis.scrollTo(`#${sectionId}`, { duration: 1.2 });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  useGSAP(() => {
    gsap.to(arrowRef.current, {
      y: 10,
      scale: 0.9,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(arrowWrapperRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#jason-intro",
        start: "top top",
        end: "bottom center ",
        scrub: true,
      },
      ease: "none",
    });
  });

  return (
    <main>
      <Hero />
      <JasonIntro />
      <Jason />
      <div ref={arrowWrapperRef}>
        <BouncingArrow
          ref={arrowRef}
          className="fixed left-1/2 -translate-x-1/2 bottom-4 text-gta-pink scale-100 glow-arrow z-50 pointer-events-none"
        />
       </div>
    </main>
  );
}
