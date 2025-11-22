import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useVideoSideCharAnimation(refs = {}, videoSrc, config = {}) {
  const {
    sectionRef,
    rightSideRef,
    leftSideRef,
    textRef,
    bgOverlayRef,
    videoOverlayRef,
    FirstVideoRef,
    videoRef,
    canvasRef,
  } = refs || {};

  const { videoStart = 0, videoEnd = 1 } = config;

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const bgoverlay = bgOverlayRef.current;
      const overlay = videoOverlayRef.current;

      if (!video || !canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      gsap.set(canvas, { force3D: true });
      gsap.set(overlay, { opacity: 1 });
      gsap.set([bgoverlay, textRef.current], { opacity: 0 });
      gsap.set(".img-fade", { opacity: 1 });

      if (rightSideRef.current && sectionRef.current) {
        gsap.fromTo(
          rightSideRef.current,
          { y: 0 },
          {
            y: 150,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              id: "right-col-parallax",
            },
          }
        );
      }

      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            id: "section-exit-fade",
          },
        });
      }

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const earlyTl = gsap.timeline({
          scrollTrigger: {
            trigger: FirstVideoRef.current,
            start: "top 85%",
            end: "center center",
            scrub: true,
            id: "early-entry",
          },
        });

        earlyTl
          .to(overlay, { opacity: 0, ease: "none" })
          .to(bgoverlay, { opacity: 1, ease: "none" }, "<")
          .to(".img-fade", { opacity: 0, ease: "none" }, "<");

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: FirstVideoRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
            pin: leftSideRef.current,
            id: "main-pin",
            onUpdate: (self) => {
              if (video.readyState > 1 && video.duration) {
                const progress = self.progress;
                if (progress >= 0 && progress <= 1) {
                  const mapped = gsap.utils.mapRange(
                    videoStart,
                    videoEnd,
                    0,
                    video.duration,
                    progress
                  );
                  video.currentTime = mapped;
                  context.drawImage(video, 0, 0, canvas.width, canvas.height);
                }
              }
            },
          },
        });

        mainTl.to(textRef.current, { opacity: 1, duration: 0.2 }, 0.2);

        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: FirstVideoRef.current,
            start: () =>
              mainTl.scrollTrigger ? mainTl.scrollTrigger.end : "bottom bottom",
            end: "+=50%",
            scrub: true,
            id: "exit-anim",
            invalidateOnRefresh: true, // لإعادة الحساب عند تغيير حجم الشاشة
          },
        });

        exitTl
          .to(bgoverlay, { opacity: 0, ease: "none" })
          .to(overlay, { opacity: 1, ease: "none" }, "<")
          .to(".img-fade", { opacity: 1, ease: "none" }, "<");

        return () => {
          earlyTl.scrollTrigger?.kill();
          earlyTl.kill();
          mainTl.scrollTrigger?.kill();
          mainTl.kill();
          exitTl.scrollTrigger?.kill();
          exitTl.kill();
        };
      };

      if (video.readyState >= 1 && video.duration) {
        setupAnimation();
      } else {
        video.addEventListener("loadedmetadata", setupAnimation, {
          once: true,
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [videoSrc],
    }
  );
}
