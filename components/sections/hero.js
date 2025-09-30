"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { useMaskSettings } from "../../constants";
import { PlayIcon, PsIcon, WatchTrailer, XboxIcon } from "../svg";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const containerRef = useRef(null);
  const maskWrapperRef = useRef(null);
  const backgroundImageRef = useRef(null); // 1. إنشاء ref جديد للخلفية
  const buttonRef = useRef(null);
  const WatchRef = useRef(null);
  const bgKeyArtRef = useRef(null);
  const comingSoonRef = useRef(null);
  const textRef = useRef(null);
  const VIlogoRef = useRef(null);
  const consolesRef = useRef(null);
  const { initialMaskSize, maskPos, maskSize } = useMaskSettings();

  useGSAP(
    () => {
      gsap.set(
        [backgroundImageRef.current, buttonRef.current, bgKeyArtRef.current],
        { opacity: 1 }
      );
      gsap.set(consolesRef.current, { opacity: 0 });
      gsap.set(maskWrapperRef.current, {
        maskSize: initialMaskSize,
        maskPosition: "50% 50%",
      });
      gsap.set(comingSoonRef.current, { scale: 1.2 });
      // Continuous bounce animation for the arrow

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1400 ",
          scrub: 2.5,
          pin: true,
          pinSpacer: false,
          // markers: true,
        },
      });

      tl.to(
        [backgroundImageRef.current, bgKeyArtRef.current],
        {
          scale: 1,
          ease: "power1.inOut",
        },
        "<"
      )
        .to(
          [buttonRef.current, WatchRef.current, bgKeyArtRef.current],
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          backgroundImageRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          maskWrapperRef.current,
          {
            maskSize: maskSize,
            maskPosition: maskPos,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          comingSoonRef.current,
          { scale: 1, duration: 0.9, ease: "expo.inOut" },
          "<+0.3"
        )
        .fromTo(
          textRef.current,
          {
            backgroundImage: `radial-gradient(
          circle at 50% 150vh,
          rgba(255, 214, 135, 0) 0vh,
          rgba(157, 47, 106, 0.5) 50vh,
          rgba(157, 47, 106, 0.8) 90vh,
          rgba(32, 31, 66, 0) 100vh)`,
            duration: 1.5,
          },
          {
            backgroundImage: `radial-gradient(
          circle at 50% -30vh, 
          rgb(255, 213, 133) 0px,
          rgb(247, 77, 82) 50vh,
          rgb(145, 42, 105) 90vh,
          rgba(32, 31, 66, 0) 150vh)`,
            duration: 1.5,
          },
          "<+0.3"
        )
        .fromTo(
          [VIlogoRef.current],
          {
            opacity: 0,
            maskImage: `radial-gradient(circle at 40% 80vh, rgb(0, 0, 0) 20vh, rgba(0, 0, 0, 0) 50vh)`,
            duration: 1,
            ease: "power1.in",
          },
          {
            opacity: 1,
            maskImage: `radial-gradient(circle at 50% 10vh, rgb(0, 0, 0) 20vh, rgba(0, 0, 0, 0) 50vh)`,
            duration: 1,
            ease: "power1.out",
          },
          "<+0.1" // i want start a bit later than the text
        )
        .to(
          consolesRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
          },
          "<+0.1"
        );
      tl.fromTo(
        comingSoonRef.current,
        {
          maskImage: `radial-gradient(circle at 50% 18vh, rgb(0, 0, 0) 50vh, rgba(0, 0, 0, 0) 80vh)`,
        },
        {
          maskImage: `radial-gradient(circle at 50% -60vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 60vh)`,
          duration: 1.2,
        },
        ">-0.2" // يبدأ بعد آخر خطوة بقليل (عدّل حسب الحاجة)
      );
      tl.to(maskWrapperRef.current, { opacity: 0 }, "<+0.2");
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden HeroSection "
    >
      <div
        ref={maskWrapperRef}
        className="mask-wrapper pb-71  md:pb-92 absolute inset-0 z-1 "
      >
        <Image
          ref={backgroundImageRef}
          src="/images/hero-bg.webp"
          alt="Hero Background"
          className="object-cover h-full md:scale-125"
          fill
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          priority
        />
        <Image
          ref={bgKeyArtRef}
          src="/images/heroKeyArt.webp"
          alt="Hero Key Art"
          className="object-cover md:scale-125"
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

      <div
        ref={comingSoonRef}
        className="absolute inset-0 flex flex-col items-center justify-between pt-31 pb-20"
      >
        <div ref={VIlogoRef} className=" w-40 h-40 md:w-52 md:h-52 relative ">
          <Image
            src="/images/logo.webp"
            alt="Grand Theft Auto VI Logo"
            fill
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>

        {/* نص "COMING MAY 26 2026" */}
        <h3
          ref={textRef}
          className=" text-center text-[4rem] md:text-[6.2rem] font-black mb-11 leading-15 md:leading-22 gradient-text "
        >
          COMING
          <br />
          MAY 26
          <br />
          2026
        </h3>
        {/* أيقونات المنصات */}
        <div
          ref={consolesRef}
          className="flex items-center justify-between gap-4 text-gta-white mb-4"
        >
          {/* أيقونات المنصات */}
          <PsIcon className="" />
          <XboxIcon className="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
