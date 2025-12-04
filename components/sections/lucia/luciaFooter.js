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

      gsap.to(textRef.current, {
        backgroundImage:
          "radial-gradient(at 70% 70%, rgb(255, 185, 156) 0%, rgb(255, 249, 203) 100%)",
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "+=2000",
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
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
    <div ref={containerRef} className="relative w-full mt-[20vh] ">
      <div
        ref={overlayRef}
        className="relative w-full h-[90vh]  md:h-[110vh] bg-gta-transparent outroLucia"
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

      <div
        ref={outroRef}
        className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] flex items-center justify-center  trapezoid-shape bg-gta-transparent"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 6vw), 0% 100%)",
        }}
      >
        <div
          ref={textRef}
          className="flex lg:flex-row flex-col items-center justify-center gap-10 lg:gap-50  gradient-text"
        >
          <q className="text-yellow font-round font-black text-[min(10vw,256px)] lg:text-[min(6vw,201.2px)] leading-[120%] self-center md:self-start quotes-none before:content-[''] after:content-[''] ">
            Only in
            <br />
            Leonida
          </q>
          <p className="text-white max-w-35 md:max-w-90 lg:max-w-120 text-[min(3.5vw,89.2px)] lg:text-[min(2.5vw,76.8px)] font-round font-black leading-tight self-cente  md:self-start mt-6">
            When the sun fades and the neon glows, everyone has something to
            gain — and more to lose.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LuciaFooter;
