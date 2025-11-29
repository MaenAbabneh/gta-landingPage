"use client";

import Image from "next/image";
import { useRef } from "react";

import { PlayIcon, WatchTrailer } from "../ui/svg";
import { useTrailer } from "@/context/TrailerContext";
import ComingSoon from "@/components/ui/comingsoon";
import { HeroImage } from "@/constants/assest";
import { useHeroAnimetion } from "@/hooks/animation/useHeroAnimetion";


function Hero() {
  const { openTrailer } = useTrailer();

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

  useHeroAnimetion({
    containerRef,
    maskWrapperRef,
    backgroundImageRef,
    buttonRef,
    WatchRef,
    bgKeyArtRef,
    comingSoonRef,
    textRef,
    consolesRef,
    viLogoOverlayRef,
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-dvh overflow-hidden "
    >
      <div
        ref={viLogoOverlayRef}
        className="fixed inset-0 z-[2] viLogo pb-35 md:pb-80"
        style={{
          willChange: "width height",
        }}
      />
      <div
        ref={maskWrapperRef}
        className="mask-wrapper absolute inset-0 z-[1] pb-35 md:pb-80"
        style={{
          willChange: "widht height",
        }}
      >
        <Image
          ref={backgroundImageRef}
          src={HeroImage.HeroBG.url}
          alt="Hero Background"
          className="object-cover scale-125 "
          fill
          sizes="100vw"
          suppressHydrationWarning={true}
          unoptimized
        />
        <Image
          ref={bgKeyArtRef}
          src={HeroImage.HeroKeyArt.url}
          alt="Hero Key Art"
          className="object-cover scale-125 "
          sizes="100vw"
          fill
          unoptimized
          suppressHydrationWarning={true}
        />
      </div>

      <button
        ref={buttonRef}
        alt="Play Button"
        onClick={() => openTrailer()}
        className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:scale-[1.05] transition-transform duration-750 cursor-pointer "
      >
        <PlayIcon className="md:w-26 md:h-26 text-gta-white backdrop-blur-[100px] rounded-full " />
      </button>

      <div className="absolute z-10 inset-0 flex flex-col items-center justify-end  pb-12 pointer-events-none">
        <div
          ref={WatchRef}
          className="relative w-55 h-14 flex items-center justify-center transition-transform duration-750 "
        >
          <WatchTrailer className="absolute inset-0 -translate-y-10 translate-x-12 text-white glow-logo " />
          <span className="absolute text-[max(0.9vw,1.8vh)] font-round font-black leading-[120%] tracking-[0.35em] -translate-y-1/2  uppercase text-center text-nowrap text-white whitespace-nowrap glow-text">
            Watch Trailer 2
          </span>
        </div>
      </div>

      <ComingSoon isHero={true} refs={{ comingSoonRef, VIlogoRef, textRef, consolesRef }} />
    </section>
  );
}

export default Hero;
