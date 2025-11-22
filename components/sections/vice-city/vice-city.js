"use client";

import { useRef, useState } from "react";
import { getAssetIds } from "@/constants/assest";

import Image from "next/image";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { useVideoPlaceAnimation } from "@/hooks/animation/useVideoPlaceAnimtion";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import Overlay_ViceCity from "./overlay-viceCity";
import { VisitLeonied } from "@/components/ui/svg";

function ViceCity() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const sectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const headRef = useRef(null);

  const { desktop: viceDesktop, mobile: viceMobile } =
    getAssetIds("Vice_City_tazkqo");
  const {
    videoUrl: videoSrc,
    posterUrl,
    posterMobile,
  } = useLazyVideo(
    {
      desktop: viceDesktop || "Vice_City_tazkqo",
      mobile: viceMobile || "vice_City_mobile_tugsol",
    },
    {
      eager: true,
    }
  );

  useVideoPlaceAnimation(
    { sectionRef, videoRef, canvasRef, bgRef, headRef },
    videoSrc
  );

  return (
    <div ref={sectionRef} className="min-h-dvh w-full pb-20 overflow-hidden">
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full vicecity-bg pointer-events-none -z-10"
        style={{ opacity: 0 }}
      />
      <div className="cal-gallary gap-5 md:gap-10 h-full">
        <div
          ref={headRef}
          className="col-[content-start/content-end] flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10"
        >
          <VisitLeonied className="w-[40vw] md:w-[20vw]" />
          <p className="text-balance text-center md:text-start md:max-w-70 text-sm md:text-2xl font-black font-round text-gta-white">
            Tour a few of the must-see destinations across the sunshine state.
          </p>
        </div>
        <button
          id="viceCity-button"
          onClick={() => setIsOverlayOpen(true)}
          ref={videoOverlayRef}
          aria-label="open vice-city map overlay"
          className=" col-[content-start/content-end] aspect-[3/2] relative group shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_100px_10px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out cursor-pointer  "
        >
          <div className="relative w-full h-full overflow-hidden scale-100 rotate-0 group-hover:scale-[1.015] group-hover:rotate-[0.5deg] transition-transform duration-500 ease-in-out">
            {/* الفيديو والكانفاس في div منفصل */}
            <div className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0 ease-in-out">
              {/* الفيديو */}
              <AnimatedVideoSection
                videoRef={videoRef}
                posterUrl={posterUrl}
                posterMobile={posterMobile}
                videoSrc={videoSrc}
                canvasRef={canvasRef}
                videoClassName=" object-cover"
                posterClassName="object-cover"
                canvasClassName="object-cover"
                videoAlt="Video showing Jason Duval in various scenes"
                imgAlt="Poster image for video showing Jason Duval in various scenes"
              />
            </div>

            {/* الصورة فوق الفيديو */}
            <div className="absolute inset-0 max-w-full h-auto z-10">
              <Image
                src="/images/Place/vice-city/overlay.webp"
                alt="Vice City"
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 rounded-full button-vicecity  group-hover:scale-[1.0195] group-hover:bg-gta-yellow transition-transform duration-500 flex items-center justify-center bg-gta-white font-semibold font-round z-10 ease-in-out">
            Explore Vice City
          </div>
        </button>
      </div>
      <Overlay_ViceCity
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
}

export default ViceCity;
