import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimetion(refs = {}) {
  const {
    containerRef,
    maskWrapperRef,
    backgroundImageRef,
    buttonRef,
    WatchRef,
    bgKeyArtRef,
    comingSoonRef,
    textRef,
    consolesRef,
    viLogoOverlayRef,
  } = refs || {};

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isTablet: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          isminiMobile: "(min-width: 0px) and (max-width: 400px)",
        },
        (context) => {
          let { isTablet, isMobile, isminiMobile } = context.conditions;
          let MSize;
          if (isminiMobile) {
            MSize = "clamp(14vmin, 14vmax, 20vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.1,
            });
          } else if (isMobile) {
            MSize = "clamp(12vmin, 12vmax, 20vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.1,
            });
          } else if (isTablet) {
            MSize = "clamp(25vh, 20vw, 30vh)";
            gsap.set([backgroundImageRef.current, bgKeyArtRef.current], {
              scale: 1.25,
            });
          }

          gsap.set(
            [
              backgroundImageRef.current,
              buttonRef.current,
              bgKeyArtRef.current,
            ],
            { opacity: 1, pointerEvents: "auto" }
          );
          gsap.set([consolesRef.current], { opacity: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=300%",
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
              // markers: true,
            },
          });
          tl.fromTo(
            [maskWrapperRef.current, viLogoOverlayRef.current],
            {
              BackgroundSize: "clamp(5000vh, 3200%, 0.0001vh)",
              backgroundPosition: "50% 47%",
              webkitMaskSize: "clamp(5000vh, 3200%, 0.0001vh)",
              maskSize: "clamp(5000vh, 3200%, 0.0001vh)",
              webkitMaskPosition: "50% 47%",
              maskPosition: "50% 47%",
            },
            {
              maskSize: MSize,
              webkitMaskSize: MSize,
              maskPosition: "50% 50%",
              webkitMaskPosition: "50% 50%",
              backgroundSize: MSize,
              backgroundPosition: "50% 50%",
            },
            0
          );
          tl.to(
            [backgroundImageRef.current, bgKeyArtRef.current],
            {
              scale: 1,
            },
            0
          )
            .to(
              bgKeyArtRef.current,
              {
                opacity: 0,
                duration: 0.3,
              },
              "<"
            )
            .to(
              [buttonRef.current, WatchRef.current],
              {
                opacity: 0,
                zIndex: -1,
                duration: 0.3,
              },
              "<"
            )
            .to(
              backgroundImageRef.current,
              {
                opacity: 0,
                duration: 0.3,
              },
              0.05
            );

          tl.fromTo(
            containerRef.current,
            {
              scale: 1,
            },
            {
              scale: 0.8,
              duration: 1.4,
            },
            0.2
          );

          tl.fromTo(
            textRef.current,
            {
              backgroundImage: `radial-gradient(
          circle at 50% 150vh,
          rgba(255, 214, 135, 0) 0vh,
          rgba(157, 47, 106, 0.5) 50vh,
          rgba(157, 47, 106, 0.8) 90vh,
          rgba(32, 31, 66, 0) 100vh)`,
            },
            {
              backgroundImage: `radial-gradient(
          circle at 50% -30vh,
          rgb(255, 213, 133) 0px,
          rgb(247, 77, 82) 50vh,
          rgb(145, 42, 105) 90vh,
          rgba(32, 31, 66, 0) 150vh)`,
              duration: 0.69,
            },
            0.29
          );

          tl.fromTo(
            [viLogoOverlayRef.current],
            {
              opacity: 0,
              maskImage: `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 50%)`,
              webkitMaskImage: `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 50%)`,
            },
            {
              opacity: 1,
              maskImage: `radial-gradient(circle, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0) 100%)`,
              webkitMaskImage: `radial-gradient(circle, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0) 100%)`,
              duration: 0.5,
            },
            0.29
          );

          tl.to(
            consolesRef.current,
            {
              opacity: 1,
            },
            0.4
          );

          tl.fromTo(
            comingSoonRef.current,
            {
              maskImage: `radial-gradient(circle at 50% 18vh, rgb(0, 0, 0) 50vh, rgba(0, 0, 0, 0) 80vh)`,
            },
            {
              maskImage: `radial-gradient(circle at 50% -60vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 60vh)`,
            },
            0.95
          );
          tl.fromTo(
            [viLogoOverlayRef.current, maskWrapperRef.current],
            { opacity: 1 },
            {
              opacity: 0,
            },
            0.9
          );
        }
      );
    },
    { scope: containerRef }
  );
}
