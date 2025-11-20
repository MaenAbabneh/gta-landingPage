"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useVideoQuoteAnimation } from "@/hooks/animation/useVideoQuoteAnimation";

import { useLazyVideo } from "@/hooks/useLazyVideo";

function LuciaVideo_2() {
  const containerRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo(
    "Lucai_Caminos_2_rqqw1q",
    {
      eager: true,
    }
  );

  useVideoQuoteAnimation(
    { containerRef, videoRef, canvasRef, quoteRef, videoOverlayRef },
    videoSrc
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-lvh -mt-[50vh] overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute z-0 inset-0 h-lvh overflow-hidden"
      >
        <AnimatedVideoSection
          videoRef={videoRef}
          posterUrl={posterUrl}
          videoSrc={videoSrc}
          canvasRef={canvasRef}
          videoClassName=" object-cover [object-position:70%_center] lg:[object-position:60%_center]"
          posterClassName="object-cover [object-position:70%_center] lg:[object-position:60%_center]"
          canvasClassName="object-cover [object-position:70%_center] lg:[object-position:60%_center]"
          videoAlt="Video showing Jason Duval in various scenes"
          imgAlt="Poster image for video showing Jason Duval in various scenes"
        />
      </div>

      <div
        ref={quoteRef}
        className="absolute inset-0 z-10 flex items-end justify-start text-center px-60 py-25 "
      >
        <q className="text-gta-yellow text-4xl md:text-[4.8rem] font-long font-bold uppercase leading-18 text-left">
          The only thing that matters is
          <br />
          <span className="inline-block ml-6 md:ml-8">
            who you know and what you got.
          </span>{" "}
        </q>
      </div>
    </section>
  );
}

export default LuciaVideo_2;
