"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useLazyVideo } from "@/hooks/useLazyVideo";

gsap.registerPlugin(ScrollTrigger);

function LuciaVideo() {
  const videoTwoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const VideoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    videoUrl: videoSrc,
    posterUrl,
    containerRef,
  } = useLazyVideo("Lucia_Caminos_1_rlbk0h", {
    rootMargin: "300px",
  });

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = VideoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");

      gsap.set(videoTwoRef.current, { marginTop: "-40vh" });
      gsap.set([videoOverlayRef.current, canvasRef.current, VideoRef.current], {
        willChange: "transform, opacity, filter",
        force3D: true,
      });
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
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: videoTwoRef.current,
            start: "top top",
            end: "+=1500",
            scrub: true,
            pin: true,
            pinSpacing: false,
            ease: "none",
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
          },
          0
        );
        tl.to(
          videoOverlayRef.current,
          {
            maskImage:
              "radial-gradient(circle at 10vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
            duration: 0.7,
          },
          "<60%"
        ).to({}, { duration: 0.5 }); // إضافة تأخير بسيط في المنتصف
        tl.to(
          videoOverlayRef.current,
          {
            opacity: 0,
          },
          ">"
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
      ref={videoTwoRef }
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh"
      >
        <video
          ref={VideoRef}
          src={videoSrc}
          poster={posterUrl}
          muted
          aria-label="Video showing Jason Duval in various scenes"
          preload="auto"
          crossOrigin="anonymous"
          playsInline
          className="absoulte inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:10%_center] aspect-video z-2 overflow-clip"
        />
        <canvas
          ref={canvasRef}
          className="absoulte inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:40%_center] aspect-video z-1 overflow-clip"
        />
      </div>
    </section>
  );
}

export default LuciaVideo;
