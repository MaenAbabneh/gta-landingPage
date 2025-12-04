"use client";

import { useRef } from "react";

import ImageModal from "@/components/ui/ImageModel";
import MobileCarousel from "@/components/ui/mobileCarousel";
import { LuciaImage } from "@/constants/assest";
import {useContentAnimetion} from "@/hooks/animation/useContentAnimetion";

const LuciaContent_1 = () => {
  const containerRef = useRef(null);
  const moveingColumRef = useRef(null);
  const fadeImageRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = LuciaImage.Image_1.url;
  const ImageTwo = LuciaImage.Image_2.url;
  const ImageThree = LuciaImage.Image_3.url;

  const ImageViewerOne = LuciaImage.Viwer_1.url;
  const ImageViewerTwo = LuciaImage.Viwer_2.url;
  const ImageViewerThree = LuciaImage.Viwer_3.url;

  // ✅ Placeholders للصور
  const placeholderOne = LuciaImage.Image_1.placeholder;
  const placeholderTwo = LuciaImage.Image_2.placeholder;
  const placeholderThree = LuciaImage.Image_3.placeholder;

  const mobileSlides = [
    {
      src: ImageOne,
      viewerImg: ImageViewerOne,
      alt: LuciaImage.Image_1.alt,
      sizes: LuciaImage.Image_1.size,
      placeholder: placeholderOne,
      className: "object-cover [object-position:50%_center]",
    },
    {
      src: ImageThree,
      viewerImg: ImageViewerThree,
      alt: LuciaImage.Image_1.alt,
      sizes: LuciaImage.Image_1.size,
      placeholder: placeholderThree,
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
      className="relative z-10 flex flex-col md:grid grid-gallary mt-[200vh] gap-3 md:gap-5"
    >
      <div
        ref={moveingColumRef}
        className=" col-[main-start/mid] hidden md:grid sup-grid-gallary gap-y-5 mg:pt-25 lg:pt-40 "
      >
        <div className=" aspect-[1/1] relative max-w-full h-auto overflow-hidden col-span-full">
          <ImageModal
            src={ImageOne}
            viewerImg={ImageViewerOne}
            alt={LuciaImage.Image_1.alt}
            sizes={LuciaImage.Image_1.size}
            placeholder={placeholderOne}
            className="object-cover [object-position:80%_center]"
            ButtonStyle="w-full h-full"
            priority
          />
        </div>
        <div className="relative h-auto max-w-full aspect-[9/16] overflow-hidden col-start-6 col-span-full">
          <ImageModal
            src={ImageThree}
            viewerImg={ImageViewerThree}
            alt={LuciaImage.Image_3.alt}
            sizes={LuciaImage.Image_3.size}
            placeholder={placeholderThree}
            className="object-cover [object-position:65%_center]"
            ButtonStyle="h-full w-full"
          />
        </div>
      </div>

      <div className=" col-[mid/content-end] grid sup-grid-gallary gap-5 md:gap-10 ">
        <h1 className="text-yellow font-long uppercase char-font-size text-wrap md:text-nowrap leading-[100%] col-start-3 col-span-full ">
          Lucia Caminos
        </h1>
        <div className="flex flex-col gap-5 xl:gap-10 items-start justify-start col-start-3 col-end-11">
          <h2 className="text-pink char-h2-font-size font-round font-bold l leading-[105%] text-balance">
            Lucia’s father taught her to fight as soon as she could walk.
          </h2>
          <p className="text-white char-p-font-size font-round font-black leading-[105%] text-balance text-left">
            Life has been coming at her swinging ever since. Fighting for her
            family landed her in the Leonida Penitentiary. Sheer luck got her
            out. Lucia’s learned her lesson — only smart moves from here.
          </p>
        </div>
        <div className="relative max-w-full h-auto overflow-hidden aspect-[1/1] col-span-full">
          <ImageModal
            src={ImageTwo}
            viewerImg={ImageViewerTwo}
            alt={LuciaImage.Image_2.alt}
            sizes={LuciaImage.Image_2.size}
            placeholder={placeholderTwo}
            className="object-cover [object-position:65%_center]"
            ButtonStyle="h-full w-full"
          />
        </div>
        <p className="text-white char-p-font-size font-round font-black leading-[105%] text-balance text-left col-start-3 col-end-10">
          More than anything, Lucia wants the good life her mom has dreamed of
          since their days in Liberty City — but instead of half-baked
          fantasies, Lucia is prepared to take matters into her own hands.
        </p>
      </div>
      <div ref={fadeImageRef} className="md:hidden flex flex-col gap-2">
        <MobileCarousel slides={mobileSlides} />
      </div>
    </section>
  );
};

export default LuciaContent_1;
