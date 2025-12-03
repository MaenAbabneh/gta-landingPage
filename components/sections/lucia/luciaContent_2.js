"use client";

import { useRef } from "react";

import { LuciaImage } from "@/constants/assest";
import {useContentAnimetion} from "@/hooks/animation/useContentAnimetion";

import ImageModel from "@/components/ui/ImageModel";
import MobileCarousel from "@/components/ui/mobileCarousel";

function LuciaContent_2() {
  const containerRef = useRef(null);
  const moveingColumRef = useRef(null);
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
  
  const mobileSlides = [
    {
      src: ImageFour,
      viewerImg: ImageViewerFour,
      alt: LuciaImage.Image_1.alt,
      sizes: LuciaImage.Image_1.size,
      placeholder: placeholderFour,
      className: "object-cover [object-position:50%_center]",
    },
    {
      src: ImageSix,
      viewerImg: ImageViewerSix,
      alt: LuciaImage.Image_1.alt,
      sizes: LuciaImage.Image_1.size,
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
      className="relative z-10 flex flex-col md:grid grid-gallary mt-[230vh] gap-5"
    >
      <div
        ref={moveingColumRef}
        className="col-[content-start/mid] jason-content grid sup-grid-gallary gap-3 lg:gap-5 "
      >
        <p className="text-white char-p-font-size font-round text-balance font-bold leading-[1.3] tracking-[-0.0125] col-start-3 col-end-11 md:mb-20">
          Fresh out of prison and ready to change the odds in her favor, Lucia’s
          committed to her plan — no matter what it takes.
        </p>
        <div className="relative aspect-[9/16] max-w-full h-auto overflow-hidden col-span-full md:col-start-2 p-2 md:p-0">
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

      <div ref={fadeImageRef} className="md:hidden flex flex-col gap-2 ">
        <MobileCarousel slides={mobileSlides} />
      </div>

      <div className=" col-[mid/main-end] hidden md:flex flex-col gap-5 jason-content md:pt-30">
        <h2 className="text-pink text-[clamp(1rem,3vw,2.5rem)] font-round font-bold text-balance leading-[100%] mb-20 self-center">
          A life with
          <br />
          Jason could be
          <br />
          her way out.
        </h2>
        <div className="grid sup-grid-gallary gap-3 lg:gap-5 ">
          <div className="relative aspect-[1/1] max-w-full h-auto col-span-full overflow-hidden">
            <ImageModel
              src={ImageFour}
              viewerImg={ImageViewerFour}
              alt={LuciaImage.Image_4.alt}
              sizes={LuciaImage.Image_4.size}
              placeholder={placeholderFour}
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
            />
          </div>
          <div className="relative aspect-[1/1] max-w-full h-auto col-end-8 col-span-full overflow-hidden">
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
      </div>

    </section>
  );
}

export default LuciaContent_2;
