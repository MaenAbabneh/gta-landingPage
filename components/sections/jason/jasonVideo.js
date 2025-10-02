"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { useResponsiveVideo } from "@/hooks/useResponsive";
import { buildImageUrl } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

function JasonVideo() {
  const videoTwoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const VideoRef = useRef(null);
  const canvasRef = useRef(null);
  const quoteRef = useRef(null);

  const videoSrc = useResponsiveVideo("Jason_Duval_2_so4cun");
  const posterUrl = buildImageUrl("Jason_Duval_2_so4cun", {
    videoThumbnail: true,
  });

  useGSAP(
    () => {
      if (!videoSrc) return;

      const video = VideoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");

      gsap.set(videoTwoRef.current, { marginTop: "-50vh" });
      gsap.set(canvasRef.current, { scale: 1.1 });
      gsap.set(quoteRef.current, { opacity: 0, y: 200 });
      gsap.set(videoOverlayRef.current, {
        maskImage:
          "radial-gradient(circle at 70vw 50vh, rgb(0, 0, 0) 30vw, rgb(0, 0, 0) 100vw)",
      });
      const drawVideoToCanvas = () => {
        if (context && video.readyState > 2) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      };
      let tl;
      let isVideoComplete = false;

      const setupAnimation = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoTwoRef.current,
            start: "top top",
            end: "+=3000 bottom",
            scrub: true,
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              isVideoComplete = false;
            },
            onUpdate: (self) => {
              if (video.duration) {
                if (isVideoComplete) {
                  if (video.currentTime !== video.duration) {
                    video.currentTime = video.duration;
                  }
                  return;
                }

                const videoScrubDuration = 1000;
                const scrollPassed = self.scroll() - self.start;
                let videoProgress = scrollPassed / videoScrubDuration;

                if (videoProgress <= 0) {
                  videoProgress = 0;
                } else if (videoProgress >= 1) {
                  videoProgress = 1;
                  isVideoComplete = true;
                }
                const newTime = videoProgress * video.duration;

                if (self.direction === 1 || videoProgress === 1) {
                  const timeDifference = Math.abs(newTime - video.currentTime);
                  if (timeDifference > 0.03 || videoProgress === 1) {
                    video.currentTime = newTime;
                  }
                }
              }
            },
          },
        });

        tl.fromTo(
          videoOverlayRef.current,
          { opacity: 0, duration: 1.5, ease: "power3.in" },
          {
            opacity: 1,
            duration: 0.1,
            ease: "power3.Out",
          },
          0
        )
          .to(
            quoteRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "none",
            },
            "<+0.5"
          )

          .add("videoEnd", 0.8)

          .to(
            canvasRef.current,
            {
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            "videoEnd"
          )
          .to(
            videoOverlayRef.current,
            {
              maskImage:
                "radial-gradient(circle at 70vw 25vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
              ease: "power2.inOut",
              duration: 1,
            },
            "<+0.1"
          )

          .add("fadeOut", "+=0.5")

          .fromTo(
            videoOverlayRef.current,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              ease: "power1.out",
              duration: 0.5,
            },
            "fadeOut"
          );

        tl.to(
          quoteRef.current,
          { y: "-90vh", duration: 1, ease: "none" },
          "fadeOut"
        );
        gsap.ticker.add(drawVideoToCanvas);
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
        gsap.ticker.remove(drawVideoToCanvas);
        if (tl) {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
          tl.kill();
        }
      };
    },
    {
      scope: videoTwoRef,
      dependencies: [videoSrc],
    }
  );

  return (
    <section
      ref={videoTwoRef}
      className="relative w-full h-[300vh] overflow-hidden "
    >
      <div className="absolute inset-0 h-dvh w-full">
        <div ref={videoOverlayRef}>
          <video
            ref={VideoRef}
            src={videoSrc}
            poster={posterUrl}
            muted
            aria-label="Video showing Jason Duval in various scenes"
            preload="metadata"
            playsInline
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            className="absoulte inset-0 h-full w-full object-cover [object-position:70%_center] md:[object-position:20%_center] aspect-[4/3] md:aspect-[16/9]"
            style={{
              imageRendering: "optimizeSpeed",
              willChange: "transform",
            }}
          />
        </div>
        <div
          ref={quoteRef}
          className="absolute inset-0 z-10 flex items-end justify-start text-center px-60 py-25 "
        >
          <q className="text-gta-yellow text-4xl md:text-[4.8rem] font-long font-bold uppercase leading-18">
            If anything happens,
            <br />
            <span className="inline-block pl-[1.4ch] ">
              I&apos;m right behind you.
            </span>
          </q>
        </div>
      </div>
    </section>
  );
}

export default JasonVideo;
