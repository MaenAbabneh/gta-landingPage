"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { useVideoAnimation } from "@/hooks/animation/useVideoAnimation";


function Outro() {
  const sectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const storytextRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo("outro_dy82ms", {
    eager: true,
  });
  useVideoAnimation(
    { sectionRef, videoOverlayRef, videoRef, canvasRef , storytextRef },
    videoSrc,
    {
      videoStart: 0,
      videoEnd: 0.8,
      marginTop: { desktop: "0vh", tablet: "0vh", mobile: "0vh" },
      sectionPinEnd: "bottom top-1000",
      isOutro: true,
    },
  );

  return (
    <section
      id="outro"
      ref={sectionRef}
      className="relative w-full h-lvh overflow-hidden"
    >
      <div ref={videoOverlayRef} className="h-lvh">
        <AnimatedVideoSection
          videoRef={videoRef}
          posterUrl={posterUrl}
          videoSrc={videoSrc}
          canvasRef={canvasRef}
          videoClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
          posterClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
          canvasClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
          videoAlt="Video showing Jason Duval in various scenes"
          imgAlt="Poster image for video showing Jason Duval in various scenes"
        />
      </div>
    </section>
  );
}

export default Outro;
