"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ImageModal from "@/components/ImageModel";
import { JasonImage } from "@/constants/assest";

gsap.registerPlugin(ScrollTrigger);

const JasonContent_1 = () => {
  const PartOneRef = useRef(null);
  const rightColumRef = useRef(null);
  const fadeImageRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = JasonImage.Image_1.url;
  const ImageTwo = JasonImage.Image_2.url;
  const ImageThree = JasonImage.Image_3.url;

  const ImageViewerOne = JasonImage.Viwer_1.url;
  const ImageViewerTwo = JasonImage.Viwer_2.url;
  const ImageViewerThree = JasonImage.Viwer_3.url;

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
      <div className="col-[content-start/5] flex flex-col gap-5 ">
        <h1 className="text-yellow font-long uppercase md:text-[3.3rem] lg:text-[7vw] xl:text-[6rem] 2xl:text-9xl text-nowrap">
          Jason Duval
        </h1>
        <div className="flex flex-col md:gap-4 2xl:gap-5 items-start justify-start mb-10">
          <h2 className="text-pink md:text-2xl lg:text-4xl xl:text-[2.5rem] 2xl:text-[3rem] font-round font-bold md:mr-5 xl:mr-25 2xl:mr-20 md:leading-6 lg:leading-8 xl:leading-9 2xl:leading-11 text-balance">
            Jason wants an easy life, but things just keep getting harder.
          </h2>
          <p className="text-white md:text-[0.8rem] lg:text-[1.25rem] xl:text-[1.4rem] 2xl:text-[1.6rem] md:mr-5 xl:mr-20 2xl:mx-20 font-round font-black md:leading-4 lg:leading-5 xl:leading-7 text-balance text-left  ">
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </p>
        </div>

        <div className="relative aspect-[9/16] max-w-full h-auto overflow-hidden ">
          <ImageModal
            src={ImageOne}
            viewerImg={ImageViewerOne}
            alt={JasonImage.Image_1.alt}
            sizes={JasonImage.Image_1.size}
            className="object-cover [object-position:80%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>

      <div
        ref={rightColumRef}
        className="col-[5/main-end] grid grid-cols-3 grid-rows-2 gap-5 md:pt-25 xl:pt-40"
      >
        <div className="relative max-w-full h-auto aspect-square overflow-hidden col-[1/4]">
          <ImageModal
            src={ImageTwo}
            viewerImg={ImageViewerTwo}
            alt={JasonImage.Image_2.alt}
            sizes={JasonImage.Image_2.size}
            className="object-cover [object-position:5%_center]"
            ButtonStyle="h-full w-full "
          />
        </div>
        <div className="relative max-w-full h-auto  aspect-square overflow-hidden col-[1/3] ">
          <ImageModal
            src={ImageThree}
            viewerImg={ImageViewerThree}
            alt={JasonImage.Image_3.alt}
            sizes={JasonImage.Image_3.size}
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
