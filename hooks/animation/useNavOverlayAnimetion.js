import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useNavOverlayAnimation(
  refs = {},
  isMenuOpen,
  setIsAnimating,
  isAnimating
) {
  const { containerRef, overlayRef, panelRef, leftColumRef, timelineRef } =
    refs || {};

  useGSAP(
    () => {
      const container = containerRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const leftColum = leftColumRef.current;

      if (!container || !overlay || !panel || !leftColum) return;

      // إلغاء أي أنيميشن سابق
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (isMenuOpen) {
        setIsAnimating(true);

        gsap.set(container, { pointerEvents: "none", visibility: "visible" });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            gsap.set(container, {
              pointerEvents: "auto",
              visibility: "visible",
            });
            setIsAnimating(false);
            timelineRef.current = null;
          },
        });

        timelineRef.current = tl;

        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
          .fromTo(
            panel,
            { x: 500, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 },
            "<"
          )
          .fromTo(
            leftColum,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "<"
          );
      } else {
        setIsAnimating(true);
        if (!isAnimating) {
          gsap.set(container, { pointerEvents: "none" });

          const tl = gsap.timeline({
            ease: "power2.in",
            onComplete: () => {
              gsap.set(container, { visibility: "hidden" });
              setIsAnimating(false);
              timelineRef.current = null;
            },
          });

          timelineRef.current = tl;

          tl.to(overlay, { opacity: 0, duration: 0.5 }, 0)
            .to(panel, { x: 500, opacity: 0, duration: 0.4 }, 0)
            .to(leftColum, { opacity: 0, duration: 0.3 }, 0);
        }
      }
    },
    { dependencies: [isMenuOpen], scope: containerRef }
  );
}
