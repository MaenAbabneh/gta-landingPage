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
      gsap.set(BGColorRef.current, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: calRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });
      tl.to(
        BGColorRef.current,
        { opacity: 1, ease: "none", duration: 0.5 },
        0
      ).to(BGColorRef.current, { opacity: 0, ease: "none" }, ">90%");
    },
    { scope: calRef }
  );
  return (
    <section ref={calRef} id="cal">
      <div ref={BGColorRef} className="calBGColor -z-[5] fixed inset-0 " />
      <CalHero />
      <CalContent />
    </section>
  );
}

export default Cal;
