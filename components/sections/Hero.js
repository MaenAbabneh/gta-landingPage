"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { BouncingArrow, PlayIcon, WatchTrailer } from "../svg";
import ComingSoon from "./comingsoon";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const containerRef = useRef(null);
  const maskWrapperRef = useRef(null);
  const backgroundImageRef = useRef(null); // 1. إنشاء ref جديد للخلفية
  const arrowRef = useRef(null);
  const buttonRef = useRef(null);
  const WatchRef = useRef(null);
  const bgKeyArtRef = useRef(null);
  const comingSoonRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(backgroundImageRef.current, { opacity: 1 }); // تعيين الحالة الابتدائية للخلفية
      gsap.set(maskWrapperRef.current, {
        maskSize: "3500%",
        maskPosition: "50% 50%",
      });
      gsap.set(buttonRef.current, { opacity: 1 });
      gsap.set(WatchRef.current, { opacity: 1 });
      gsap.set(bgKeyArtRef.current, { opacity: 1 });
      gsap.set(comingSoonRef.current, { scale: 1.2 });

      gsap.to(arrowRef.current, {
        y: 10,
        scale: 0.9,
        opacity: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        maskWrapperRef.current,
        {
          maskSize: "13.5%",
          ease: "expo.inOut",
        },
        "0.1"
      )
        .add("startfade", 0.1)
        .add("startscale", 0.2)
        .to(
          backgroundImageRef.current,
          {
            scale: 1,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          buttonRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          "0"
        )
        .to(
          WatchRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          "0"
        )
        .to(
          bgKeyArtRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          "0"
        )
        .to(
          backgroundImageRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          "startfade"
        )
        .to(
          comingSoonRef.current,
          { scale: 1, ease: "expo.inOut" },
          "startscale"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-dvw h-dvh overflow-hidden bg-gta-gradient-primary "
    >
      <div
        ref={maskWrapperRef}
        className="mask-wrapper pb-92 absolute inset-0 z-1"
      >
        <Image
          ref={backgroundImageRef}
          src="/images/hero-bg.webp"
          alt="Hero Background"
          className="object-cover md:scale-125"
          fill
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          priority
        />
          <Image
            ref={bgKeyArtRef}
            src="/images/heroKeyArt.webp"
            alt="Hero Key Art"
            className="object-cover scale-125"
            fill
            unoptimized
            priority
          />

        <button
          ref={buttonRef}
          alt="Play Button"
          className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-10 flex items-center justify-center z-10  pointer-cursor "
        >
          <PlayIcon className="w-28 h-28 text-gta-white backdrop-blur-lg rounded-full pointer-cursor" />
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-12 pointer-events-none">
          <div
            ref={WatchRef}
            className="relative w-57 h-12 flex items-center justify-center "
          >
            <WatchTrailer className="absolute inset-0 -translate-y-10 translate-x-13 text-white glow-logo " />
            <span className="absolute text-[0.9rem] font-round font-black tracking-[0.35em] -translate-y-1.5 uppercase text-center text-white whitespace-nowrap glow-text">
              Watch Trailer 2
            </span>
          </div>
        </div>
      </div>

      <BouncingArrow
        ref={arrowRef}
        className={
          "absolute left-1/2 -translate-x-3 bottom-3 text-gta-pink scale-100 glow-arrow z-30"
        }
      />

      <ComingSoon comingSoonRef={comingSoonRef} />
    </section>
  );
}

export default Hero;
