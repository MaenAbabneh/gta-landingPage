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
          let end_scroll;
          let scrup_value;
          let y;
          if (isDesktop) {
            end_scroll = "+=1500";
            scrup_value = 1.5;
            y = -100;
            gsap.set(PartOneRef.current, { marginTop: "190vh" });
          }
          else if (isTablet) {
            end_scroll = "+=1500";
            scrup_value = 1.5;
            y = -50;
            gsap.set(PartOneRef.current, { marginTop: "200vh" });
          }
          else if (isMobile) {
            end_scroll = "+=2100";
            scrup_value = 2.1;
            y = -30;
            gsap.set(PartOneRef.current, { marginTop: "250vh" });
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
          tl.to(rightColumRef.current, { y: y, ease: "none" });
        }
      );
    },
    { scope: PartOneRef , dependencies: [] }
  );

  return (
    <section
      ref={PartOneRef}
      className="relative z-10 h-dvh grid-gallary md:gap-3 lg:gap-5 "
    >
      <div className="grid xl:grid-cols-6 grid-cols-4  col-[content-start/content-end] md:col-[content-start/6] xl:col-[content-start/8] h-svh jason-content">
        <h1 className="text-yellow font-long uppercase md:text-5xl lg:text-6xl xl:text-[5.5rem] mb-5 col-[1/5] xl:col-[2/7]  ">
          Jason Duval
        </h1>
        <div className="mb-10 col-[1/4] xl:col-[2/6] flex flex-col gap-4 ">
          <h2 className="text-pink md:text-2xl lg:text-4xl xl:text-[2.5rem] font-round font-bold  xl:mx-6 md:leading-6 lg:leading-8 xl:leading-11 ">
            Jason wants an easy life, but things just keep getting harder.
          </h2>
          <p className="text-white md:text-[0.8rem] lg:text-lg xl:text-[1.4rem]  xl:mx-6  font-round font-black leading-tight">
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </p>
        </div>
        <div className="col-[1/5] xl:col-[2/7] aspect-[9/16] w-full h-full ">
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
        className="grid xl:grid-cols-6 gap-1 pt-40 col-[content-start/content-end] md:col-[6/main-end] xl:col-[8/main-end] w-full h-svh   "
      >
        <div className="relative col-[1/7] aspect-[1/1] h-full w-full ">
          <ImageModal
            src="/images/People/jason/jason-2.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover [object-position:5%_center]"
            ButtonStyle="h-full w-full "
          />
        </div>
        <div className="relative col-[1/5] row-[4/7] aspect-[1/1] w-full h-full ">
          <ImageModal
            src="/images/People/jason/jason-6.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            ButtonStyle="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default JasonContent_1;
