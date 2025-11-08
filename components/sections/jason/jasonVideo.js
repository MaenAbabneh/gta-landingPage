"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useLazyVideo } from "@/hooks/useLazyVideo";

gsap.registerPlugin(ScrollTrigger);

function JasonVideo() {
  const videoTwoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const VideoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const {
    videoUrl: videoSrc,
    posterUrl,
    containerRef,
  } = useLazyVideo("Jason_Duval_2_so4cun", {
    rootMargin: "300px",
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (ctx) => {
          let { isDesktop, isTablet, isMobile } = ctx.conditions;
          if (!videoSrc) return;

          const video = VideoRef.current;
          const canvas = canvasRef.current;
          if (!video || !canvas) return;

          const context = canvas.getContext("2d");

          gsap.set(
            [videoTwoRef.current, canvasRef.current, videoOverlayRef.current],
            {
              willChange: "transform, opacity, filter",
              force3D: true,
            }
          );

          if (isDesktop) {
            gsap.set(videoTwoRef.current, { marginTop: "-50vh" });
          } else if (isTablet) {
            gsap.set(videoTwoRef.current, { marginTop: "-50vh" });
          } else if (isMobile) {
            gsap.set(videoTwoRef.current, { marginTop: "-0vh" });
          }
          gsap.set(canvasRef.current, { scale: 1.1 });
          gsap.set(quoteRef.current, { opacity: 0, y: 200 });
          gsap.set(videoOverlayRef.current, {
            opacity: 0,
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
          let lastTime = -1;

          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: videoTwoRef.current,
                start: "top top",
                end: "+=3100 bottom",
                scrub: true,
                pin: true,
                ease: "none",
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

            tl.to(
              videoOverlayRef.current,
              {
                opacity: 1,
                duration: 0.1,
              },
              0
            )
              .to(
                quoteRef.current,
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                },
                "<+0.5"
              )

              .add("videoEnd", 0.8)

              .to(
                canvasRef.current,
                {
                  scale: 1,
                  duration: 1,
                },
                "videoEnd"
              )
              .to(
                videoOverlayRef.current,
                {
                  maskImage:
                    "radial-gradient(circle at 70vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                  duration: 1,
                },
                "<+0.1"
              )

              .add("fadeOut", "+=0.5")

              .to(
                videoOverlayRef.current,

                {
                  opacity: 0,
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
        }
      );
    },
    {
      scope: videoTwoRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      ref={(el) => {
        videoTwoRef.current = el;
        containerRef.current = el;
      }}
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 z-0 overflow-hidden h-lvh "
      >
        <video
          ref={VideoRef}
          src={videoSrc}
          poster={posterUrl}
          muted
          aria-label="Video showing Jason Duval in various scenes"
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:55%_center] aspect-video z-2 overflow-clip"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:55%_center] aspect-video z-1 overflow-clip"
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
