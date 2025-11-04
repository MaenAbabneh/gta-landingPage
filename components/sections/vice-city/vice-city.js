"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useResponsiveVideo } from "@/hooks/useResponsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Overlay_ViceCity  from "./overlay-viceCity";

gsap.registerPlugin(ScrollTrigger);

function ViceCity() {
  const containerRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const bgRef = useRef(null);

  const videoSrc = useResponsiveVideo("Vice_City_tazkqo");

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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

      gsap.set(containerRef.current, { marginTop: "30vh" });

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
            start: "top bottom", // يبدأ قبل دخول السكشن
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
      ref={containerRef}
      className="h-dvh w-full overflow-hidden"
    >
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full vicecity-bg pointer-events-none -z-10"
        style={{ opacity: 0 }}
      />
      <div className="cal-gallary">
        <button
          onClick={() => {
            setIsOverlayOpen(true);
          }}
          ref={FirstVideoRef}
          className=" col-[content-start/content-end] aspect-[3/2] relative group opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer  "
        >
          <div className="relative w-full h-full overflow-hidden scale-100 rotate-0 group-hover:scale-[1.015] group-hover:rotate-[0.5deg] transition-transform duration-500">
            {/* الفيديو والكانفاس في div منفصل */}
            <div className="absolute inset-0 w-full h-full z-0">
              {/* الفيديو */}
              <video
                ref={videoRef}
                src={videoSrc}
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
          <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 rounded-full button-vicecity  group-hover:scale-[1.015] transition-transform duration-500 flex items-center justify-center bg-gta-white font-semibold font-round z-10">
            Explore Vice City
          </div>
        </button>
      </div>
      <Overlay_ViceCity
        onClose={() => setIsOverlayOpen(false)}
        isOpen={isOverlayOpen}
      />
    </section>
  );
}

export default ViceCity;
