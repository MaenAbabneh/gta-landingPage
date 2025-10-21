"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { PlayIcon, PsIcon, WatchTrailer, XboxIcon } from "../svg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Hero() {
  const containerRef = useRef(null);
  const maskWrapperRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const buttonRef = useRef(null);
  const WatchRef = useRef(null);
  const bgKeyArtRef = useRef(null);
  const comingSoonRef = useRef(null);
  const textRef = useRef(null);
  const VIlogoRef = useRef(null);
  const consolesRef = useRef(null);
  const viLogoOverlayRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(
        [backgroundImageRef.current, buttonRef.current, bgKeyArtRef.current],
        { opacity: 1 }
      );
      gsap.set([consolesRef.current], { opacity: 0 });
      gsap.set([maskWrapperRef.current, viLogoOverlayRef.current], {
        BackgroundSize: "clamp(5340.91vh, 3573.84%, 0.0001vh)",
        backgroundPosition: "50% 47%",
        webkitMaskSize: "clamp(5340.91vh, 3573.84%, 0.0001vh)",
        maskSize: "clamp(5340.91vh, 3573.84%, 0.0001vh)",
        webkitMaskPosition: "50% 47%",
        maskPosition: "50% 47%",
      });
      gsap.set(comingSoonRef.current, { scale: 1.2 });
      gsap.set(viLogoOverlayRef.current, { opacity: 0 });

      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1260px)",
          isTaplate: "(min-width: 768px) and (max-width: 1259px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isDesktop } = context.conditions;
          if (isDesktop) {
            gsap.set(
              [maskWrapperRef.current, viLogoOverlayRef.current],
              {
                backgroundPosition: "50% 50%",
                webkitMaskPosition: "50% 50%",
                maskPosition: "50% 50%",
              }
            );
          }
        }
      );
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
          ease: "none",
          // pinSpacer: false,
          markers: true,
        },
      });

      tl.to(
        [maskWrapperRef.current, viLogoOverlayRef.current],
        {
          maskSize: "clamp(20vh, 25vmin, 30vh)",
          webkitMaskSize: "clamp(20vh, 25vmin, 30vh)",
          maskPosition: "50% 50%",
          webkitMaskPosition: "50% 50%",
          backgroundSize: "clamp(20vh, 25vmin, 30vh)",
          backgroundPosition: "50% 50%",
          duration: 0.75,
        },
        0
      )
        .to(
          [backgroundImageRef.current, bgKeyArtRef.current],
          {
            scale: 1,
            duration: 0.4,
            // ease: "power2.out",
          },
          "<"
        )
        .to(
          [buttonRef.current, WatchRef.current, bgKeyArtRef.current],
          {
            opacity: 0,
            duration: 0.4,
            // ease: "power2.out",
          },
          "<"
        )
        .to(
          backgroundImageRef.current,
          {
            opacity: 0,
            duration: 0.4,
            // ease: "power2.out",
          },
          "<20%"
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
          },
          {
            backgroundImage: `radial-gradient(
          circle at 50% -30vh,
          rgb(255, 213, 133) 0px,
          rgb(247, 77, 82) 50vh,
          rgb(145, 42, 105) 90vh,
          rgba(32, 31, 66, 0) 150vh)`,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<40%"
        ) .fromTo(
          [viLogoOverlayRef.current],
          {opacity: 0,
            maskImage: `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 50%)`,
            webkitMaskImage: `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 50%)`,
          },
          {
            opacity: 1,
            maskImage: `radial-gradient(circle, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0) 100%)`,
            webkitMaskImage: `radial-gradient(circle, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0) 100%)`,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "<40%" // i want start a bit later than the text
        )
        .to(
          consolesRef.current,
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          "<10%"
        )
        .to(
          containerRef.current,
          {
            scale: 0.8,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<"
        );
       
      tl.fromTo(
        comingSoonRef.current,
        {
          maskImage: `radial-gradient(circle at 50% 18vh, rgb(0, 0, 0) 50vh, rgba(0, 0, 0, 0) 80vh)`,
        },
        {
          maskImage: `radial-gradient(circle at 50% -60vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 60vh)`,
          duration: 1,
          ease: "power2.inOut",
        },
        "<40%" // يبدأ بعد آخر خطوة بقليل (عدّل حسب الحاجة)
      ).fromTo(
        [viLogoOverlayRef.current, maskWrapperRef.current],
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<" // يبدأ في نفس وقت الخطوة السابقة
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-dvh h-dvh overflow-hidden "
    >
      <div
        ref={viLogoOverlayRef}
        className="fixed inset-0 z-[2] viLogo pb-30 md:pb-80 xl:pb-70 "
        style={{
          willChange: "auto",
        }}
      />
      <div
        ref={maskWrapperRef}
        className="mask-wrapper absolute inset-0 z-[1] pb-30 md:pb-80 xl:pb-70"
        style={{
          willChange: "auto",
        }}
      >
        <Image
          ref={backgroundImageRef}
          src="/images/hero-bg.webp"
          alt="Hero Background"
          className="object-cover md:scale-125 z-[1]"
          fill
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          priority
        />
        <Image
          ref={bgKeyArtRef}
          src="/images/heroKeyArt.webp"
          alt="Hero Key Art"
          className="object-cover md:scale-125 z-[1]"
          style={{
            willChange: "hight width",
          }}
          fill
          unoptimized
          priority
        />

        <button
          ref={buttonRef}
          alt="Play Button"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 transform hover:scale-105 transition-transform duration-750 pointer-cursor "
        >
          <PlayIcon className="md:w-26 md:h-26 text-gta-white backdrop-blur-[100px] rounded-full " />
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-12 pointer-events-none">
          <div
            ref={WatchRef}
            className="relative w-55 h-14 flex items-center justify-center "
          >
            <WatchTrailer className="absolute inset-0 -translate-y-10 translate-x-13 text-white glow-logo " />
            <span className="absolute text-[0.8rem] font-round font-black tracking-[0.35em] -translate-y-2.5 uppercase text-center text-white whitespace-nowrap glow-text">
              Watch Trailer 2
            </span>
          </div>
        </div>
      </div>

      <div
        ref={comingSoonRef}
        className="absolute inset-0 w-dvw h-dvh  flex flex-col items-center justify-center md:gap-5 z-[3]"
      >
        <div ref={VIlogoRef} className="hidden-VI-Logo  relative">
          <Image
            src="/images/logo.webp"
            alt="Grand Theft Auto VI Logo"
            fill
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="opacity-1 object-cover"
            style={{
              // visibility: "hidden",
            }}
          />
        </div>

        {/* نص "COMING MAY 26 2026" */}
        <h3
          ref={textRef}
          className=" text-center text-[2.8rem] md:text-[5.4rem] font-black leading-9 md:leading-19 gradient-text "
        >
          COMING
          <br />
          MAY 26
          <br />
          2026
        </h3>

        <div
          ref={consolesRef}
          className="flex flex-row items-center justify-canter gap-5 text-gta-white "
        >
          <PsIcon className="max-w-16  md:max-w-100 md:max-h-100" />
          <XboxIcon className="max-w-25  md:max-w-170 md:max-h-100" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
