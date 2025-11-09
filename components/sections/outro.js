"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useResponsiveVideo } from "@/hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

function Outro() {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const storytextRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { videoSrc, posterUrl } = useResponsiveVideo("outro_dy82ms");

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

          if (!video) return;

          const context = canvas.getContext("2d");
          if (!canvas || !context) return;

          gsap.set(
            [FirstVideoRef.current, canvasRef.current, videoRef.current],
            {
              willChange: "transform, opacity, filter",
              force3D: true,
            }
          );

          if (isDesktop) {
            // gsap.set(introRef.current, { marginTop: "-100vh" });
          } else if (isTablet) {
            // gsap.set(introRef.current, { marginTop: "-100vh" });
          } else if (isMobile) {
            // gsap.set(introRef.current, { marginTop: "-120vh" });
          }
          gsap.set(FirstVideoRef.current, {
            opacity: 0,
          });
          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: introRef.current,
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: true,
                ease: "none",
                // markers: true,
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

            tl.to(FirstVideoRef.current, { opacity: 1 }, 0);

            gsap.ticker.add(() => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
            });

            return () => {
              gsap.ticker.remove(() => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
              });
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
      scope: introRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      id="outro"
      ref={introRef}
      className="relative w-full h-lvh overflow-hidden"
    >
      <div ref={FirstVideoRef} className="h-lvh">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterUrl}
          preload="metadata"
          playsInline
          muted
          crossOrigin="anonymous"
          aria-label="Jason embracing Lucia while looking into the distance."
          className="w-full h-full object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center] aspect-video z-2 overflow-clip"
        />

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center] aspect-video z-1 overflow-clip"
        />
      </div>
    </section>
  );
}

export default Outro;
