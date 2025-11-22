"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { gtaData } from "@/constants/Links";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useYoutubeVideo } from "@/hooks/useYotubeVideo";

function TrailerOverlay({ isOpen, onClose, isOpenfalse }) {
  const overlaybgRef = useRef(null);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const Defult_video_ID = gtaData.Trailers.find(
    (trailer) => trailer.isNew
  )?.video_ID;

  const initialVideoID = useMemo(() => {
    return Defult_video_ID || "";
  }, [Defult_video_ID]);

  const [videoID, setVideoID] = useState(initialVideoID);

  if (isOpen && videoID !== initialVideoID) {
    setVideoID(initialVideoID);
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const { requestLock, releaseLock } = useScrollLockContext();
  useEffect(() => {
    if (isMounted) {
      requestLock();
      return () => {
        releaseLock();
      };
    }
    return undefined;
  }, [isMounted, requestLock, releaseLock]);

  const cleanVideoID = videoID ? videoID.split("?")[0] : "";

  const { isReady } = useYoutubeVideo(
    "youtube-player",
    cleanVideoID,
    isMounted
  );

  useGSAP(
    () => {
      if (!overlaybgRef.current || !buttonRef.current || !videoRef.current)
        return;

      if (isOpen) {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
        });

        // ✅ تحسين: استخدام will-change للأداء
        gsap.set("#hero", { willChange: "transform" });
        gsap.set([overlaybgRef.current, buttonRef.current, videoRef.current], {
          willChange: "transform, opacity",
        });

        // تكبير Hero بسرعة أكبر على الموبايل
        tl.to(
          "#hero",
          {
            scale: 1.25,
            duration: 0.5, // ✅ كان 0.8 - الآن أسرع
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }, // ✅ كان 0.5 - الآن أسرع
          0
        ).fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }, // ✅ كان 0.4 - الآن أسرع
          "<"
        );

        // ✅ تحسين: استخدام transform بدلاً من y لأداء أفضل
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, y: 500 }, // ✅ كان 1000 - مبالغ فيه
          { opacity: 1, y: 0, duration: 0.5 }, // ✅ كان 0.7 - الآن أسرع
          "<"
        );

        // ✅ إزالة will-change بعد الانتهاء لتوفير الذاكرة
        tl.call(() => {
          gsap.set("#hero", { clearProps: "willChange" });
          gsap.set(
            [overlaybgRef.current, buttonRef.current, videoRef.current],
            {
              clearProps: "willChange",
            }
          );
        });
      } else if (!isOpen && isMounted) {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            setIsMounted(false);
          },
        });

        // إعادة #hero إلى الحجم الطبيعي بسرعة
        tl.to(
          "#hero",
          {
            scale: 1,
            duration: 0.25, // ✅ كان 0.3 - الآن أسرع
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.3 }, // ✅ كان 0.6 - الآن أسرع
          0
        )
          .fromTo(
            buttonRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.2 }, // ✅ كان 0.3 - الآن أسرع
            "<"
          )
          .fromTo(
            videoRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.3 }, // ✅ كان 0.5 - الآن أسرع
            "<"
          );
      }
    },
    { dependencies: [isOpen, isMounted] }
  );

  if (!isMounted) return null;

  return createPortal(
    <div
      id="trailers"
      className="fixed inset-0 z-[9998] p-2 sm:p-4 md:p-0 overflow-hidden"
    >
      {/* خلفية لإغلاق عند النقر */}
      <div
        ref={overlaybgRef}
        className="absolute inset-0 bg-gta-dark-slate"
        onClick={onClose}
      />

      <div
        ref={videoRef}
        className="relative flex flex-col max-w-6xl mx-auto w-full h-full max-h-[90vh] sm:max-h-[90vh] xl:max-h-[100vh] mt-25 sm:mt-16 md:mt-20  xl:mt-10 overflow-y-auto bg-gta-charcoal-black rounded-t-lg shadow-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <div className="w-full aspect-video flex-shrink-0 bg-black relative">
          {/* YouTube Player Container */}
          <div id="youtube-player" className="w-full h-full" />

          {/* Loading indicator */}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center text-gta-white bg-black/80">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-gta-pink border-t-transparent rounded-full animate-spin" />
                <p>Loading video...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row px-2 sm:px-4 pt-6 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 gap-4 sm:gap-3 md:gap-4">
          {gtaData.Trailers.map((trailer, index) => (
            <button
              key={trailer.video_ID || index}
              onClick={() => {
                setVideoID(trailer.video_ID);
                console.log("Selected trailer ID:", trailer.video_ID);
              }}
              className={`flex flex-col md:flex-row items-center justify-start md:justify-center w-full md:w-80 lg:w-90 group cursor-pointer`}
            >
              <div
                className={`relative w-50 sm:w-40 md:w-40 lg:w-50 h-30 sm:h-22 md:h-24 lg:h-32 flex-shrink-0 ${videoID === trailer.video_ID ? "border-2 sm:border-3 border-gray-400" : ""}`}
              >
                <Image
                  src={trailer.thumbnail || "/placeholder.svg"}
                  alt={trailer.title}
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 200px"
                  className="object-cover"
                />
                {/* أيقونة التشغيل */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-95">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-white border-t-[5px] sm:border-t-[6px] border-t-transparent border-b-[5px] sm:border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                {videoID === trailer.video_ID ? (
                  <p className="absolute bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 text-gta-white bg-black/60 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded">
                    Now Playing
                  </p>
                ) : (
                  <p className="absolute bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 text-gta-white bg-black/60 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded">
                    {trailer.duration}
                  </p>
                )}
              </div>

              <div
                className={`px-4 sm:px-3 md:px-4 lg:px-5 py-5 sm:py-2.5 md:py-3 text-gta-white flex flex-col justify-center transition-colors duration-300 group-hover:bg-white/10 ${videoID === trailer.video_ID ? "bg-white/5" : ""}`}
              >
                <h3 className="font-round font-semibold max-w-42 sm:max-w-36 md:max-w-40 text-start text-[14px] sm:text-base mb-0.5 sm:mb-1">
                  {trailer.title}
                </h3>
                <p className="font-round text-xs sm:text-sm text-start text-gray-400">
                  {trailer.date}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        className="absolute top-8 right-8 md:top-4 md:right-4 lg:right-6 lg:top-6 z-[9999] bg-gta-gray text-white rounded-full w-15 h-15 sm:w-12 sm:h-12 flex flex-col items-center justify-center hover:bg-gta-gray-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
        onClick={onClose}
        ref={buttonRef}
        aria-label="Close trailer"
      >
        <span className="absolute left-1/2 top-1/2 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gta-pink"></span>
        <span className="absolute left-1/2 top-1/2 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gta-pink"></span>
      </button>
    </div>,
    document.body
  );
}

export default TrailerOverlay;
