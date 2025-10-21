"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useResponsiveVideo } from "@/hooks/useResponsive";
import { buildImageUrl } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

function JasonIntro() {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const storytextRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // استخدام الـ hook المحسن للحصول على فيديو متجاوب
  const videoSrc = useResponsiveVideo("intro_ff13rf");
  const posterUrl = buildImageUrl("intro_ff13rf", { videoThumbnail: true });

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video) return;

      const context = canvas.getContext("2d");

      gsap.set(introRef.current, { marginTop: "-100vh" });
      gsap.set(storytextRef.current, {
        opacity: 1,
        maskImage:
          "radial-gradient(at 50% 0vh, rgb(0, 0, 0) 120vh, rgba(0, 0, 0, 0) 200vh)",
      });
      gsap.set(FirstVideoRef.current, {
        filter: "brightness(0.2) blur(100px)",
        opacity: 0,
        maskImage:
          "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
      });
      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: "top top",
            end: "+=2000",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            onUpdate: (self) => {
              if (video.duration) {
                const newTime = self.progress * video.duration;
                if (Math.abs(newTime - video.currentTime) > 0.03) {
                  video.currentTime = newTime;
                }
              }
            },
          },
        });

        tl.fromTo(
          storytextRef.current,
          {
            scale: 1.4,
            backgroundImage: `radial-gradient(circle at 50% 200vh, rgb(255, 210, 123) 0%, rgb(223, 58, 147) 15%, rgb(92, 22, 99) 30%, rgba(32, 31, 66, 0) 50%)`,
          },
          {
            scale: 0.9,
            backgroundImage: `radial-gradient(circle at 40% 0vh, rgb(255, 179, 135) 0%, rgb(252, 82, 67) 70%, rgb(157, 47, 106) 100%, rgba(32, 31, 66, 0) 150%)`,
          }
        )
          .to(
            storytextRef.current,
            {
              maskImage:
                "radial-gradient(at 20% -120vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 50vh)",
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            FirstVideoRef.current,
            {
              opacity: 1,
              filter: "brightness(1) blur(0px)",
            },
            0
          )

          .to(
            FirstVideoRef.current,
            {
              maskImage:
                "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
              ease: "power1.inOut",
            },
            "<+=90%"
          )
          .to(FirstVideoRef.current, {
            opacity: 0,
            ease: "power1.inOut",
          });

        gsap.ticker.add(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        });
        return () => {
          gsap.ticker.remove(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          });
          tl.scrollTrigger.kill();
          tl.kill();
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
      scope: introRef,
      dependencies: [videoSrc], // إعادة التشغيل عند تغيير مصدر الفيديو
    }
  );

  return (
    <section
      id="jason-intro"
      ref={introRef}
      className="relative w-full h-dvh overflow-hidden "
    >
      <div
        ref={storyRef}
        className=" absolute z-2 inset-0 flex items-center h-screen w-screen justify-center px-6 md:px-20 lg:px-40 bg-transparent pb-10 "
      >
        <div
          ref={storytextRef}
          className="max-w-[900px] space-y-12 gradient-text"
        >
          <h3 className="text-start text-4xl md:text-6xl font-round font-black text-transparent ">
            Vice City, USA.
          </h3>
          <p className="text-start text-2xl md:text-[2rem] font-round font-bold tracking-tight text-transparent">
            Jason and Lucia have always known the deck is stacked against them.
            But when an easy score goes wrong, they find themselves on the
            darkest side of the sunniest place in America, in the middle of a
            criminal conspiracy stretching across the state of Leonida — forced
            to rely on each other more than ever if they want to make it out
            alive.
          </p>
        </div>
      </div>

      <div
        ref={FirstVideoRef}
        className="absolute z-0 w-full h-full overflow-hidden inset-0 "
      >
        <div className="h-dvh ">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterUrl}
            preload="metadata"
            playsInline
            muted
            aria-label="Jason embracing Lucia while looking into the distance."
            style={{
              display: "none",
              crossOrigin: "anonymous",
            }}
          />

          <canvas
            ref={canvasRef}
            className="h-screen w-screen object-cover [object-position:70%_center] md:[object-position:20%_center] aspect-[4/3] md:aspect-[16/9]"
            style={{
              imageRendering: "optimizeSpeed",
              willChange: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default JasonIntro;
