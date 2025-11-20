"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Overlay_ViceCity from "./overlay-viceCity";
import { VisitLeonied } from "@/components/ui/svg";

gsap.registerPlugin(ScrollTrigger);

function ViceCity() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const containerRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const bgRef = useRef(null);

  const {
    videoUrl: videoSrc,
    posterUrl,
    containerRef: lazyRef,
  } = useLazyVideo("Vice_City_tazkqo", {
    eager: true,
  });

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video) return;

      const context = canvas.getContext("2d");
      if (!canvas || !context) return;

      gsap.set([FirstVideoRef.current, canvasRef.current, videoRef.current], {
        willChange: "transform, opacity, filter",
        force3D: true,
      });

      // gsap.set(containerRef.current, { marginTop: "30vh" });

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        gsap.set(bgRef.current, { opacity: 0 });

        // Sync video playback to scroll within the card area
        const videoST = ScrollTrigger.create({
          trigger: FirstVideoRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true, // recalc on refresh
          // markers: true,
          onUpdate: (self) => {
            if (video.duration) {
              const newTime = self.progress * video.duration;
              if (Math.abs(newTime - video.currentTime) > 0.05) {
                video.currentTime = newTime;
              }
            }
          },
        });

        // Background fade in/out with single ScrollTrigger
        const bgTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center", // يبدأ قبل دخول السكشن
            end: "bottom top", // ينتهي عند خروج السكشن
            scrub: true,
            // markers: true,
          },
        });

        // ظهور الخلفية في النصف الأول
        bgTL.to(
          bgRef.current,
          {
            opacity: 1,
            ease: "none",
          },
          0
        );

        // اختفاء الخلفية في النصف الثاني
        bgTL.to(
          bgRef.current,
          {
            opacity: 0,
            ease: "none",
          },
          0.6
        ); // يبدأ الاختفاء عند 60% من المسافة

        const draw = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        };
        gsap.ticker.add(draw);

        return () => {
          gsap.ticker.remove(draw);
          videoST.kill();
          bgTL.scrollTrigger?.kill();
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
      scope: containerRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      id="vice-city"
      ref={(el) => {
        containerRef.current = el;
        lazyRef.current = el;
      }}
      className="min-h-dvh w-full pb-20 overflow-hidden"
    >
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full vicecity-bg pointer-events-none -z-10"
        style={{ opacity: 0 }}
      />
      <div className="cal-gallary gap-5 md:gap-10 h-full">
        <div className="col-[content-start/content-end] flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
          <VisitLeonied className="w-[40vw] md:w-[20vw]" />
          <p className="text-balance text-center md:text-start md:max-w-70 text-sm md:text-2xl font-black font-round text-gta-white">
            Tour a few of the must-see destinations across the sunshine state.
          </p>
        </div>
        <button
          id="viceCity-button"
          onClick={() => setIsOverlayOpen(true)}
          ref={FirstVideoRef}
          aria-label="open vice-city map overlay"
          className=" col-[content-start/content-end] aspect-[3/2] relative group shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_100px_10px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out cursor-pointer  "
        >
          <div className="relative w-full h-full overflow-hidden scale-100 rotate-0 group-hover:scale-[1.015] group-hover:rotate-[0.5deg] transition-transform duration-500 ease-in-out">
            {/* الفيديو والكانفاس في div منفصل */}
            <div className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0 ease-in-out">
              {/* الفيديو */}
              <video
                ref={videoRef}
                src={videoSrc}
                width={1920}
                height={720}
                poster={posterUrl}
                preload="metadata"
                playsInline
                muted
                crossOrigin="anonymous"
                aria-label="Vice City video"
                className="absolute inset-0 w-full h-full object-cover z-2"
              />

              {/* الكانفاس */}
              <canvas
                ref={canvasRef}
                width={1920}
                height={720}
                className="absolute inset-0 w-full h-full object-cover z-1"
              />
            </div>

            {/* الصورة فوق الفيديو */}
            <div className="absolute inset-0 max-w-full h-auto z-10">
              <Image
                src="/images/Place/vice-city/overlay.webp"
                alt="Vice City"
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 rounded-full button-vicecity  group-hover:scale-[1.0195] group-hover:bg-gta-yellow transition-transform duration-500 flex items-center justify-center bg-gta-white font-semibold font-round z-10 ease-in-out">
            Explore Vice City
          </div>
        </button>
      </div>
      <Overlay_ViceCity
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </section>
  );
}

export default ViceCity;
