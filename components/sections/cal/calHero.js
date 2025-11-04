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
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(maskWrapperRef.current, {
        willChange: "clip-path, transform",
        force3D: true,
      });
      gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
        willChange: "transform",
        force3D: true,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 120%",
          end: "+=2000",
          scrub: 1,
          // markers: true,
        },
      });

      // استخدام متغير CSS للتحكم في clip-path
      tl.fromTo(
        maskWrapperRef.current,
        {
          "--avvi50": 4,
          ease: "none",
          duration: 1.2,
        },
        {
          "--avvi50": 0,
          ease: "none",
          duration: 1.2,
        },
        0
      );
      tl.fromTo(
        [backgroundImageRef.current],
        { y: -50, ease: "none" , duration: 1.2 },
        { y: 0, ease: "none" , duration: 1.2 },
        0
      ).fromTo(
        textRef.current,
        { y: 20, ease: "none" , duration: 1 },
        { y: 0, ease: "none" , duration: 1},
        "<"
      )
      tl.to(containerRef.current, { opacity: 0, ease: "none" , duration: 1 }, ">+=80%" );
    },
    { scope: containerRef }
  );
  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      <div
        ref={maskWrapperRef}
        className="h-[135vh] relative bg-gta-transparent caloverlay"
      >
        <Image
          ref={backgroundImageRef}
          src="/images/People/cal/Hero-BG.webp"
          alt="Cal Background"
          className="object-cover will-change-transform CalHeroBg"
          style={{
            maskImage: "linear-gradient(246deg,#000 30%,rgba(0,0,0,.35) 72%)",
          }}
          fill
          sizes="100vw"
          unoptimized
          priority
        />
      </div>
      <div className="absolute inset-0">
        <Image
          ref={bgKeyArtRef}
          src="/images/People/cal/Hero_FG.webp"
          alt="Cal Key Art"
          className="object-cover will-change-transform "
          fill
          sizes="100vw"
          unoptimized
          priority
        />
      </div>
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-start justify-center text-start ps-30 mb-10 lg:mb-20 lg:ps-50 z-20"
      >
        <h1 className="text-yellow font-long uppercase text-[5.5rem] leading-[0.9] self-start">
          Cal
          <br />
          Hampton
        </h1>
        <div className="max-w-80  mt-5 gap-5 flex flex-col">
          <h2 className="text-gta-blue w-90 md:text-[2.5rem] font-round font-bold text-3xl leading-11">
            What if everything on the internet was true?{" "}
          </h2>
          <p className="text-white md:text-[1.5rem] text-lg font-round font-black leading-tight">
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
