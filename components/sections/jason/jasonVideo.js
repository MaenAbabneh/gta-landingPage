"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useVideoQuoteAnimation } from "@/hooks/animation/useVideoQuoteAnimation";
import { useLazyVideo } from "@/hooks/useLazyVideo";

function JasonVideo() {
  const containerRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo(
    "Jason_Duval_2_i1i3s6",
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
      className="relative w-full h-lvh mt-[50vh] overflow-hidden "
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
        className="absolute inset-0 z-10 flex items-end justify-start h-lvh w-full pb-10 pl-[17vw] md:pb-20 md:pl-[clamp(8vw,13vw,18vw)] qoute-text-edite "
      >
        <q className="text-gta-yellow text-[clamp(1.5rem,5vw,5rem)]  qoute-text-edite leading-[1] font-long font-bold uppercase drop-shadow-lg">
          If anything happens,
          <br />
          I&apos;m right behind you.
        </q>
      </div>
    </section>
  );
}

export default JasonVideo;
