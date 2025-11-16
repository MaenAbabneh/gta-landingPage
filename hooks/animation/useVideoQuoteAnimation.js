import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useVideoQuoteAnimation(refs , videoSrc) {

  const { containerRef, videoRef, canvasRef, quoteRef, videoOverlayRef } = refs;

  if (!containerRef || !videoRef || !canvasRef || !quoteRef || !videoOverlayRef) {
    console.warn("One or more refs are undefined in useVideoQuoteAnimation");
    return;
  }

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

          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (!video || !canvas) return;

          const context = canvas.getContext("2d");

          gsap.set([video, canvas, videoOverlayRef.current], {
            willChange: "transform, opacity, filter",
            force3D: true,
          });

          if (isDesktop) {
            gsap.set(containerRef.current, { marginTop: "-50vh" });
          } else if (isTablet) {
            gsap.set(containerRef.current, { marginTop: "-50vh" });
          } else if (isMobile) {
            gsap.set(containerRef.current, { marginTop: "-0vh" });
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
            const videoEnd = 0.5;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: true,
                // pinSpacing: false,
                markers: true,
                onEnter: () => {
                  video.currentTime = 0;
                },
                onLeave: () => {
                    video.currentTime = video.duration;
                },
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
            );
            tl.to(
              quoteRef.current,
              {
                opacity: 1,
                y: 0,
              },
              "30%"
            );

            tl.to(
              canvasRef.current,
              {
                scale: 1,
              },
              "50%"
            );
            tl.to(
              videoOverlayRef.current,
              {
                maskImage:
                  "radial-gradient(circle at 70vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
              },
              "50%"
            );

            tl.to(
              videoOverlayRef.current,
              {
                opacity: 0,
                duration: 0.3,
              },
              "90%"
            );

            tl.to(quoteRef.current, { y: "-90vh", ease: "none" }, "90%");

            return () => {
              gsap.ticker.remove(drawImage);
              tl.scrollTrigger.kill();
              tl.kill();
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
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [videoSrc],
    }
  );
}