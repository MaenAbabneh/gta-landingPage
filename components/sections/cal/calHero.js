"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isDesktop, isTablet, isMobile } = context.conditions;
          gsap.set(containerRef.current, { opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 120%",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
              // markers: true,
            },
          });

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
            { y: -50, ease: "none" },
            { y: 0, ease: "none", duration: 1 },
            0
          );
          tl.fromTo(
            textRef.current,
            { y: 20, ease: "none" },
            { y: 0, ease: "none", duration: 1 },
            0
          );
          if (isDesktop && isTablet) {
            tl.to(
              containerRef.current,
              { opacity: 0, ease: "none", duration: 1 },
              "60%"
            );
          }
          if (isMobile) {
            tl.to([maskWrapperRef.current , bgKeyArtRef.current , backgroundImageRef.current], {
              opacity: 0,
              ease: "none",
              duration: 1,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        }
      );
    },
    { scope: containerRef }
  );
  return (
    <section
      ref={containerRef}
      className="relative w-full grid grid-gallary overflow-hidden"
    >
      <div className=" w-full h-full overflow-hidden col-[main-start/main-end] relative ">
        <div
          ref={maskWrapperRef}
          className="h-[100vh] md:h-[135vh] min-w-full relative bg-gta-transparent caloverlay "
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
        <div className="absolute inset-0 min-w-full ">
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
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 col-[content-start/content-end] md:col-[content-start/mid] flex flex-col items-start ps-20 md:ps-30  justify-center z-20 "
      >
        <h1 className="text-yellow font-long uppercase cal-head-size leading-[1]">
          Cal
          <br />
          Hampton
        </h1>
        <div className="mt-5 gap-5 flex flex-col  ">
          <h2 className="text-gta-blue cal-h2-size font-round font-bold leading-[1.1] text-balance ">
            What if everything on the internet was true?{" "}
          </h2>
          <p className="text-white  cal-p-size font-round font-black leading-[1.3] text-balance text-left">
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
