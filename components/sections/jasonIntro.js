"use client";

import { useRef } from "react";

import { useLazyVideo } from "@/hooks/useLazyVideo";
import { useIntroAnimation } from "@/hooks/animation/useIntroAnimation";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";

function JasonIntro() {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const storytextRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo("intro_ff13rf", {
    eager: true,
  });

  useIntroAnimation(
    { introRef, storytextRef, FirstVideoRef, videoRef, canvasRef },
    videoSrc
  );

  return (
    <section
      id="jason-intro"
      ref={introRef}
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={storyRef}
        className=" absolute z-2 inset-0 flex items-center justify-start bg-transparent"
      >
        <div
          ref={storytextRef}
          className="flex flex-col items-start justify-start mx-3 md:mx-10 lg:mx-20 xl:mx-70 gradient-text"
        >
          <h3 className="story-heading-size font-round font-black text-transparent text-nowrap">
            Vice City, USA.
          </h3>
          <p className=" story-text-size font-round font-bold text-transparent text-pretty leading-4 md:leading-tight ">
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
        ref={FirstVideoRef}
        className="absolute z-0 inset-0 overflow-hidden "
      >
        <div className="h-lvh">
          <AnimatedVideoSection
            videoRef={videoRef}
            posterUrl={posterUrl}
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
