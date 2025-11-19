"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";
import { useLazyVideo } from "@/hooks/useLazyVideo";

gsap.registerPlugin(ScrollTrigger);

function LuciaVideo() {
  const sectionRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { videoUrl: videoSrc, posterUrl } = useLazyVideo(
    "Lucia_Caminos_1_rlbk0h",
    {
      eager: true,
    }
  );

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");

      gsap.set(sectionRef.current, { marginTop: "-40vh" });

      gsap.set(canvas, {
        force3D: true,
      });
      gsap.set(videoOverlayRef.current, {
        maskImage:
          "radial-gradient(circle at 50vw -50vh, rgb(0, 0, 0) 50vw, rgb(0, 0, 0) 100vw)",
        opacity: 0,
      });

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const drawImage = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        };

        gsap.ticker.add(drawImage);

        const videoStart = 0;
        const videoEnd = 0.8;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top-=500",
            scrub: true,
            pin: true,
            // pinSpacing: false,
            onUpdate: (self) => {
              if (video.readyState > 1 && video.duration) {
                const progress = self.progress;
                if (progress >= videoStart && progress <= videoEnd) {
                  const mapped = gsap.utils.mapRange(
                    videoStart,
                    videoEnd,
                    0,
                    video.duration,
                    progress
                  );
                  video.currentTime = mapped;
                }
              }
            },
          },
        });

        tl.to(
          videoOverlayRef.current,
          {
            opacity: 1,
          },
          0
        );

        tl.to(
          videoOverlayRef.current,
          {
            maskImage:
              "radial-gradient(circle at 10vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
          },
          "80%"
        );

        tl.to(
          videoOverlayRef.current,
          {
            opacity: 0,
          },
          "95%"
        );

        return () => {
          (gsap.ticker.remove(drawImage), tl.scrollTrigger.kill(), tl.kill());
        };
      };

      const waitForVideo = () => {
        if (video.readyState >= 1 && video.duration) {
          setupAnimation();
        } else {
          video.addEventListener(
            "loadedmetadata",
            () => {
              setupAnimation();
            },
            { once: true }
          );
        }
      };

      const timer = setTimeout(waitForVideo, 100);

      return () => {
        clearTimeout(timer);
      };
    },
    {
      scope: sectionRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh"
      >
        <AnimatedVideoSection
          videoRef={videoRef}
          posterUrl={posterUrl}
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
