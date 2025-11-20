"use client";

import { useRef } from "react";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useVideoQuoteAnimation } from "@/hooks/animation/useVideoQuoteAnimation";

function JasonVideo() {
  const containerRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo(
    "Jason_Duval_2_so4cun",
    {
      eager: true,
    }
  );

  useVideoQuoteAnimation(
    { containerRef, videoRef, canvasRef, quoteRef, videoOverlayRef },
    videoSrc,
    { videoStart: 0, videoEnd: 0.45 }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-lvh -mt-[50vh] overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh "
      >
        <AnimatedVideoSection
          videoRef={videoRef}
          posterUrl={posterUrl}
          videoSrc={videoSrc}
          canvasRef={canvasRef}
          videoClassName=" object-cover [object-position:70%_center] md:[object-position:55%_center] "
          posterClassName="object-cover [object-position:70%_center] md:[object-position:55%_center]"
          canvasClassName="object-cover [object-position:70%_center] md:[object-position:55%_center]"
          videoAlt="Video showing Jason Duval in various scenes"
          imgAlt="Poster image for video showing Jason Duval in various scenes"
        />
      </div>

      <div
        ref={quoteRef}
        className="absolute inset-0 z-10 flex items-end justify-start h-lvh w-full pl-10 pb-20 md:p-20 lg:p-25 "
      >
        <q className="text-gta-yellow text-3xl md:text-6xl lg:text-7xl xl:text-[4.8rem] text-nowrap font-long font-bold uppercase drop-shadow-lg">
          If anything happens,
          <br />
          <span className="inline-block pl-[1.4ch] ">
            I&apos;m right behind you.
          </span>
        </q>
      </div>
    </section>
  );
}

export default JasonVideo;
