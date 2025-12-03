"use client";

import { useRef } from "react";

import { JasonImage } from "@/constants/assest";
import {useContentAnimetion} from "@/hooks/animation/useContentAnimetion";

import ImageModal from "@/components/ui/ImageModel";
import MobileCarousel from "@/components/ui/mobileCarousel";


const JasonContent_1 = () => {
  const containerRef = useRef(null);
  const moveingColumRef = useRef(null);
  const fadeImageRef = useRef(null);

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = JasonImage.Image_1.url;
  const ImageTwo = JasonImage.Image_2.url;
  const ImageThree = JasonImage.Image_3.url;

  const ImageViewerOne = JasonImage.Viwer_1.url;
  const ImageViewerTwo = JasonImage.Viwer_2.url;
  const ImageViewerThree = JasonImage.Viwer_3.url;

  // ✅ Placeholders للصور
  const placeholderOne = JasonImage.Image_1.placeholder;
  const placeholderTwo = JasonImage.Image_2.placeholder;
  const placeholderThree = JasonImage.Image_3.placeholder;

  const mobileSlides = [
    {
      src: ImageTwo,
      viewerImg: ImageViewerTwo,
      alt: JasonImage.Image_1.alt,
      sizes: JasonImage.Image_1.size,
      placeholder: placeholderTwo,
      className: "object-cover [object-position:50%_center]",
    },
    {
      src: ImageThree,
      viewerImg: ImageViewerThree,
      alt: JasonImage.Image_1.alt,
      sizes: JasonImage.Image_1.size,
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
      className="relative z-10 mt-[200vh] flex flex-col md:grid grid-gallary md:gap-3 xl:gap-5"
    >
      <div className="col-[content-start/mid] grid sup-grid-gallary">
        <h1 className="text-yellow font-long uppercase char-font-size text-wrap md:text-nowrap leading-[100%] col-start-3 md:col-start-4 col-span-full ">
          Jason Duval
        </h1>
        <div className="flex flex-col gap-5 xl:gap-10 items-start justify-start col-start-3 col-end-11 md:col-start-4 md:col-end-11 mb-10 md:mt-5 xl:mb-23">
          <h2 className="text-pink char-h2-font-size font-round font-bold l leading-[105%] text-balance">
            Jason wants an easy life, but things just keep getting harder.
          </h2>
          <p className="text-white char-p-font-size font-round font-black leading-[105%] text-balance text-left">
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </p>
        </div>
        <div className="relative p-2 md:p-0 aspect-square md:aspect-[9/16] max-w-full h-auto md:col-start-4 col-span-full overflow-hidden ">
          <ImageModal
            src={ImageOne}
            viewerImg={ImageViewerOne}
            alt={JasonImage.Image_1.alt}
            sizes={JasonImage.Image_1.size}
            placeholder={placeholderOne}
            className="object-cover [object-position:80%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>

      <div ref={fadeImageRef} className="md:hidden flex flex-col gap-2">
        <MobileCarousel slides={mobileSlides} />
      </div>

      <div
        ref={moveingColumRef}
        className="col-[mid/main-end] hidden  md:grid sup-grid-gallary gap-3 xl:gap-5 md:pt-15"
      >
        <div className="relative max-w-full h-auto aspect-square overflow-hidden col-span-full ">
          <ImageModal
            src={ImageTwo}
            viewerImg={ImageViewerTwo}
            alt={JasonImage.Image_2.alt}
            sizes={JasonImage.Image_2.size}
            placeholder={placeholderTwo}
            className="object-cover [object-position:5%_center]"
            ButtonStyle="h-full w-full "
          />
        </div>
        <div className="relative max-w-full h-auto aspect-square overflow-hidden col-span-full col-end-8 ">
          <ImageModal
            src={ImageThree}
            viewerImg={ImageViewerThree}
            alt={JasonImage.Image_3.alt}
            sizes={JasonImage.Image_3.size}
            placeholder={placeholderThree}
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
