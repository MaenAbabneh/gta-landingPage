"use client";

import { useRef } from "react";

import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { getAssetIds } from "@/constants/assest";
import { useVideoAnimation } from "@/hooks/animation/useVideoAnimation";
import { useLazyVideo } from "@/hooks/useLazyVideo";

function JasonIntro() {
  const sectionRef = useRef(null);
  const storytextRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { desktop: introDesktop, mobile: introMobile } =
    getAssetIds("intro_ff13rf");
  const {
    videoUrl: videoSrc,
    posterUrl,
    posterMobile,
  } = useLazyVideo(
    {
      desktop: introDesktop || "intro_ff13rf",
      mobile: introMobile || "Lucia_Caminos_mobile_rkbhmx",
    },
    {
      eager: true,
    }
  );

  // Run the video animation and apply brightness/blur filters (only for this section)
  // Add filter config so brightness/blur apply only to this section
  useVideoAnimation(
    { sectionRef, storytextRef, videoOverlayRef, videoRef, canvasRef },
    videoSrc,
    {
      filters: {
        videoOverlay: "brightness(0.2) blur(100px)",
        videoOverlayIn: "brightness(0.6) blur(100px)",
        videoOverlayOut: "brightness(1) blur(0px)",
      },
      isJason: true,
    }
  );

  return (
    <section
      id="jason-intro"
      ref={sectionRef}
      className="relative w-full h-lvh -mt-[100vh] overflow-hidden "
    >
      <div className=" absolute z-2 inset-0 flex items-center justify-start bg-transparent">
        <div
          ref={storytextRef}
          className="flex flex-col items-start justify-start story-margin gradient-text"
        >
          <h3 className="story-heading-size font-round font-black text-transparent text-nowrap">
            Vice City, USA.
          </h3>
          <p className=" story-text-size font-round font-bold text-transparent text-pretty leading-5 md:leading-[110%] ">
            Jason and Lucia have always known the deck is stacked against them.
            But when an easy score goes wrong, they find themselves on the
            darkest side of the sunniest place in America, in the middle of a
            criminal conspiracy stretching across the state of Leonida — forced
            to rely on each other more than ever if they want to make it out
            alive.
          </p>
        </div>
      </div>

      <div
        ref={videoOverlayRef}
        className="absolute z-0 inset-0 overflow-hidden "
      >
        <div className="h-lvh">
          <AnimatedVideoSection
            videoRef={videoRef}
            posterUrl={posterUrl}
            posterMobile={posterMobile}
            videoSrc={videoSrc}
            canvasRef={canvasRef}
            videoClassName=" object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center] "
            posterClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
            canvasClassName="object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center]"
            videoAlt="Jason embracing Lucia while looking into the distance."
            imgAlt="Jason embracing Lucia while looking into the distance."
          />
        </div>
      </div>
    </section>
  );
}

export default JasonIntro;
