"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

function LuciaFooter() {
  const containerRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const outroRef = useRef(null);

  useGSAP(
    () => {

          gsap.set(textRef.current, {
            backgroundImage:
              "radial-gradient(at 80% 40%, rgb(252, 82, 67) 0%, rgb(223, 58, 147) 50%, transparent 100%)",
          });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center", // تم تعديل نقطة البداية لتناسب التخطيط الجديد
              end: "+=2000", // يمكنك تعديل هذا حسب الطول المطلوب للأنيميشن
              scrub: 2,
              pinSpacing: false,
              // markers: true,
            },
          });
          tl.to(
            textRef.current,
            {
              backgroundImage:
                "radial-gradient(at 70% 70%, rgb(255, 185, 156) 0%, rgb(255, 249, 203) 100%)",
              ease: "none",
              duration: 1.5,
            },
            0
          );
          tl.fromTo(
            backgroundImageRef.current,
            { objectPosition: "50% 10%" },
            { objectPosition: "50% 50%", ease: "none", duration: 1.2 },
            0
          ).fromTo(
            overlayRef.current,
            {
              "--outroShift": 6,
            },
            { "--outroShift": 0, ease: "none", duration: 1.2 },
            0
          );
   
    },
    { scope: containerRef }
  );

  return (
    // 1. الحاوية الرئيسية الآن لا تحدد الارتفاع، بل ستتمدد لتناسب المحتوى
    <div ref={containerRef} className="relative w-full mt-[20vh] ">
      {/* 2. حاوية الصورة، الآن هي عنصر عادي بارتفاع شاشة كاملة */}
      <div
        ref={overlayRef}
        className="relative w-full h-[110vh] bg-gta-transparent outroLucia"
      >
        <Image
          ref={backgroundImageRef}
          src="/images/People/lucia/Lucia-Footer.webp"
          alt="Lucia"
          sizes="100vw"
          className="object-cover "
          fill
          unoptimized
          loading="eager"
        />
      </div>

      {/* 3. حاوية التراكب، ستظهر الآن بشكل طبيعي أسفل الصورة */}
      <div
        ref={outroRef}
        className="relative w-full h-[80vh] flex items-center justify-center  trapezoid-shape bg-gta-transparent"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 6vw), 0% 100%)",
        }}
      >
        <div
          ref={textRef}
          className="flex md:flex-row flex-col items-center justify-center gap-55 gradient-text"
        >
          <q className="text-yellow font-round font-black text-4xl md:text-[6.5rem] self-center md:self-start quotes-none before:content-[''] after:content-[''] ">
            Only in
            <br />
            Leonida
          </q>
          <p className="text-white max-w-70 md:text-[1.8rem] text-lg font-round font-black leading-tight self-center md:self-start mt-6">
            When the sun fades and the neon glows, everyone has something to
            gain — and more to lose.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LuciaFooter;
