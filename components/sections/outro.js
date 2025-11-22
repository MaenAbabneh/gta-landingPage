"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { getAssetIds } from "@/constants/assest";
import { useVideoAnimation } from "@/hooks/animation/useVideoAnimation";


function Outro() {
  const sectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const storytextRef = useRef(null);

  const { desktop: outroDesktop, mobile: outroMobile } = getAssetIds("outro_dy82ms");
  const { videoUrl: videoSrc, posterUrl, posterMobile } = useLazyVideo({ desktop: outroDesktop || "outro_dy82ms", mobile: outroMobile || "Outro_mobile_pdesiw" }, {
    eager: true,
  });
  useVideoAnimation(
    { sectionRef, videoOverlayRef, videoRef, canvasRef , storytextRef },
    videoSrc,
    {
      videoStart: 0,
      videoEnd: 0.8,
      sectionPinEnd: "bottom top-1000",
      isOutro: true,
    },
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-lvh mt-[50vh] overflow-hidden"
    >
      <div ref={videoOverlayRef} className="h-lvh">
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
      </div>
    </div>
  );
}

export default Outro;
