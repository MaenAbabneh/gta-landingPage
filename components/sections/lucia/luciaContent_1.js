"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuciaImage } from "@/constants/assest";
import ImageModal from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

const LuciaContent_1 = () => {
  const PartOneRef = useRef(null);
  const rightColumRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = LuciaImage.Image_1.url;
  const ImageTwo = LuciaImage.Image_2.url;
  const ImageThree = LuciaImage.Image_3.url;

  const ImageViewerOne = LuciaImage.Viwer_1.url;
  const ImageViewerTwo = LuciaImage.Viwer_2.url;
  const ImageViewerThree = LuciaImage.Viwer_3.url;

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
          if (isDesktop) {
            gsap.set(PartOneRef.current, { marginTop: "120vh" });
          } else if (isTablet) {
            gsap.set(PartOneRef.current, { marginTop: "150vh" });
          } else if (isMobile) {
            gsap.set(PartOneRef.current, { marginTop: "170vh" });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: PartOneRef.current,
              start: "top center",
              end: "+=1500",
              scrub: 2,
              ease: "none",
              // pinSpacing: false,
              // markers: true
            },
          });
          tl.to(rightColumRef.current, { y: -100, ease: "none", duration: 1 });
        }
      );
    },
    { scope: PartOneRef }
  );

  return (
    <section ref={PartOneRef} className="relative z-10 grid-gallary gap-x-5">
      {/* Left Column */}
      <div
        ref={rightColumRef}
        className=" col-[main-start/5] grid grid-cols-2 gap-y-5 mg:pt-25 lg:pt-40 "
      >
        <div className=" aspect-[1/1] relative max-w-full h-auto overflow-hidden col-[1/4]   ">
          <ImageModal
            src={ImageOne}
            viewerImg={ImageViewerOne}
            alt={LuciaImage.Image_1.alt}
            sizes={LuciaImage.Image_1.size}
            className="object-cover [object-position:80%_center]"
            ButtonStyle="w-full h-full"
            priority
          />
        </div>
        <div className="relative h-auto max-w-full aspect-[9/16] overflow-hidden col-[2/4]">
          <ImageModal
            src={ImageThree}
            viewerImg={ImageViewerThree}
            alt={LuciaImage.Image_3.alt}
            sizes={LuciaImage.Image_3.size}
            className="object-cover [object-position:65%_center]"
            ButtonStyle="h-full w-full"
          />
        </div>
      </div>

      {/* Right Column */}

      <div className=" col-[5/content-end] flex flex-col gap-10 ">
        <h1 className="text-yellow font-long uppercase md:text-[3.3rem] lg:text-[3.75rem] xl:text-[5.5rem] 2xl:text-9xl text-nowrap text-left">
          Lucia Caminos
        </h1>
        <div className="flex flex-col gap-3 flex-wrap mb-10">
          <h2 className="text-pink md:text-2xl lg:text-4xl xl:text-[2.5rem] 2xl:text-[3rem] font-round font-bold md:mr-5 xl:mr-30 2xl:mr-20 md:leading-6 lg:leading-8 xl:leading-9 2xl:leading-11  text-left">
            Lucia’s father taught her to fight as soon as she could walk.
          </h2>
          <p className="text-white md:text-[0.8rem] lg:text-lg xl:text-[1.3rem] 2xl:text-[1.6rem] md:mr-5 lg:mr-8 xl:mr-40 2xl:mr-20  font-round font-black md:leading-4 lg:leading-5 xl:leading-6 text-pretty text-left md:mb-5 lg:mb-0">
            Life has been coming at her swinging ever since. Fighting for her
            family landed her in the Leonida Penitentiary. Sheer luck got her
            out. Lucia’s learned her lesson — only smart moves from here.
          </p>
        </div>
        <div className="relative max-w-full h-auto overflow-hidden aspect-[1/1]   ">
          <ImageModal
            src={ImageTwo}
            viewerImg={ImageViewerTwo}
            alt={LuciaImage.Image_2.alt}
            sizes={LuciaImage.Image_2.size}
            className="object-cover [object-position:65%_center]"
            ButtonStyle="h-full w-full"
          />
        </div>
        <p className="text-white md:text-[0.8rem] lg:text-lg xl:text-[1.2rem] 2xl:text-[1.6rem] md:mx-5 lg:mx-6 xl:mx-17 2xl:mx-20  font-round font-black md:leading-4 lg:leading-5 xl:leading-6 text-left text-pretty mt-20 ">
          More than anything, Lucia wants the good life her mom has dreamed of
          since their days in Liberty City — but instead of half-baked
          fantasies, Lucia is prepared to take matters into her own hands.
        </p>
      </div>
    </section>
  );
};

export default LuciaContent_1;
