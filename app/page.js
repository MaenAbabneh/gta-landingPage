"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import Navbar from "@/components/navigation/Navbar";
import Cal from "@/components/sections/cal/cal";
import Hero from "@/components/sections/hero";
import JasonIntro from "@/components/sections/intro";
import Jason from "@/components/sections/jason/jason";
import Lucia from "@/components/sections/lucia/lucia";
import { BouncingArrow } from "@/components/svg";
import { useGSAPLenis } from "@/lib/gsap-lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pathname = usePathname();
  const arrowRef = useRef(null);
  const arrowWrapperRef = useRef(null);
  const backgroundRef = useRef(null); // <-- 1. مرجع جديد للخلفية

  const lenis = useLenis();

  // تفعيل التكامل بين GSAP و Lenis لجميع ScrollTriggers
  useGSAPLenis();

  useEffect(() => {
    // تحقق من أن التغيير ليس من scroll طبيعي
    if (window.history.state?.fromScroll) {
      return;
    }

    const sectionId = pathname.substring(1);
    if (sectionId && document.getElementById(sectionId) && lenis) {
      const timer = setTimeout(() => {
        lenis.scrollTo(`#${sectionId}`, { duration: 1.2 });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  useGSAP(() => {
    // const sections = gsap.utils.toArray("section[data-background]");

    // sections.forEach((section) => {
    //   const bgClass = section.dataset.background;

    //   ScrollTrigger.create({
    //     trigger: section,
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: true,
    //     // markers: true,
    //     onEnter: () => {
    //       gsap.to(backgroundRef.current, {
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "none",
    //         onComplete: () => {
    //           backgroundRef.current.className = `fixed inset-0 -z-10 pointer-events-none ${bgClass}`;
    //           gsap.to(backgroundRef.current, {
    //             opacity: 1,
    //             duration: 0.5,
    //             ease: "none",
    //           });
    //         },
    //       });
    //     },
    //     onEnterBack: () => {
    //       gsap.to(backgroundRef.current, {
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "none",
    //         onComplete: () => {
    //           backgroundRef.current.className = `fixed inset-0 -z-10 pointer-events-none ${bgClass}`;
    //           gsap.to(backgroundRef.current, {
    //             opacity: 1,
    //             duration: 0.5,
    //             ease: "none",
    //           });
    //         },
    //       });
    //     },
    //   });
    // });

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
      <div className="bg-hero-gradient fixed inset-0 -z-10 transition-colors" />
      <Navbar />

      <Hero />
      <JasonIntro />
      <Jason />
      <Lucia />
      <Cal />
      <div ref={arrowWrapperRef}>
        <BouncingArrow
          ref={arrowRef}
          className="fixed left-1/2 -translate-x-1/2 bottom-4 text-gta-pink scale-100 glow-arrow z-30 pointer-events-none"
        />
      </div>
    </main>
  );
}
