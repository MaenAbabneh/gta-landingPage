import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useIntroAnimation(
  { introRef, storytextRef, FirstVideoRef, videoRef, canvasRef },
  videoSrc
) {
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
            gsap.set(introRef.current, { marginTop: "-150vh" });
          } else if (isTablet) {
            gsap.set(introRef.current, { marginTop: "-100vh" });
          } else if (isMobile) {
            gsap.set(introRef.current, { marginTop: "-120vh" });
          }

          gsap.set(storytextRef.current, {
            opacity: 1,
            maskImage:
              "radial-gradient(at 50% 0vh, rgb(0, 0, 0) 120vh, rgba(0, 0, 0, 0) 150vh)",
            backgroundImage: `radial-gradient(circle at 50% 200vh, rgb(255, 210, 123) 0%, rgb(223, 58, 147) 15%, rgb(92, 22, 99) 30%, rgba(32, 31, 66, 0) 50%)`,
          });

          gsap.set(FirstVideoRef.current, {
            filter: "brightness(0.2) blur(100px)",
            opacity: 0,
            maskImage:
              "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
          });
          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const drawImage = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
            };

            gsap.ticker.add(drawImage);

            const videoStart = 0.2;
            const videoEnd = 0.9;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: introRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                pinSpacing: false,
                scrub: true,
                // markers: true,
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

            tl.addLabel("start", 0);
            tl.fromTo(
              storytextRef.current,
              { scale: 1 },
              {
                scale: 0.7,
                duration: 1,
              },
              "start"
            );

            tl.to(
              FirstVideoRef.current,
              {
                filter: "brightness(0.6) blur(100px)",
                opacity: 0,
              },
              "start"
            ).to(
              storytextRef.current,
              {
                backgroundImage: `radial-gradient(circle at 40% 0vh, rgb(255, 179, 135) 0%, rgb(252, 82, 67) 70%, rgb(157, 47, 106) 100%, rgba(32, 31, 66, 0) 150%)`,
              },
              "<"
            );

            tl.to(
              storytextRef.current,
              {
                opacity: 0,
                maskImage:
                  "radial-gradient(at 20% -120vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 50vh)",
              },
              ">+=0.2"
            ).to(
              FirstVideoRef.current,
              {
                opacity: 1,
                filter: "brightness(1) blur(0px)",
              },
              "<"
            );

            tl.to(
              FirstVideoRef.current,
              {
                maskImage:
                  "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
              },
              "80%"
            );
            tl.to(
              FirstVideoRef.current,
              {
                opacity: 0,
              },
              "90%"
            );

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
      scope: introRef,
      dependencies: [videoSrc],
    }
  );
}
