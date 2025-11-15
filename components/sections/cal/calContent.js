"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CalImage } from "@/constants/assest";
import ImageModel from "@/components/ImageModel";
import { useLazyVideo } from "@/hooks/useLazyVideo";

gsap.registerPlugin(ScrollTrigger);

function CalContent() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);
  const leftImageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const textRef = useRef(null);

  const {
    videoUrl: videoSrc,
    posterUrl,
    containerRef,
  } = useLazyVideo("Cal_Hampton_mnncgn", {
    eager: true,
  });

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

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video) return;

      const context = canvas.getContext("2d");
      if (!canvas || !context) return;

      gsap.set([FirstVideoRef.current, canvasRef.current, videoRef.current], {
        willChange: "transform, opacity, filter",
        force3D: true,
      });

      gsap.set(PartTwoRef.current, { marginTop: "-20vh" });
      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // الحصول على عنصر الـ overlay
        const bgoverlay = PartTwoRef.current.querySelector(
          '[data-overlay="bg-overlay"]'
        );
        const overlay = FirstVideoRef.current.querySelector(
          '[data-overlay="video-overlay"]'
        );

        // تايملاين السكشن لتحريك العمود لِلأعلى بدون التأثير على التثبيت
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: PartTwoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            ease: "none",
            invalidateOnRefresh: true, // أعد حساب المواقع/القيم عند أي refresh
            anticipatePin: 1,
            // markers: true,
          },
        });

        // حرك محتوى العمود فقط: الصورة + طبقة حركة الفيديو
        tl.to(rightSideRef.current, { y: 150, ease: "none" }, 0);

        const videoST = ScrollTrigger.create({
          trigger: FirstVideoRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
          pin: leftImageRef.current,
          invalidateOnRefresh: true, // أعد حساب المواقع/القيم عند أي refresh
          ease: "none",
          // markers: true,
          onUpdate: (self) => {
            if (video.duration) {
              const newTime = self.progress * video.duration;
              if (Math.abs(newTime - video.currentTime) > 0.05) {
                video.currentTime = newTime;
              }
            }
          },
        });

        gsap.set(overlay, { opacity: 1 });
        gsap.set([bgoverlay, textRef.current], { opacity: 0 });
        gsap.set(".img-fade", { opacity: 1 });
        const overlayTL = gsap.timeline({
          scrollTrigger: {
            trigger: FirstVideoRef.current,
            start: "top-=800 bottom", // يبدأ قبل ظهور الفيديو بـ800px (أبكر بكثير)
            end: "bottom top", // ينتهي عند خروج الفيديو من التثبيت مباشرة
            scrub: true,
            ease: "none",
            // markers: true,
          },
        });

        // ظهور الخلفية (من البداية حتى بداية التثبيت)
        overlayTL.to(
          overlay,
          {
            opacity: 0,
            ease: "none",
          },
          0
        );
        overlayTL.to(
          bgoverlay,
          {
            opacity: 1,
            ease: "none",
          },
          0
        );
        overlayTL.to(
          ".img-fade",
          {
            opacity: 0,
            duration: 0.3,
          },
          0.17
        );

        // اختفاء الخلفية (بعد نهاية التثبيت)
        overlayTL.to(
          overlay,
          {
            opacity: 1,
            ease: "none",
          },
          0.8
        ); // يبدأ الاختفاء في 80% من المسافة الكلية (أبكر)
        overlayTL.to(
          bgoverlay,
          {
            opacity: 0,
            ease: "none",
          },
          0.8
        );
        overlayTL.to(
          textRef.current,
          {
            opacity: 1,
          },
          0.5
        );
        overlayTL.to(
          ".img-fade",
          {
            opacity: 1,
            duration: 0.3,
          },
          0.8
        );

        const draw = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        };
        gsap.ticker.add(draw);

        return () => {
          gsap.ticker.remove(draw);
          videoST.kill();
          overlayTL.scrollTrigger?.kill();
          overlayTL.kill();
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const waitForVideo = () => {
        if (video.readyState >= 1 && video.duration) {
          setupAnimation();
        } else {
          video.addEventListener(
            "loadedmetadata",
            () => {
              setupAnimation();
            },
            { once: true }
          );
        }
      };

      const timer = setTimeout(waitForVideo, 100);

      return () => {
        clearTimeout(timer);
      };
    },
    {
      scope: PartTwoRef,
      dependencies: [videoSrc],
    }
  );
  return (
    <section
      ref={PartTwoRef}
      className="relative z-10 cal-gallary gap-x-5 items-start pb-[30vh]"
    >
      <div
        className="fixed inset-0 w-full h-full bg-black/70  pointer-events-none"
        style={{ opacity: 0 }}
        data-overlay="bg-overlay"
      />

      <div className="col-[main-start/mid] self-auto">
        <div
          ref={leftImageRef}
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
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterUrl}
              preload="metadata"
              playsInline
              muted
              crossOrigin="anonymous"
              aria-label="Jason embracing Lucia while looking into the distance."
              className="absolute inset-0 w-full h-full object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]  z-2 overflow-clip"
            />

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]  z-1 overflow-clip"
            />

            <div
              className="absolute inset-0 w-full h-full bg-gta-dark-blue/90 z-[3] pointer-events-none"
              style={{ opacity: 0 }}
              data-overlay="video-overlay"
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
              priority
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
          <div className="col-[2/6] cal-text-2 pt-20  ">
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
