"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import ImageModal from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

const JasonContent_1 = () => {
  const PartOneRef = useRef(null);
  const rightColumRef = useRef(null);
  const fadeImageRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(fadeImageRef.current, { opacity: 0 });
      const mm = gsap.matchMedia();
      mm.add(
        {
          isBigDisplay: "(min-width: 1280px)",
          isDesktop: "(min-width: 1024px) and (max-width: 1279px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isBigDisplay, isDesktop, isTablet, isMobile } =
            context.conditions;
          let end_scroll;
          let scrup_value;
          let y;
          if (isBigDisplay) {
            end_scroll = "+=1200";
            scrup_value = 1.2;
            y = -120;
            gsap.set(PartOneRef.current, { marginTop: "150vh" });
          } else if (isDesktop) {
            end_scroll = "+=1500";
            scrup_value = 1.5;
            y = -100;
            gsap.set(PartOneRef.current, { marginTop: "100vh" });
          } else if (isTablet) {
            end_scroll = "+=1000";
            scrup_value = 1;
            y = -80;
            gsap.set(PartOneRef.current, { marginTop: "150vh" });
          } else if (isMobile) {
            end_scroll = "+=2100";
            scrup_value = 2.1;
            y = -30;
            gsap.set(PartOneRef.current, { marginTop: "270vh" });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: PartOneRef.current,
              start: "top center",
              end: end_scroll,
              scrub: scrup_value,
              // markers: true
            },
          });
          tl.to(rightColumRef.current, { y: y, ease: "none", duration: 1 });
          tl.to(
            fadeImageRef.current,
            { opacity: 1, ease: "none", duration: 0.5 },
            0
          );
        }
      );
    },
    { scope: PartOneRef, dependencies: [] }
  );

  return (
    <section ref={PartOneRef} className="relative z-10 grid-gallary gap-5">
      <div className="col-[content-start/4] flex flex-col lg:gap-5">
        <h1 className="text-yellow font-long uppercase md:text-[3.3rem] lg:text-[3.75rem] xl:text-[6rem] 2xl:text-9xl text-nowrap">
          Jason Duval
        </h1>
        <div className="flex flex-col md:gap-4 2xl:gap-5 items-start justify-start ">
          <h2 className="text-pink md:text-2xl lg:text-4xl xl:text-[2.5rem] 2xl:text-[3rem] font-round font-bold md:mx-5 xl:mx-15 2xl:mx-20 md:leading-6 lg:leading-8 xl:leading-9 2xl:leading-11 text-balance">
            Jason wants an easy life, but things just keep getting harder.
          </h2>
          <p className="text-white md:text-[0.8rem] lg:text-lg xl:text-[1.4rem] 2xl:text-[1.6rem] md:mx-5 lg:mx-6 xl:mx-10 2xl:mx-20  font-round font-black md:leading-4 lg:leading-5 xl:leading-7 text-balance md:mb-5 lg:mb-0 ">
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </p>
        </div>

        <div className="aspect-[9/16] max-w-full h-auto overflow-hidden ">
          <ImageModal
            src="/images/People/jason/jason-1.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover [object-position:80%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>

      <div
        ref={rightColumRef}
        className="col-[4/main-end] grid grid-cols-2 grid-rows-3 md:pt-25 lg:pt-40 gap-3 "
      >
        <div className="relative aspect-[1/1] col-span-2">
          <ImageModal
            src="/images/People/jason/jason-2.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover [object-position:5%_center]"
            ButtonStyle="h-full w-full "
          />
        </div>
        <div className="relative row-span-1 col-span-1  aspect-[1/1]">
          <ImageModal
            src="/images/People/jason/jason-6.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            ButtonStyle="h-full w-full"
            fadeImageRef={fadeImageRef}
          />
        </div>
      </div>
    </section>
  );
};

export default JasonContent_1;
