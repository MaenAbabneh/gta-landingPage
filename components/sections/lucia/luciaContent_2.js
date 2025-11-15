"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LuciaImage } from "@/constants/assest";
import ImageModel from "@/components/ui/ImageModel";

gsap.registerPlugin(ScrollTrigger);

function LuciaContent_2() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);
  const fadeImageRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageFour = LuciaImage.Image_4.url;
  const ImageFive = LuciaImage.Image_5.url;
  const ImageSix = LuciaImage.Image_6.url;

  const ImageViewerFour = LuciaImage.Viwer_4.url;
  const ImageViewerFive = LuciaImage.Viwer_5.url;
  const ImageViewerSix = LuciaImage.Viwer_6.url;

  // ✅ Placeholders للصور
  const placeholderFour = LuciaImage.Image_4.placeholder;
  const placeholderFive = LuciaImage.Image_5.placeholder;
  const placeholderSix = LuciaImage.Image_6.placeholder;

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
            gsap.set(PartTwoRef.current, { marginTop: "190vh" });
          } else if (isTablet) {
            gsap.set(PartTwoRef.current, { marginTop: "200vh" });
          } else if (isMobile) {
            gsap.set(PartTwoRef.current, { marginTop: "150vh" });
          }
          gsap.set(fadeImageRef.current, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: PartTwoRef.current,
              start: "top top",
              end: "+=1800 bottom",
              scrub: true,
              // markers: true,
            },
          });
          tl.to(rightSideRef.current, {
            y: -100,
            ease: "none",
            duration: 1,
          }).to(
            fadeImageRef.current,
            { opacity: 1, ease: "none", duration: 0.6 },
            "0"
          );
        }
      );
    },
    {
      scope: PartTwoRef,
    }
  );

  return (
    <section ref={PartTwoRef} className="relative z-10 grid-gallary gap-5">
      <div
        ref={rightSideRef}
        className="flex flex-col col-[content-start/5] jason-content gap-20"
      >
        <p className="text-white md:text-[0.8rem] lg:text-lg xl:text-[1.4rem] 2xl:text-[1.6rem] md:mx-5 lg:mx-8 xl:mx-25 2xl:mx-20  font-round font-black md:leading-4 lg:leading-5 xl:leading-6 text-pretty text-left md:mb-5 lg:mb-0">
          Fresh out of prison and ready to change the odds in her favor, Lucia’s
          committed to her plan — no matter what it takes.
        </p>
        <div className="relative max-w-full h-auto aspect-[9/16] overflow-hidden">
          <ImageModel
            src={ImageFive}
            viewerImg={ImageViewerFive}
            alt={LuciaImage.Image_5.alt}
            sizes={LuciaImage.Image_5.size}
            placeholder={placeholderFive}
            className="object-cover [object-position:60%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>

      <div className=" col-[5/main-end] grid grid-cols-3 items-center justify-center gap-5 ">
        <h2 className=" text-pink md:text-[2.7rem] font-round font-bold text-3xl leading-11 col-[1/3] ml-20  text-pretty text-left  ">
          A life with
          <br />
          Jason could be
          <br />
          her way out.
        </h2>
        <div className="relative max-w-full h-auto aspect-square overflow-hidden col-[1/4] ">
          <ImageModel
            src={ImageFour}
            viewerImg={ImageViewerFour}
            alt={LuciaImage.Image_4.alt}
            sizes={LuciaImage.Image_4.size}
            placeholder={placeholderFour}
            className="object-cover [object-position:0%_center] "
            ButtonStyle="w-full h-full "
            priority
          />
        </div>

        <div className="relative max-w-full h-auto aspect-[1/1] overflow-hidden col-[1/3] ">
          <ImageModel
            src={ImageSix}
            viewerImg={ImageViewerSix}
            alt={LuciaImage.Image_6.alt}
            sizes={LuciaImage.Image_6.size}
            placeholder={placeholderSix}
            className=" object-cover [object-position:20%_center]  "
            ButtonStyle="h-full w-full"
            fadeImageRef={fadeImageRef}
          />
        </div>
      </div>
    </section>
  );
}

export default LuciaContent_2;
