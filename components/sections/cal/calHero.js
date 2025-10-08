"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function CalHero() {
  const containerRef = useRef(null);
  const maskWrapperRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const bgKeyArtRef = useRef(null);

  useGSAP(
    () => {
      // حضّر الطبقات لتجميع GPU وتقليل إعادة الطلاء
      gsap.set(maskWrapperRef.current, {
        willChange: "clip-path, transform",
        force3D: true,
      });
      gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
        willChange: "transform",
        force3D: true,
      });

      gsap.set(backgroundImageRef.current, { y: 0 });
      gsap.set(bgKeyArtRef.current, { y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "+=1200", // نطاق أطول = حركة أنعم
          scrub: 1, // سكرَب ناعم
          markers: true,
        },
      });

      // استخدام متغير CSS للتحكم في clip-path
      tl.fromTo(
        maskWrapperRef.current,
        {
          "--avvi50": 15,
        },
        {
          "--avvi50": 0,
          ease: "none",
        },
        0
      );
    },
    { scope: containerRef }
  );
  return (
    <section ref={containerRef} className="relative w-full h-dvh">
      <div
        ref={maskWrapperRef}
        className="absolute inset-0"
        style={{
          willChange: "clip-path, transform",
          contain: "paint",
          transform: "translateZ(0)",
          clipPath: "polygon(0 calc(var(--avvi50) * 1vw), 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <Image
          ref={backgroundImageRef}
          src="/images/People/cal/Hero-BG.webp"
          alt="Cal Background"
          className="object-cover will-change-transform"
          fill
          sizes="100vw"
          unoptimized
          priority
        />
        <Image
          ref={bgKeyArtRef}
          src="/images/People/cal/Hero_FG.webp"
          alt="Cal Key Art"
          className="object-cover will-change-transform"
          fill
          sizes="100vw"
          unoptimized
          priority
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-center text-start px-20">
        <h1 className="text-yellow font-long uppercase text-[5.5rem] leading-[1] self-start">
          Cal
          <br />
          Hampton
        </h1>
        <div className="max-w-70  mt-5 gap-5 flex flex-col">
          <h2>What if everything on the internet was true? </h2>
          <p>
            Jason’s friend and a fellow associate of Brian’s, Cal feels safest
            hanging at home, snooping on Coast Guard comms with a few beers and
            some private browser tabs open.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CalHero;
