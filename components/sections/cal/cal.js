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

      if (!bgEl) return;

      gsap.set(bgEl, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: calRef.current,
          start: "top bottom",
          end: "bottom+=80% top",
          scrub: true,
          // markers: true,
        },
      });
      tl.to(bgEl, { opacity: 1, duration: 0.2 }, 0).to(
        bgEl,
        { opacity: 0 },
        ">"
      );
    },
    { scope: calRef }
  );

  return (
    <div
      ref={calRef}
      className="relative flex flex-col w-full h-full overflow-hidden"
    >
      <div ref={BGColorRef} className="calBGColor -z-[5] fixed inset-0 " />
      <CalHero />
      <CalContent />
    </div>
  );
}

export default Cal;
