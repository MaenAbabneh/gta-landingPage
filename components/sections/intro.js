"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useLazyVideo } from "@/hooks/useLazyVideo";

gsap.registerPlugin(ScrollTrigger);

function JasonIntro() {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const storytextRef = useRef(null);
  const FirstVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    videoUrl: videoSrc,
    posterUrl,
  } = useLazyVideo("intro_ff13rf", {
    eager: true,
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (ctx) => {
          let { isDesktop, isTablet, isMobile } = ctx.conditions;
          if (!videoSrc) return;

          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (!video) return;

          const context = canvas.getContext("2d");
          if (!canvas || !context) return;

          gsap.set(
            [FirstVideoRef.current, canvasRef.current, videoRef.current],
            {
              willChange: "transform, opacity, filter",
              force3D: true,
            }
          );

          if (isDesktop) {
            gsap.set(introRef.current, { marginTop: "-100vh" });
          } else if (isTablet) {
            gsap.set(introRef.current, { marginTop: "-100vh" });
          } else if (isMobile) {
            gsap.set(introRef.current, { marginTop: "-120vh" });
          }

          gsap.set(storytextRef.current, {
            opacity: 1,
            maskImage:
              "radial-gradient(at 50% 0vh, rgb(0, 0, 0) 120vh, rgba(0, 0, 0, 0) 200vh)",
          });
          gsap.set(FirstVideoRef.current, {
            // filter: "brightness(0.2) blur(100px)",
            opacity: 1,
            // maskImage:
            //   "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
          });
          const setupAnimation = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: introRef.current,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
                scrub: true,
                ease: "none",
                // markers: true,
                onUpdate: (self) => {
                  if (video.duration) {
                    const newTime = self.progress * video.duration;
                    if (Math.abs(newTime - video.currentTime) > 0.05) {
                      video.currentTime = newTime;
                    }
                  }
                },
              },
            });

            // tl.to(
            //   FirstVideoRef.current,
            //   {
            //     opacity: 1,
            //     filter: "brightness(1) blur(0px)",
            //     duration: 0.5,
            //   },
            //   0
            // )
            //   .fromTo(
            //     storytextRef.current,
            //     {
            //       opacity: 1,
            //       scale: 1,
            //       backgroundImage: `radial-gradient(circle at 50% 200vh, rgb(255, 210, 123) 0%, rgb(223, 58, 147) 15%, rgb(92, 22, 99) 30%, rgba(32, 31, 66, 0) 50%)`,
            //     },
            //     {
            //       opacity: 0,
            //       scale: 0.7,
            //       duration: 1,
            //       backgroundImage: `radial-gradient(circle at 40% 0vh, rgb(255, 179, 135) 0%, rgb(252, 82, 67) 70%, rgb(157, 47, 106) 100%, rgba(32, 31, 66, 0) 150%)`,
            //     },
            //     "<"
            //   )
            //   .to(
            //     storytextRef.current,
            //     {
            //       maskImage:
            //         "radial-gradient(at 20% -120vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 50vh)",
            //       duration: 1.5,
            //     },
            //     "<"
            //   )

            //   .to(
            //     FirstVideoRef.current,
            //     {
            //       maskImage:
            //         "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
            //       duration: 0.7,
            //     },
            //     "<80%"
            //   )
            //   .to(
            //     FirstVideoRef.current,
            //     {
            //       opacity: 0,
            //       duration: 0.5,
            //     },
            //     "<80%"
            //   )
            tl.to({}, { duration: 1 }, "<+=80%"); // empty tween to create a delay before cleanup

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
        }
      );
    },
    {
      scope: introRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      id="jason-intro"
      ref={introRef}
      className="relative w-full h-lvh overflow-hidden "
    >
      <div
        ref={storyRef}
        className=" absolute z-2 inset-0 flex items-center justify-start bg-transparent"
      >
        <div
          ref={storytextRef}
          className="flex flex-col items-start justify-start mx-3 md:mx-10 lg:mx-20 xl:mx-35 gradient-text"
        >
          <h3 className="story-heading-size font-round font-black text-transparent text-nowrap">
            Vice City, USA.
          </h3>
          <p className=" story-text-size font-round font-bold text-transparent text-pretty leading-4 md:leading-tight ">
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
        className="absolute z-0 inset-0 overflow-hidden "
      >
        <div className="h-lvh ">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterUrl}
            preload="auto"
            playsInline
            muted
            crossOrigin="anonymous"
            aria-label="Jason embracing Lucia while looking into the distance."
            className="w-full h-lvh object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center] aspect-video z-2 overflow-clip"
          />

          <canvas
            ref={canvasRef}
            className="w-full h-lvh object-cover [object-position:70%_center] md:[object-position:80%_center] xl:[object-position:90%_center] aspect-video z-1"
          />
        </div>
      </div>
    </section>
  );
}

export default JasonIntro;
