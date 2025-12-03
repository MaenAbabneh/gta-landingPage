"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLenis } from "lenis/react";

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/hero";
import Jason from "@/components/sections/jason/jason";
import Lucia from "@/components/sections/lucia/lucia";
import Cal from "@/components/sections/cal/cal";
import ViceCity from "@/components/sections/vice-city/vice-city";
import Outro from "@/components/sections/outro";
import Footer from "@/components/sections/footer";

import { BouncingArrow } from "@/components/ui/svg";
import { useGSAPLenis } from "@/lib/gsap-lenis";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const pathname = usePathname();
  const arrowRef = useRef(null);
  const arrowWrapperRef = useRef(null);
  // const backgroundRef = useRef(null); // <-- 1. مرجع جديد للخلفية

  const lenis = useLenis();

  useGSAPLenis();

  useEffect(() => {
    if (window.history.state?.fromScroll) {
      return;
    }
    const sectionId = pathname.replace(/^\//, "");
    const targetElement = document.getElementById(sectionId);

    if (targetElement && lenis) {
      const timer = setTimeout(() => {
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: 0, autoKill: true },
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            window.history.replaceState({}, "", `/${sectionId}`);
            if (lenis) {
              lenis.emit();
            }
          },
        });
      }, 1000);
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
        start: "top top",
        end: "bottom center ",
        scrub: true,
        // markers: true,
      },
      ease: "none",
    });
  });

  return (
    <main>
      <div className="bg-hero-gradient fixed inset-0 -z-10 transition-colors" />
      <Navbar />
      <Hero />
      <section id="jason">
        <Jason />
      </section>

      <section id="lucia">
        <Lucia />
      </section>

      <section id="cal">
        <Cal />
      </section>

      <section id="vice-city">
        <ViceCity />
      </section>

      <section id="outro">
        <Outro />
      </section>

      <section id="footer" className="overflow-hidden">
        <Footer />
      </section>
      <div ref={arrowWrapperRef} className=" w-full">
        <BouncingArrow
          ref={arrowRef}
          className="fixed left-1/2 -translate-x-1/2 bottom-5 text-gta-pink scale-100 glow-arrow z-30 pointer-events-none"
        />
      </div>
    </main>
  );
}
