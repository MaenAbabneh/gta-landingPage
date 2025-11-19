import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useVideoAnimation(
  refs = {},
  videoSrc,
  config = {},
) {
  const { sectionRef, storytextRef, videoOverlayRef, videoRef, canvasRef } =
    refs || {};

  const {
    videoStart = 0.2,
    videoEnd = 0.9,
    marginTop = { desktop: "-150vh", tablet: "-100vh", mobile: "-120vh" },
    maskImages = {
      storytext:
        "radial-gradient(at 50% 0vh, rgb(0, 0, 0) 120vh, rgba(0, 0, 0, 0) 150vh)",
      videoOverlay:
        "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
      storytextOut:
        "radial-gradient(at 20% -120vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 50vh)",
      videoOverlay80:
        "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
    },
    backgroundImages = {
      storytext: `radial-gradient(circle at 50% 200vh, rgb(255, 210, 123) 0%, rgb(223, 58, 147) 15%, rgb(92, 22, 99) 30%, rgba(32, 31, 66, 0) 50%)`,
      storytextIn: `radial-gradient(circle at 40% 0vh, rgb(255, 179, 135) 0%, rgb(252, 82, 67) 70%, rgb(157, 47, 106) 100%, rgba(32, 31, 66, 0) 150%)`,
    },
    filters = {
      videoOverlay: "",
      videoOverlayIn: "",
      videoOverlayOut: "",
    },
    sectionPinEnd = "bottom top-=1500",
    isJason = false,
    isLucia = false,
    
  } = config;

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

          const context = canvas.getContext("2d", { alpha: false });
          if (!canvas || !context) return;

          gsap.set([canvas], { force3D: true });

          // marginTop حسب الجهاز
          if (isDesktop) {
            gsap.set(sectionRef.current, { marginTop: marginTop.desktop });
          } else if (isTablet) {
            gsap.set(sectionRef.current, { marginTop: marginTop.tablet });
          } else if (isMobile) {
            gsap.set(sectionRef.current, { marginTop: marginTop.mobile });
          }
          if (storytextRef && storytextRef.current) {
            gsap.set(storytextRef.current, {
              opacity: 1,
              maskImage: maskImages.storytext,
              backgroundImage: backgroundImages.storytext,
            });
          }
          gsap.set(videoOverlayRef.current, {
            filter: filters.videoOverlay,
            opacity: 0,
            maskImage: maskImages.videoOverlay,
          });
          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const drawImage = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
            };

            gsap.ticker.add(drawImage);

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: sectionPinEnd,
                pin: true,
                scrub: true,
                // pinSpacing: false,
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
            if (storytextRef && storytextRef.current && isJason) {
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
                videoOverlayRef.current,
                {
                  filter: filters.videoOverlayIn,
                  opacity: 0,
                },
                "start"
              ).to(
                storytextRef.current,
                {
                  backgroundImage: backgroundImages.storytextIn,
                },
                "<"
              );

              tl.to(
                storytextRef.current,
                {
                  opacity: 0,
                  maskImage: maskImages.storytextOut,
                },
                ">+=0.2"
              ).to(
                videoOverlayRef.current,
                {
                  opacity: 1,
                  filter: filters.videoOverlayOut,
                },
                "<"
              );

              tl.to(
                videoOverlayRef.current,
                {
                  maskImage: maskImages.videoOverlay80,
                },
                "80%"
              );
              tl.to(
                videoOverlayRef.current,
                {
                  opacity: 0,
                },
                "90%"
              );
            } else if (isLucia) {
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
                  maskImage: maskImages.videoOverlay80,
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
            }
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
      scope: sectionRef,
      dependencies: [videoSrc],
    }
  );
}
// لا شيء بعد نهاية الدالة
