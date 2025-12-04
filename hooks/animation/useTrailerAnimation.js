import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useTrailerAnimation(trailerRef={}, isOpen , isMounted, setIsMounted, onClose) {
    const { overlaybgRef, buttonRef, videoRef, ContainerRef } = trailerRef || {};
    useGSAP(
    () => {
      if (!isMounted) return;

      if (
        !ContainerRef.current ||
        !overlaybgRef.current ||
        !buttonRef.current ||
        !videoRef.current
      )
        return;

      if (isOpen) {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
        });

        // ✅ تحسين: استخدام will-change للأداء
        gsap.set("#hero", { willChange: "transform" });
        gsap.set([overlaybgRef.current, buttonRef.current, videoRef.current], {
          willChange: "transform, opacity",
        });

        tl.to(
          "#hero",
          {
            scale: 1.25,
            duration: 0.5, 
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0
        ).fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }, 
          "<"
        );

    
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, y: 500 }, 
          { opacity: 1, y: 0, duration: 0.6 }, 
          "<"
        );

        // ✅ إزالة will-change بعد الانتهاء لتوفير الذاكرة
        tl.call(() => {
          gsap.set("#hero", { clearProps: "willChange" });
          gsap.set(
            [overlaybgRef.current, buttonRef.current, videoRef.current],
            {
              clearProps: "willChange",
            }
          );
        });
      } else if (!isOpen && isMounted) {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            setIsMounted(false);
            onClose();
          },
        });

      
        tl.to(
          "#hero",
          {
            scale: 1,
            duration: 0.4, 
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.4 }, 
          0
        )
          .fromTo(
            buttonRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.3 }, 
            "<"
          )
          .fromTo(
            videoRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.4 },
            "<"
          );
      }
    },
    { scoap: ContainerRef, dependencies: [isOpen, isMounted] }
  );
}