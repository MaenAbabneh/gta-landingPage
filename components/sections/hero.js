"use client";

import Image from "next/image";
import { useRef } from "react";

import ComingSoon from "@/components/ui/comingsoon";
import { HeroImage } from "@/constants/assest";
import { useTrailer } from "@/context/TrailerContext";
import { useHeroAnimetion } from "@/hooks/animation/useHeroAnimetion";

import { PlayIcon, WatchTrailer } from "../ui/svg";

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
        className="fixed inset-0 z-[2] viLogo mask-padding"
        style={{
          willChange: "width height",
        }}
      />
      <div
        ref={maskWrapperRef}
        className="mask-wrapper absolute inset-0 z-[1] mask-padding"
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
          className="relative w-[clamp(200px,15vw,255px)] h-14 flex items-center justify-center transition-transform duration-750 "
        >
          <WatchTrailer className="absolute inset-0 -translate-y-9.5 md:-translate-y-10 translate-x-10 md:translate-x-12 text-white glow-logo w-auto h-30" />
          <span className="absolute text-[clamp(13px,0.9vw,22px)] md:text-[clamp(15px,1vw,36px)] font-round font-black leading-[120%] tracking-[0.35em] -translate-y-1/2  uppercase text-center text-nowrap text-white whitespace-nowrap glow-text">
            Watch Trailer 2
          </span>
        </div>
      </div>

      <ComingSoon
        isHero={true}
        refs={{ comingSoonRef, VIlogoRef, textRef, consolesRef }}
      />
    </section>
  );
}

export default Hero;
