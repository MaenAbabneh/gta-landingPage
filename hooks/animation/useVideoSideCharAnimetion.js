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

  const {} = config;

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      // التأكد من وجود العناصر
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      gsap.set(canvas, { force3D: true });

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const bgoverlay = bgOverlayRef.current;
        const overlay = videoOverlayRef.current;

        // const draw = () => {
        //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // };
        // gsap.ticker.add(draw);

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: FirstVideoRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
            pin: leftSideRef.current,
            // markers: true,
            onUpdate: (self) => {
              if (video.readyState > 1 && video.duration) {
                video.currentTime = self.progress * video.duration;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
              }
            },
          },
        });

        // ب) حركة العمود الأيمن (Parallax)
        // نربطها بنفس التايم لاين لضمان التزامن
        mainTl.to(rightSideRef.current, { y: 150, ease: "none" }, 0);

        // ج) أنيميشن الطبقات (Overlays) والنصوص
        // استخدام "Labels" أو أرقام نسبية للتحكم الدقيق في التوقيت

        // 1. حالة البداية
        gsap.set(overlay, { opacity: 1 });
        gsap.set([bgoverlay, textRef.current], { opacity: 0 });
        gsap.set(".img-fade", { opacity: 1 });

        // 2. تسلسل الأنيميشن داخل نفس التايم لاين

        // البداية: إخفاء الـ overlay وإظهار الخلفية الداكنة
        mainTl
          .to(overlay, { opacity: 0, ease: "none", duration: 0.2 }, 0)
          .to(bgoverlay, { opacity: 1, ease: "none", duration: 0.2 }, 0)
          .to(".img-fade", { opacity: 0, duration: 0.2 }, 0);

        // النهاية: (عندما يقترب الفيديو من النهاية)
        // نستخدم Position Parameter (مثل 0.8) لتحديد متى يبدأ الاختفاء بالنسبة لمدة الفيديو
        mainTl
          .to(overlay, { opacity: 1, ease: "none", duration: 0.2 }, 0.8)
          .to(bgoverlay, { opacity: 0, ease: "none", duration: 0.2 }, 0.8)
          .to(textRef.current, { opacity: 1, duration: 0.2 }, 0.5) // ظهور النص في المنتصف
          .to(".img-fade", { opacity: 1, duration: 0.2 }, 0.8);

        return () => {
          gsap.ticker.remove(draw);
          mainTl.scrollTrigger?.kill();
          mainTl.kill();
        };
      };

      // انتظار تحميل الفيديو
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
