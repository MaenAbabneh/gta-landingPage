import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useVideoPlaceAnimation(refs = {}, videoSrc, config = {}) {
  const { sectionRef, videoRef, canvasRef, bgRef , headRef } = refs || {};

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video) return;

      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      gsap.set([canvasRef.current], {
        force3D: true,
      });

      gsap.set(bgRef?.current, { opacity: 0 });
      gsap.set(headRef?.current, { opacity: 0 });

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // const drawImage = () => {
        //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // };
        // gsap.ticker.add(drawImage);

        const bgTL = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
            onUpdate: (self) => {
              if (video.readyState > 1 && video.duration) {
                video.currentTime = self.progress * video.duration;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
              }
            },
          },
        });

        bgTL.to(
          bgRef.current,
          {
            opacity: 1,
            ease: "none",
          },
          0
        ).to(
          headRef.current,
          { opacity: 1, ease: "none" },
          0
        );

        bgTL.to(
          bgRef.current,
          {
            opacity: 0,
            ease: "none",
          },
          0.9
        );

        return () => {
          // gsap.ticker.remove(drawImage);
          bgTL.scrollTrigger.kill();
          bgTL.kill();
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
    },
    {
      scope: sectionRef,
      dependencies: [videoSrc],
    }
  );
}
