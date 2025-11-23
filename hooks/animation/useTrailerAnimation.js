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

        // تكبير Hero بسرعة أكبر على الموبايل
        tl.to(
          "#hero",
          {
            scale: 1.25,
            duration: 0.5, // ✅ كان 0.8 - الآن أسرع
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }, // ✅ كان 0.5 - الآن أسرع
          0
        ).fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }, // ✅ كان 0.4 - الآن أسرع
          "<"
        );

        // ✅ تحسين: استخدام transform بدلاً من y لأداء أفضل
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, y: 500 }, // ✅ كان 1000 - مبالغ فيه
          { opacity: 1, y: 0, duration: 0.5 }, // ✅ كان 0.7 - الآن أسرع
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

        // إعادة #hero إلى الحجم الطبيعي بسرعة
        tl.to(
          "#hero",
          {
            scale: 1,
            duration: 0.25, // ✅ كان 0.3 - الآن أسرع
            ease: "power2.out",
          },
          0
        );

        tl.fromTo(
          overlaybgRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.3 }, // ✅ كان 0.6 - الآن أسرع
          0
        )
          .fromTo(
            buttonRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.2 }, // ✅ كان 0.3 - الآن أسرع
            "<"
          )
          .fromTo(
            videoRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.3 }, // ✅ كان 0.5 - الآن أسرع
            "<"
          );
      }
    },
    { scoap: ContainerRef, dependencies: [isOpen, isMounted] }
  );
}