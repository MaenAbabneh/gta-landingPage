"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import CalContent from "./calContent";
import CalHero from "./calHero";

gsap.registerPlugin(ScrollTrigger);

function Cal() {
  const BGColorRef = useRef(null);
  const calRef = useRef(null);

  useGSAP(
    () => {
      const bgEl = BGColorRef.current;
      const videoTrigger = document.querySelector(
        '[data-background="cal-video"]'
      );

      if (!videoTrigger && !bgEl) return;

      gsap.set(bgEl, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: calRef.current,
          start: "top bottom",
          end: "bottom+=1100 top",
          scrub: true,
          // markers: true,
        },
      });
      tl.to(
        bgEl,
        { opacity: 1, ease: "none", duration: 0.5 },
        0
      ).to(bgEl, { opacity: 0, ease: "none" }, ">");

    },
    { scope: calRef }
  );
  return (
    <section ref={calRef} id="cal" className="overflow-hidden">
      <div ref={BGColorRef} className="calBGColor -z-[5] fixed inset-0 " />
      <CalHero />
      <CalContent />
    </section>
  );
}

export default Cal;
