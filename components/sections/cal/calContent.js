"use client";

import { useRef } from "react";
import { CalImage } from "@/constants/assest";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";

import ImageModel from "@/components/ui/ImageModel";
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

  const {
    desktop: calDesktop,
    mobile: calMobile,
  } = getAssetIds("Cal_Hampton_mnncgn");
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


  useVideoSideCharAnimation(
    { sectionRef, rightSideRef, leftSideRef, textRef, bgOverlayRef,videoOverlayRef, FirstVideoRef, videoRef, canvasRef },
    videoSrc,
  )
 
  return (
    <section
      ref={sectionRef}
      className="relative z-10 cal-gallary gap-x-5 -mt-[20vh] items-start pb-[30vh]"
    >
      <div
        className="fixed inset-0 w-full h-full bg-black/70  pointer-events-none"
        style={{ opacity: 0 }}
        ref={bgOverlayRef}
        data-overlay="bg-overlay"
      />

      <div className="col-[main-start/mid] self-auto">
        <div
          ref={leftSideRef}
          className="grid grid-cols-7 gap-5 md:pt-25 xl:pt-30 "
        >
          <div className="relative w-full h-auto aspect-[1/1] overflow-hidden col-[3/8] img-fade">
            <ImageModel
              src={ImageTwo}
              viewerImg={ImageViewerTwo}
              alt={CalImage.Image_1.alt}
              sizes={CalImage.Image_1.size}
              placeholder={placeholderTwo}
              className="object-cover [object-position:50%_center]"
              ButtonStyle="w-full h-full "
            />
          </div>
          <div
            data-background="cal-video"
            ref={FirstVideoRef}
            className="col-[1/8] video-overlay h-auto w-full aspect-square "
          >
            <AnimatedVideoSection
              videoRef={videoRef}
              posterUrl={posterUrl}
              posterMobile={posterMobile}
              videoSrc={videoSrc}
              canvasRef={canvasRef}
              videoClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
              posterClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
              canvasClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
              videoAlt="Video showing Jason Duval in various scenes"
              imgAlt="Poster image for video showing Jason Duval in various scenes"
            />
            <div
              className="absolute inset-0 w-full h-full bg-gta-dark-blue/90 z-50 pointer-events-none"
              style={{ opacity: 0 }}
              ref={videoOverlayRef}
            />
          </div>
          <div className="relative w-full h-auto aspect-[9/16] overflow-hidden col-[4/8] img-fade">
            <ImageModel
              src={ImageThree}
              viewerImg={ImageViewerThree}
              alt={CalImage.Image_1.alt}
              sizes={CalImage.Image_1.size}
              placeholder={placeholderThree}
              className="object-cover [object-position:50%_center]"
              ButtonStyle="w-full h-full "
            />
          </div>
        </div>
      </div>

      <div ref={rightSideRef} className="col-[mid/main-end] self-auto">
        <div className="grid grid-cols-8 gap-5">
          <div className="relative max-w-full h-auto aspect-square overflow-hidden col-[1/9] img-fade">
            <ImageModel
              src={ImageOne}
              viewerImg={ImageViewerOne}
              alt={CalImage.Image_2.alt}
              sizes={CalImage.Image_2.size}
              placeholder={placeholderOne}
              className="object-cover [object-position:100%_center] "
              ButtonStyle="w-full h-full "
            />
          </div>
          <div
            ref={textRef}
            className="col-[2/7] cal-text text-gta-yellow  xl:pt-200 pb-50"
          >
            <q
              cite="Cal Hampton"
              className="font-long  font-black text-4xl md:text-5xl xl:text-[5.1rem] leading-tight md:leading-tight xl:leading-16 uppercase text-balance"
            >
              There are way too many birds flying around in perfect formation.
            </q>
          </div>
          <div className="relative max-w-full h-auto aspect-[1/1] overflow-hidden col-[1/6] img-fade">
            <ImageModel
              src={ImageFour}
              viewerImg={ImageViewerFour}
              alt={CalImage.Image_2.alt}
              sizes={CalImage.Image_2.size}
              placeholder={placeholderFour}
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
              priority
            />
          </div>
          <div className="col-[2/6] cal-text-2 pt-30  ">
            <q className="text-[2.3rem] leading-10 font-black text-gta-blue ">
              The psychopaths are in charge. Get used to it.
            </q>
            <p className="text-xl font-black leading-tight text-gta-yellow mt-5">
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
