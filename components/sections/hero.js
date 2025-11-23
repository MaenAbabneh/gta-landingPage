"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";

import { PlayIcon, WatchTrailer } from "../ui/svg";
import { useTrailer } from "@/context/TrailerContext";
import ComingSoon from "@/components/ui/comingsoon";
import { HeroImage } from "@/constants/assest";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isTablet: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          isminiMobile: "(min-width: 0px) and (max-width: 400px)",
        },
        (context) => {
          let { isTablet, isMobile, isminiMobile } = context.conditions;
          let maskSize;
          if (isminiMobile) {
            maskSize = "clamp(14vmin, 14vmax, 20vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.1,
            });
          } else if (isMobile) {
            maskSize = "clamp(12vmin, 12vmax, 20vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.1,
            });
          } else if (isTablet) {
            maskSize = "clamp(15vh, 20%, 25vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.25,
            });
          }

          gsap.set(
            [
              backgroundImageRef.current,
              buttonRef.current,
              bgKeyArtRef.current,
            ],
            { opacity: 1, pointerEvents: "auto" }
          );
          gsap.set([consolesRef.current], { opacity: 0 });
          gsap.set([maskWrapperRef.current, viLogoOverlayRef.current], {
            BackgroundSize: "clamp(5000vh, 3200%, 0.0001vh)",
            backgroundPosition: "50% 47%",
            webkitMaskSize: "clamp(5000vh, 3200%, 0.0001vh)",
            maskSize: "clamp(5000vh, 3200%, 0.0001vh)",
            webkitMaskPosition: "50% 47%",
            maskPosition: "50% 47%",
          });
          gsap.set(viLogoOverlayRef.current, { opacity: 0 });
          gsap.set(containerRef.current, { scale: 1 });

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
              // markers: true,
            },
          });

          tl.to(
            [maskWrapperRef.current, viLogoOverlayRef.current],
            {
              maskSize: maskSize,
              webkitMaskSize: maskSize,
              maskPosition: "50% 50%",
              webkitMaskPosition: "50% 50%",
              backgroundSize: maskSize,
              backgroundPosition: "50% 50%",
              duration: 1,
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
              bgKeyArtRef.current,
              {
                opacity: 0,
                duration: 0.4,
              },
              "<"
            )
            .to(
              [buttonRef.current, WatchRef.current],
              {
                opacity: 0,
                zIndex: -1,
                duration: 0.4,
                // ease: "power2.out",
              },
              "<"
            )
            .to(
              backgroundImageRef.current,
              {
                opacity: 0,
                duration: 0.8,
                // ease: "power2.out",
              },
              "<40%"
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
                duration: 2,
                ease: "power2.inOut",
              },
              "<30%"
            )
            .fromTo(
              [viLogoOverlayRef.current],
              {
                opacity: 0,
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
              duration: 0.7,
              ease: "power2.out",
            },
            "<" // يبدأ في نفس وقت الخطوة السابقة
          );
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-dvh overflow-hidden "
    >
      <div
        ref={viLogoOverlayRef}
        className="fixed inset-0 z-[2] viLogo pb-35 md:pb-57  xl:pb-80 "
        style={{
          willChange: "width height",
        }}
      />
      <div
        ref={maskWrapperRef}
        className="mask-wrapper absolute inset-0 z-[1] pb-35 md:pb-57  xl:pb-80"
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
          <WatchTrailer className="absolute inset-0 -translate-y-10 translate-x-13 text-white glow-logo " />
          <span className="absolute text-[0.8rem] font-round font-black tracking-[0.35em] -translate-y-2.5 uppercase text-center text-white whitespace-nowrap glow-text">
            Watch Trailer 2
          </span>
        </div>
      </div>

      <ComingSoon refs={{ comingSoonRef, VIlogoRef, textRef, consolesRef }} />

      {/* <TrailerOverlay
        isOpen={isOpenOverlay}
        isOpenfalse={!isOpenOverlay}
        onClose={() => setIsOpenOverlay(false)}
      /> */}
    </section>
  );
}

export default Hero;
