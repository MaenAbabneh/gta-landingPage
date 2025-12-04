import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useContentAnimetion(refs = {}) {
  const { containerRef, moveingColumRef, fadeImageRef } = refs || {};

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !moveingColumRef.current ||
        !fadeImageRef.current
      )
        return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1280px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isDesktop, isTablet, isMobile } = context.conditions;
          gsap.set(fadeImageRef.current, { opacity: 0 });

          gsap.to(fadeImageRef.current, {
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
              // markers: true,
            },
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
              // markers: true
            },
          });
          if (isDesktop || isTablet) {
            let y = isDesktop ? 200 : 150;
            tl.to(moveingColumRef.current, {
              y: y,
              ease: "none",
            });
          }
          tl.to(fadeImageRef.current, { opacity: 1, ease: "none" }, 0);
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );
}
