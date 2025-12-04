"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { getAssetIds } from "@/constants/assest";
import { useVideoAnimation } from "@/hooks/animation/useVideoAnimation";
import { useLazyVideo } from "@/hooks/useLazyVideo";

function LuciaVideo() {
  const sectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const storytextRef = useRef(null); // إضافة

  const { desktop: lucia1Desktop, mobile: lucia1Mobile } = getAssetIds(
    "Lucia_Caminos_1_rlbk0h"
  );

  const {
    videoUrl: videoSrc,
    posterUrl,
    posterMobile,
  } = useLazyVideo(
    {
      desktop: lucia1Desktop || "Lucia_Caminos_1_rlbk0h",
      mobile: lucia1Mobile || "intro_mobile_tx8cql",
    },
    {
      eager: true,
    }
  );

  useVideoAnimation(
    { sectionRef, videoOverlayRef, videoRef, canvasRef, storytextRef },
    videoSrc,
    {
      videoStart: 0,
      videoEnd: 0.8,
      maskImages: {
        videoOverlay:
          "radial-gradient(circle at 50vw -50vh, rgb(0, 0, 0) 50vw, rgb(0, 0, 0) 100vw)",
        videoOverlay80:
          "radial-gradient(circle at 10vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
      },
      // sectionPinEnd: "bottom top-=500",
      isLucia: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-lvh -mt-[40vh] overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh"
      >
        <AnimatedVideoSection
          videoRef={videoRef}
          posterUrl={posterUrl}
          posterMobile={posterMobile}
          videoSrc={videoSrc}
          canvasRef={canvasRef}
          videoClassName=" object-cover [object-position:70%_center] md:[object-position:10%_center]"
          posterClassName="object-cover [object-position:70%_center] md:[object-position:10%_center]"
          canvasClassName="object-cover [object-position:70%_center] md:[object-position:10%_center]"
          videoAlt="Video showing Jason Duval in various scenes"
          imgAlt="Poster image for video showing Jason Duval in various scenes"
        />
      </div>
    </section>
  );
}

export default LuciaVideo;
