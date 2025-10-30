"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useResponsiveVideo } from "@/hooks/useResponsive";
import { buildImageUrl } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

function LuciaVideo() {
  const videoTwoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const VideoRef = useRef(null);
  const canvasRef = useRef(null);

  const videoSrc = useResponsiveVideo("Lucia_Caminos_1_rlbk0h");

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = VideoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");

      // تحسينات الأداء - GPU Acceleration
      gsap.set(
        [videoTwoRef.current, canvasRef.current, videoOverlayRef.current],
        {
          willChange: "transform",
          force3D: true,
        }
      );

      gsap.set(videoTwoRef.current, { marginTop: "-80vh" });
      gsap.set(videoOverlayRef.current, {
        maskImage:
          "radial-gradient(circle at 50vw -50vh, rgb(0, 0, 0) 50vw, rgb(0, 0, 0) 100vw)",
        opacity: 0,
      });

      const drawVideoToCanvas = () => {
        if (context && video.readyState > 2) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      };

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoTwoRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              if (video.duration) {
                const newTime = self.progress * video.duration;
                if (Math.abs(newTime - video.currentTime) > 0.05) {
                  video.currentTime = newTime;
                }
              }
            },
          },
        });

        tl.to(
          videoOverlayRef.current,
          {
            opacity: 1,
            duration: 0.3,
            ease: "expo.Out",
          },
          0
        );
        tl.to(
          videoOverlayRef.current,
          {
            maskImage:
              "radial-gradient(circle at 10vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
            ease: "expo.inOut",
            duration: 3,
          },
          "<+=80%"
        ).to(
          videoOverlayRef.current,
          {
            opacity: 0,
            duration: 1.2,
            ease: "expo.in",
          },
          "<90%"
        );

        gsap.ticker.add(drawVideoToCanvas);
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
        gsap.ticker.remove(drawVideoToCanvas);
        if (tl) {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
          tl.kill();
        }
      };
    },
    {
      scope: videoTwoRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      ref={videoTwoRef}
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh"
      >
        <video
          ref={VideoRef}
          src={videoSrc}
          muted
          aria-label="Video showing Jason Duval in various scenes"
          preload="auto"
          crossOrigin="anonymous"
          playsInline
          className="hidden"
          style={{
            display: "none",
            crossOrigin: "anonymous",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absoulte inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:40%_center] aspect-video"
          style={{
            imageRendering: "optimizeSpeed",
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
}

export default LuciaVideo;
