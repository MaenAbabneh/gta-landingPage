"use client";

import { useRef } from "react";
import { JasonImage } from "@/constants/assest";
import {useContentAnimetion} from "@/hooks/animation/useContentAnimetion";

import ImageModel from "@/components/ui/ImageModel";
import MobileCarousel from "@/components/ui/mobileCarousel";


function JasonContent_2() {
  const containerRef = useRef(null);
  const moveingColumRef = useRef(null);
  const fadeImageRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageFour = JasonImage.Image_4.url;
  const ImageFive = JasonImage.Image_5.url;
  const ImageSix = JasonImage.Image_6.url;

  const ImageViewerFour = JasonImage.Viwer_4.url;
  const ImageViewerFive = JasonImage.Viwer_5.url;
  const ImageViewerSix = JasonImage.Viwer_6.url;

  // ✅ Placeholders للصور
  const placeholderFour = JasonImage.Image_4.placeholder;
  const placeholderFive = JasonImage.Image_5.placeholder;
  const placeholderSix = JasonImage.Image_6.placeholder;

  const mobileSlides = [
    {
      src: ImageFive,
      viewerImg: ImageViewerFive,
      alt: JasonImage.Image_1.alt,
      sizes: JasonImage.Image_1.size,
      placeholder: placeholderFive,
      className: "object-cover [object-position:50%_center]",
    },
    {
      src: ImageSix,
      viewerImg: ImageViewerSix,
      alt: JasonImage.Image_1.alt,
      sizes: JasonImage.Image_1.size,
      placeholder: placeholderSix,
      className: "object-cover [object-position:50%_center]",
    },
  ];

    useContentAnimetion({
      containerRef,
      moveingColumRef,
      fadeImageRef,
    });


  return (
    <section
      ref={containerRef}
      className="relative z-10 mt-[220vh] flex flex-col md:grid grid-gallary md:gap-3 lg:gap-5 pb-[20vh]"
    >
      <div className="col-[main-start/mid] hidden md:flex flex-col gap-5 jason-content ">
        <h2 className=" text-pink text-[clamp(1rem,3vw,2.5rem)] font-round font-bold text-balance leading-[100%] mb-20 self-center">
          Another day in
          <br />
          paradise, right?
        </h2>
        <div className="grid sup-grid-gallary gap-3 lg:gap-5 ">
          <div className="relative aspect-[1/1] max-w-full h-auto col-span-full overflow-hidden">
            <ImageModel
              src={ImageFive}
              viewerImg={ImageViewerFive}
              alt={JasonImage.Image_5.alt}
              sizes={JasonImage.Image_5.size}
              placeholder={placeholderFive}
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
            />
          </div>
          <div className="relative aspect-[1/1] max-w-full h-auto col-start-6 col-span-full overflow-hidden">
            <ImageModel
              src={ImageSix}
              viewerImg={ImageViewerSix}
              alt={JasonImage.Image_6.alt}
              sizes={JasonImage.Image_6.size}
              placeholder={placeholderSix}
              className=" object-cover [object-position:20%_center]  "
              ButtonStyle="h-full w-full"
              fadeImageRef={fadeImageRef}
            />
          </div>
        </div>
      </div>

      <div
        ref={moveingColumRef}
        className="jason-content col-[mid/content-end] grid sup-grid-gallary gap-3 lg:gap-5 "
      >
        <h2 className=" text-pink text-[clamp(1.4rem,3vw,2.5rem)] font-round font-bold text-balance leading-[100%] col-start-3 col-end-8 md:hidden">
          Another day in
          <br />
          paradise, right?
        </h2>
        <p className="text-white char-p-font-size font-round text-balance font-bold leading-[1.3] tracking-[-0.0125] col-start-3 col-end-11 md:mb-20">
          Meeting Lucia could be the best or worst thing to ever happen to him.
          Jason knows how he&apos;d like it to turn out but right now, it&apos;s
          hard to tell.
        </p>
        <div className="relative aspect-[9/16] max-w-full h-auto overflow-hidden col-span-full md:col-end-12 p-2 md:p-0">
          <ImageModel
            src={ImageFour}
            viewerImg={ImageViewerFour}
            alt={JasonImage.Image_4.alt}
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            placeholder={placeholderFour}
            className="object-cover [object-position:25%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>
      <div ref={fadeImageRef} className="md:hidden flex flex-col gap-2 ">
        <MobileCarousel slides={mobileSlides} />
      </div>
    </section>
  );
}

export default JasonContent_2;
