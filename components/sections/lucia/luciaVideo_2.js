"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { getAssetIds } from "@/constants/assest";
import { useVideoQuoteAnimation } from "@/hooks/animation/useVideoQuoteAnimation";
import { useLazyVideo } from "@/hooks/useLazyVideo";

function LuciaVideo_2() {
  const containerRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const {
    desktop: lucia2Desktop,
    mobile: lucia2Mobile,
    poster: lucia2Poster,
    posterMobile: lucia2PosterMobile,
  } = getAssetIds("Lucai_Caminos_2_rqqw1q");
  const {
    videoUrl: videoSrc,
    posterUrl,
    posterMobile,
  } = useLazyVideo(
    {
      desktop: lucia2Desktop || "Lucai_Caminos_2_rqqw1q",
      mobile: lucia2Mobile || "Lucia_Caminos_mobile_2_qa9spk",
    },
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
          posterMobile={posterMobile}
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
        className="absolute inset-0 z-10 flex items-end justify-start h-lvh w-full pb-10 pl-[17vw] md:pb-20 md:pl-[clamp(8vw,13vw,18vw)] qoute-text-edite"
      >
        <q className="text-gta-yellow text-[clamp(1.5rem,5vw,5rem)] leading-[1] font-long font-bold uppercase drop-shadow-lg">
          The only thing that matters is
          <br />
          who you know and what you got.
        </q>
      </div>
    </section>
  );
}

export default LuciaVideo_2;
