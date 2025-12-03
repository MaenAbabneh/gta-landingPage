"use client";

import { useRef } from "react";
import { CalImage } from "@/constants/assest";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";

import ImageModel from "@/components/ui/ImageModel";
import MobileCarousel from "@/components/ui/mobileCarousel";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { getAssetIds } from "@/constants/assest";

import { useVideoSideCharAnimation } from "@/hooks/animation/useVideoSideCharAnimetion";

function CalContent() {
  const sectionRef = useRef(null);
  const rightSideRef = useRef(null);
  const leftSideRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { desktop: calDesktop, mobile: calMobile } =
    getAssetIds("Cal_Hampton_mnncgn");
  const {
    videoUrl: videoSrc,
    posterUrl,
    posterMobile,
  } = useLazyVideo(
    {
      desktop: calDesktop || "Cal_Hampton_mnncgn",
      mobile: calMobile || "Cal_Hampton_mobile_eo0dgu",
    },
    {
      eager: true,
    }
  );

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = CalImage.Image_1.url;
  const ImageTwo = CalImage.Image_4.url;
  const ImageThree = CalImage.Image_2.url;
  const ImageFour = CalImage.Image_3.url;

  const ImageViewerOne = CalImage.Viwer_1.url;
  const ImageViewerTwo = CalImage.Viwer_4.url;
  const ImageViewerThree = CalImage.Viwer_2.url;
  const ImageViewerFour = CalImage.Viwer_3.url;

  // ✅ Placeholders للصور
  const placeholderOne = CalImage.Image_1.placeholder;
  const placeholderTwo = CalImage.Image_4.placeholder;
  const placeholderThree = CalImage.Image_2.placeholder;
  const placeholderFour = CalImage.Image_3.placeholder;

  const mobileSlides = [
    {
      src: ImageFour,
      viewerImg: ImageViewerFour,
      alt: CalImage.Image_2.alt,
      sizes: CalImage.Image_2.size,
      placeholder: placeholderFour,
      className: "object-cover [object-position:30%_center]",
    },
    {
      src: ImageTwo,
      viewerImg: ImageViewerTwo,
      alt: CalImage.Image_1.alt,
      sizes: CalImage.Image_1.size,
      placeholder: placeholderTwo,
      className: "object-cover [object-position:50%_center]",
    },
    {
      src: ImageThree,
      viewerImg: ImageViewerThree,
      alt: CalImage.Image_1.alt,
      sizes: CalImage.Image_1.size,
      placeholder: placeholderThree,
      className: "object-cover [object-position:50%_center]",
    },
  ];

  useVideoSideCharAnimation(
    {
      sectionRef,
      rightSideRef,
      leftSideRef,
      textRef,
      bgOverlayRef,
      videoOverlayRef,
      FirstVideoRef,
      videoRef,
      canvasRef,
    },
    videoSrc
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-col md:grid grid-gallary gap-x-5 -mt-[10vh] md:-mt-[20vh] pb-[30vh] items-start "
    >
      <div
        className="fixed inset-0 w-full h-full bg-black/70  pointer-events-none"
        style={{ opacity: 0 }}
        ref={bgOverlayRef}
        data-overlay="bg-overlay"
      />

      <div className="md:hidden w-dvw flex flex-col gap-2 mb-6  ">
        <div className="relative max-w-full h-auto aspect-square overflow-hidden p-2 img-fade">
          <ImageModel
            src={ImageOne}
            viewerImg={ImageViewerOne}
            alt={CalImage.Image_2.alt}
            sizes={CalImage.Image_2.size}
            placeholder={placeholderOne}
            className="object-cover [object-position:100%_center] "
            ButtonStyle="w-full h-full "
            iscal={true}
          />
        </div>
        <div className="md:hidden flex flex-col gap-2 img-fade">
          <MobileCarousel slides={mobileSlides} />
        </div>
      </div>

      <div className="col-[main-start/mid] w-dvw md:w-full self-auto">
        <div
          ref={leftSideRef}
          className="grid grid-cols-7 gap-5  md:pt-25 xl:pt-30 "
        >
          <div className="relative hidden md:flex max-w-full h-auto aspect-[1/1] overflow-hidden col-[3/8] img-fade">
            <ImageModel
              src={ImageTwo}
              viewerImg={ImageViewerTwo}
              alt={CalImage.Image_1.alt}
              sizes={CalImage.Image_1.size}
              placeholder={placeholderTwo}
              className="object-cover [object-position:50%_center]"
              ButtonStyle="w-full h-full "
              iscal={true}
            />
          </div>
          <div
            data-background="cal-video"
            ref={FirstVideoRef}
            className="col-[1/8] p-2 md:p-0 h-auto w-full  aspect-square box-border  overflow-hidden"
          >
            <div className="video-overlay relative w-full h-full">
              <AnimatedVideoSection
                videoRef={videoRef}
                posterUrl={posterUrl}
                posterMobile={posterMobile}
                videoSrc={videoSrc}
                canvasRef={canvasRef}
                videoClassName="object-contain  [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
                posterClassName="object-contain  [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
                canvasClassName="object-contain  [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
                videoAlt="Video showing Jason Duval in various scenes"
                imgAlt="Poster image for video showing Jason Duval in various scenes"
              />
              <div
                className="absolute inset-0  w-full h-full bg-gta-dark-blue/90 z-50 pointer-events-none"
                style={{ opacity: 0 }}
                ref={videoOverlayRef}
              />
            </div>
          </div>
          <div className="relative hidden md:flex max-w-full h-auto aspect-[9/16] overflow-hidden col-[4/8] img-fade">
            <ImageModel
              src={ImageThree}
              viewerImg={ImageViewerThree}
              alt={CalImage.Image_1.alt}
              sizes={CalImage.Image_1.size}
              placeholder={placeholderThree}
              className="object-cover [object-position:50%_center]"
              ButtonStyle="w-full h-full "
              iscal={true}
            />
          </div>
        </div>
      </div>

      <div
        ref={rightSideRef}
        className="col-[mid/main-end] w-dvw md:w-full self-auto"
      >
        <div className="grid sup-grid-gallary gap-3 xl:gap-5">
          <div className="relative hidden md:flex max-w-full h-auto aspect-square overflow-hidden col-span-full img-fade">
            <ImageModel
              src={ImageOne}
              viewerImg={ImageViewerOne}
              alt={CalImage.Image_2.alt}
              sizes={CalImage.Image_2.size}
              placeholder={placeholderOne}
              className="object-cover [object-position:100%_center] "
              ButtonStyle="w-full h-full "
              iscal={true}
            />
          </div>
          <div
            ref={textRef}
            className="col-start-3 md:col-start-2 col-span-full col-end-12 qoute-text-edite text-gta-yellow pt-10  md:pt-170 lg:pt-230 xl:pt-200 md:pb-50"
          >
            <q
              cite="Cal Hampton"
              className="font-long font-black text-[clamp(40px,5vw,90px)] leading-[1] uppercase text-balance"
            >
              There are way too many birds flying around in perfect formation.
            </q>
          </div>
          <div className="relative hidden md:flex max-w-full h-auto aspect-[1/1] overflow-hidden col-span-full col-end-10 img-fade">
            <ImageModel
              src={ImageFour}
              viewerImg={ImageViewerFour}
              alt={CalImage.Image_2.alt}
              sizes={CalImage.Image_2.size}
              placeholder={placeholderFour}
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
              iscal={true}
            />
          </div>
          <div className="col-start-1 col-end-12 md:col-start-3 md:col-end-9  qoute-text-edite-2 mx-20 md:mx-0 pt-30  ">
            <q className="char-h2-font-size font-round font-bold l leading-[105%] text-balance text-gta-blue ">
              The psychopaths are in charge. Get used to it.
            </q>
            <p className="text-white char-p-font-size font-round font-black leading-[105%] text-balance text-left mt-6">
              Cal is at the low tide of America and happy there. Casual paranoia
              loves company, but his friend Jason has bigger plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalContent;
