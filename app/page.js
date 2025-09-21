"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import Hero from "@/components/sections/hero.js";
// import Jason from "@/components/sections/jason/index";
import JasonIntro from "@/components/sections/jason-intro.js";

import { BouncingArrow } from "../components/svg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const pathname = usePathname();
  const arrowRef = useRef(null);
  const arrowWrapperRef = useRef(null);

  useGSAP(() => {
    const sectionId = pathname.substring(1);
    if (sectionId && document.getElementById(sectionId)) {
      const timer = setTimeout(() => {
        gsap.to(window, {
          duration: 0,
          scrollTo: `#${sectionId}`,
          ease: "power2.inOut",
        });
      }, 500);

      return () => clearTimeout(timer);
    }

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
  }, [pathname]);

  return (
    <main>
      <Hero />
      <JasonIntro />
      {/* <Jason /> */}

      <div ref={arrowWrapperRef}>
        <BouncingArrow
          ref={arrowRef}
          className="fixed left-1/2 -translate-x-1/2 bottom-4 text-gta-pink scale-100 glow-arrow z-50 pointer-events-none"
        />
      </div>
    </main>
  );
}
