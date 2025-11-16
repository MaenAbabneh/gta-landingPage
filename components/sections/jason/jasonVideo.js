"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { GSDevTools } from "gsap/GSDevTools";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import AnimatedVideoSection from "@/components/ui/AnimatedVideoSection";

gsap.registerPlugin(ScrollTrigger, GSDevTools);

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

          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const drawImage = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
            };

            gsap.ticker.add(drawImage);

            const videoStart = 0;
            const videoEnd = 0.33;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: videoTwoRef.current,
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: true,
                pinSpacing: false,
                markers: true,
                onEnter: () => {
                  video.currentTime = 0;
                },
                onUpdate: (self) => {
                  if (video.readyState > 1 && video.duration) {
                    const progress = self.progress;
                    if (
                      progress >= videoStart &&
                      progress <= videoEnd 
                    ) {
                      const mapped = gsap.utils.mapRange(
                        videoStart,
                        videoEnd,
                        0,
                        video.duration,
                        progress
                      );
                      video.currentTime = Math.max(video.currentTime, mapped);
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
            )
              .to(
                quoteRef.current,
                {
                  opacity: 1,
                  y: 0,
                },
                "30%"
              )

              .add("videoEnd", 0.8)

              .to(
                canvasRef.current,
                {
                  scale: 1,
                },
                "<"
              )
              .to(
                videoOverlayRef.current,
                {
                  maskImage:
                    "radial-gradient(circle at 70vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                },
                "<+0.1"
              )

              .add("fadeOut", "+=0.5")

              .to(
                videoOverlayRef.current,

                {},
                "fadeOut"
              );

            tl.to(quoteRef.current, { y: "-90vh", ease: "none" }, "fadeOut");
            GSDevTools.create({ animation: tl });
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
      scope: containerRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      ref={containerRef}
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
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:55%_center] aspect-video z-1 overflow-clip"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:55%_center] aspect-video z-2 overflow-clip"
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
