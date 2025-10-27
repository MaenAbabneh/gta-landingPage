"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useResponsiveVideo } from "@/hooks/useResponsive";
import { buildImageUrl } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

function JasonVideo() {
  const videoTwoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const VideoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const videoSrc = useResponsiveVideo("Jason_Duval_2_so4cun");
  const posterUrl = buildImageUrl("Jason_Duval_2_so4cun", {
    videoThumbnail: true,
  });

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

      gsap.set(videoTwoRef.current, { marginTop: "-0vh" });
      gsap.set(canvasRef.current, { scale: 1.1 });
      gsap.set(quoteRef.current, { opacity: 0, y: 200 });
      gsap.set(videoOverlayRef.current, {
        maskImage:
          "radial-gradient(circle at 70vw 50vh, rgb(0, 0, 0) 30vw, rgb(0, 0, 0) 100vw)",
      });
      const drawVideoToCanvas = () => {
        if (context && video.readyState > 2) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      };
      let tl;
      let isVideoComplete = false;
      let lastTime = -1; // تتبع آخر وقت لتجنب القفزات الصغيرة

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoTwoRef.current,
            start: "top top",
            end: "+=3100 bottom",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              isVideoComplete = false;
              lastTime = -1;
            },
            onUpdate: (self) => {
              if (video.duration) {
                if (isVideoComplete) {
                  if (video.currentTime !== video.duration) {
                    video.currentTime = video.duration;
                  }
                  return;
                }

                const videoScrubDuration = 1000;
                const scrollPassed = self.scroll() - self.start;
                let videoProgress = scrollPassed / videoScrubDuration;

                if (videoProgress <= 0) {
                  videoProgress = 0;
                } else if (videoProgress >= 1) {
                  videoProgress = 1;
                  isVideoComplete = true;
                }

                // تثبيت الوقت على 60fps لتقليل Range requests
                const targetTime =
                  Math.round(videoProgress * video.duration * 60) / 60;

                if (self.direction === 1 || videoProgress === 1) {
                  // تحديث فقط إذا كان الفرق ملحوظاً
                  if (Math.abs(targetTime - lastTime) > 1 / 60) {
                    video.currentTime = targetTime;
                    lastTime = targetTime;
                  }
                }
              }
            },
          },
        });

        tl.fromTo(
          videoOverlayRef.current,
          { opacity: 0, duration: 1.5, ease: "power3.in" },
          {
            opacity: 1,
            duration: 0.1,
            ease: "power3.Out",
          },
          0
        )
          .to(
            quoteRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "none",
            },
            "<+0.5"
          )

          .add("videoEnd", 0.8)

          .to(
            canvasRef.current,
            {
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            "videoEnd"
          )
          .to(
            videoOverlayRef.current,
            {
              maskImage:
                "radial-gradient(circle at 70vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
              ease: "power2.inOut",
              duration: 1,
            },
            "<+0.1"
          )

          .add("fadeOut", "+=0.5")

          .fromTo(
            videoOverlayRef.current,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              ease: "power1.out",
              duration: 0.5,
            },
            "fadeOut"
          );

        tl.to(
          quoteRef.current,
          { y: "-90vh", duration: 1, ease: "none" },
          "fadeOut"
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
      <div className="absolute z-0 inset-0 h-lvh overflow-hidden">
        <div ref={videoOverlayRef}>
          <video
            ref={VideoRef}
            src={videoSrc}
            poster={posterUrl}
            muted
            aria-label="Video showing Jason Duval in various scenes"
            preload="auto"
            crossOrigin="anonymous"
            playsInline
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            className="absoulte inset-0 h-lvh w-full object-cover [object-position:70%_center] md:[object-position:55%_center] aspect-[4/3] md:aspect-[9/16]"
            style={{
              imageRendering: "optimizeSpeed",
              willChange: "transform",
              force3D: "true",
            }}
          />
        </div>
        <div
          ref={quoteRef}
          className="absolute inset-0 z-10 flex items-end justify-start h-lvh w-full md:p-20 lg:p-25 "
        >
          <q className="text-gta-yellow md:text-6xl lg:text-7xl xl:text-[4.8rem] text-nowrap font-long font-bold uppercase drop-shadow-lg">
            If anything happens,
            <br />
            <span className="inline-block pl-[1.4ch] ">
              I&apos;m right behind you.
            </span>
          </q>
        </div>
      </div>
    </section>
  );
}

export default JasonVideo;
