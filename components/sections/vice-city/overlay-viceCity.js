"use client";

import { useGSAP } from "@gsap/react";
import * as Dialog from "@radix-ui/react-dialog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ImageModel from "@/components/ui/ImageModel";
import { FullArrowSvg } from "@/components/ui/svg";
import { ViceCityImage } from "@/constants/assest";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

function Overlay_ViceCity({ isOpen, onClose }) {
  const continuarRef = useRef(null);
  const overlaybgRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const gallaryRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const vicecityStoryRef = useRef(null);
  const vicecityImageRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const { requestLock, releaseLock } = useScrollLockContext();

  useEffect(() => {
    if (isMounted) {
      requestLock();
      return () => {
        releaseLock();
      };
    }
    return undefined;
  }, [isMounted, requestLock, releaseLock]);

  useHorizontalScroll(scrollContainerRef, isMounted, {
    lerp: 0.1,
    duration: 1.2,
    wheelMultiplier: 1,
    smoothWheel: true,
  });

  // ✅ استخدام URLs المبنية مسبقاً
  const ImageOne = ViceCityImage.Image_1.url;
  const ImageTwo = ViceCityImage.Image_4.url;
  const ImageThree = ViceCityImage.Image_2.url;
  const ImageFour = ViceCityImage.Image_3.url;
  const ImageFive = ViceCityImage.Image_5.url;
  const ImageSix = ViceCityImage.Image_6.url;
  const ImageSeven = ViceCityImage.Image_7.url;
  const ImageEight = ViceCityImage.Image_8.url;
  const ImageNine = ViceCityImage.Image_9.url;

  const ImageViewerOne = ViceCityImage.Viewer_1.url;
  const ImageViewerTwo = ViceCityImage.Viewer_2.url;
  const ImageViewerThree = ViceCityImage.Viewer_3.url;
  const ImageViewerFour = ViceCityImage.Viewer_4.url;
  const ImageViewerFive = ViceCityImage.Viewer_5.url;
  const ImageViewerSix = ViceCityImage.Viewer_6.url;
  const ImageViewerSeven = ViceCityImage.Viewer_7.url;
  const ImageViewerEight = ViceCityImage.Viewer_8.url;
  const ImageViewerNine = ViceCityImage.Viewer_9.url;

  // ✅ Placeholders للصور
  const placeholderOne = ViceCityImage.Image_1.placeholder;
  const placeholderTwo = ViceCityImage.Image_4.placeholder;
  const placeholderThree = ViceCityImage.Image_2.placeholder;
  const placeholderFour = ViceCityImage.Image_3.placeholder;
  const placeholderFive = ViceCityImage.Image_5.placeholder;
  const placeholderSix = ViceCityImage.Image_6.placeholder;
  const placeholderSeven = ViceCityImage.Image_7.placeholder;
  const placeholderEight = ViceCityImage.Image_8.placeholder;
  const placeholderNine = ViceCityImage.Image_9.placeholder;

  useGSAP(
    () => {
      if (
        !overlaybgRef.current ||
        !buttonRef.current ||
        !scrollContainerRef.current
      )
        return;

      const externalBtn = document.getElementById("viceCity-button");

      if (externalBtn) {
        gsap.set(externalBtn, {
          willChange: "transform",
          force3D: true,
          transition: "none !important",
          overwrite: "auto",
        });
      }

      gsap.set(
        [
          overlaybgRef.current,
          buttonRef.current,
          scrollContainerRef.current,
        ].filter(Boolean),
        { willChange: "transform, opacity", force3D: true }
      );

      // إخفاء شريط التمرير في البداية
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, {
          "--scrollbar-opacity": 0,
        });
      }

      if (isOpen && isMounted) {
        const tl = gsap.timeline({
          defaults: { ease: "linear" },
        });

        if (externalBtn) {
          tl.to(
            externalBtn,
            {
              xPercent: -150,
              rotate: -45,
              opacity: 0,
              duration: 1,
            },
            0
          )
            // ظهور الخلفية بنفس الوقت
            .fromTo(
              [overlaybgRef.current, bgRef.current],
              { opacity: 0 },
              { opacity: 1, duration: 0.3 },
              0.3
            )
            // ظهور الحاوية المنزلقة بالتزامن مع الخلفيات
            .fromTo(
              vicecityStoryRef.current,
              { opacity: 0, x: -500 },
              { opacity: 1, x: 0, duration: 0.5 },
              0.4
            )
            .fromTo(
              vicecityImageRef.current,
              {
                rotate: -10,
              },
              {
                rotate: -2,
                duration: 0.5,
              },
              0.4
            )
            .fromTo(
              gallaryRef.current,
              { x: 500, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5 },
              0.5
            )

            // ظهور زر الرجوع بالتزامن
            .fromTo(
              buttonRef.current,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.4 },
              0.3
            )
            // ظهور شريط التمرير بعد انتهاء كل الأنيميشنات
            .to(
              scrollContainerRef.current,
              {
                "--scrollbar-opacity": 1,
                duration: 0.8,
                ease: "power2.out",
              },
              ">"
            )

            // تنظيف تلميح GPU بعد الانتهاء
            .set(
              [
                externalBtn,
                overlaybgRef.current,
                buttonRef.current,
                scrollContainerRef.current,
              ].filter(Boolean),
              { clearProps: "willChange" }
            );
        }
      } else if (!isOpen && isMounted) {
        // أنيميشن الإغلاق
        const tl = gsap.timeline({
          defaults: { ease: "power2.in" },
          onComplete: () => {
            setIsMounted(false);
          },
        });

        tl.to(
          externalBtn || {},
          {
            xPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.in",
            clearProps: "transform !important",
          },
          0
        )
          .to(
            vicecityStoryRef.current,
            { opacity: 0, x: 500, duration: 0.3 },
            0
          )
          .to(gallaryRef.current, { x: 500, opacity: 0, duration: 0.3 }, 0)
          .to(vicecityImageRef.current, { rotate: 5, duration: 0.3 }, 0)
          .to(buttonRef.current, { opacity: 0, scale: 0.9, duration: 0.3 }, 0)
          .to(overlaybgRef.current, { opacity: 0, duration: 0.5 }, 0.2)
          .to(bgRef.current, { opacity: 0, duration: 0.5 }, 0.2)
          .to(
            scrollContainerRef.current,
            {
              "--scrollbar-opacity": 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          )
          // إعادة تفعيل transitions بعد تنظيف transforms تماماً
          .set(
            externalBtn || {},
            { clearProps: "transition,willChange" },
            "+=0.1"
          );

        return () => {
          gsap.set(
            [
              externalBtn,
              overlaybgRef.current,
              buttonRef.current,
              scrollContainerRef.current,
              tl.kill(),
            ].filter(Boolean),
            { clearProps: "willChange" }
          );
        };
      }
    },
    { scope: continuarRef, dependencies: [isOpen, isMounted] }
  );

  if (!isOpen && !isMounted) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal forceMount>
        <Dialog.Content
          className="fixed inset-0 z-[110] overflow-hidden flex flex-row"
          ref={continuarRef}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            closeModal();
          }}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => e.preventDefault()}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            visibility: isMounted ? "visible" : "hidden",
          }}
        >
          <Dialog.Title className="sr-only">Vice City Overlay</Dialog.Title>
          <Dialog.Description id="image-desc" className="sr-only">
            Vice City full overlay view
          </Dialog.Description>
          <div
            ref={overlaybgRef}
            className="fixed inset-0 vicecity-bg -z-10 "
          />

          <div
            ref={scrollContainerRef}
            className="flex flex-row items-end custom-scrollbar"
          >
            <div
              ref={vicecityStoryRef}
              className=" h-dvh  flex flex-col md:flex-row gap-10 md:gap-30 justify-center items-center pl-20 pr-30 md:pl-50 md:pr-20 "
            >
              <div
                ref={vicecityImageRef}
                className="relative w-auto h-70 md:h-110 aspect-[3/2] -rotate-2 md:-rotate-4  "
              >
                <Image
                  src="/images/Place/vice-city/overlay.webp"
                  alt="Vice City Overlay"
                  fill
                  className="absolute inset-0 w-full h-full object-cover z-2"
                  sizes="100vw"
                  unoptimized
                />
                <Image
                  src="/images/Place/vice-city/poster.webp"
                  alt="Vice City Overlay"
                  fill
                  className="absolute inset-0 w-full h-full object-cover z-1"
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-2 md:gap-5 ">
                <div className="flex flex-col md:gap-5">
                  <q className="text-[2.8rem] md:text-[5rem] font-black font-long vicecity-quote leading-18 uppercase text-balance text-gta-pink-light">
                    Everything in Excess
                  </q>
                  <p className="text-[1.4rem] md:text-[1.6rem] leading-6 font-long font-black uppercase text-balance text-gta-yellow">
                    We're a long way from the '80s, but Vice City is still the
                    sun and fun capital of America.
                  </p>
                </div>
                <p className="text-[1.1rem] md:text-[1.2rem] font-round font-black leading-5 md:leading-6 md:w-110 text-gta-white">
                  The glamour, hustle, and greed of America captured in a single
                  city. Each neighborhood has something to offer, from the
                  pastel art deco hotels and bright white sands of Ocean Beach,
                  to the bustling panaderías of Little Cuba and the bootleg
                  brands of the Tisha-Wocka flea market, out to the VC Port, the
                  cruise ship capital of the world.
                </p>
              </div>
            </div>

            <div
              ref={gallaryRef}
              className="flex flex-nowrap gap-30 items-center self-center"
            >
              <div className="vicecity-grid gap-5 ">
                <div className="relative aspect-square w-auto h-[31vh] justify-self-end col-start-1 row-start-1">
                  <ImageModel
                    src={ImageThree}
                    viewerImg={ImageViewerTwo}
                    alt={ViceCityImage.Image_3.alt}
                    sizes={ViceCityImage.Image_3.size}
                    placeholder={placeholderThree}
                    className="object-cover [object-position:100%_center]"
                    ButtonStyle="w-full h-full "
                  />
                </div>
                <div className="relative aspect-[9/16] w-auto h-[75vh] self-center col-start-2 row-span-2">
                  <ImageModel
                    src={ImageFour}
                    viewerImg={ImageViewerThree}
                    alt={ViceCityImage.Image_4.alt}
                    sizes={ViceCityImage.Image_4.size}
                    placeholder={placeholderFour}
                    className="object-cover [object-position:0%_center]"
                    ButtonStyle="w-full h-full"
                  />
                </div>
                <div className="relative aspect-square w-auto  h-[65vh] self-end top-0 col-start-1 row-start-2">
                  <ImageModel
                    src={ImageOne}
                    viewerImg={ImageViewerOne}
                    alt={ViceCityImage.Image_1.alt}
                    sizes={ViceCityImage.Image_1.size}
                    placeholder={placeholderOne}
                    className="object-cover [object-position:40%_center]"
                    ButtonStyle="w-full h-full "
                  />
                </div>
              </div>

              <div className="vicecity-grid gap-5 ">
                <div className="relative aspect-[9/16] w-auto h-[100vh]  col-start-1 row-span-2">
                  <ImageModel
                    src={ImageTwo}
                    viewerImg={ImageViewerFour}
                    alt={ViceCityImage.Image_2.alt}
                    sizes={ViceCityImage.Image_2.size}
                    placeholder={placeholderTwo}
                    className="object-cover [object-position:20%_center]"
                    ButtonStyle="w-full h-full "
                  />
                </div>
                <div className="relative aspect-square w-auto h-[65vh] self-center col-start-2 row-span-2 ">
                  <ImageModel
                    src={ImageFive}
                    viewerImg={ImageViewerFive}
                    alt={ViceCityImage.Image_5.alt}
                    sizes={ViceCityImage.Image_5.size}
                    placeholder={placeholderFive}
                    className="object-cover [object-position:100%_center]"
                    ButtonStyle="w-full h-full"
                  />
                </div>
              </div>

              <div className="vicecity-grid">
                <div className="relative aspect-[9/16]  h-[75vh] w-auto col-start-1 row-span-2">
                  <ImageModel
                    src={ImageSix}
                    viewerImg={ImageViewerSix}
                    alt={ViceCityImage.Image_6.alt}
                    sizes={ViceCityImage.Image_6.size}
                    placeholder={placeholderSix}
                    className="object-cover [object-position:50%_center]"
                    ButtonStyle="w-full h-full "
                  />
                </div>
              </div>

              <div className="vicecity-grid gap-5">
                <div className="relative aspect-[9/16] w-auto h-[100vh] col-start-1 row-span-2">
                  <ImageModel
                    src={ImageSeven}
                    viewerImg={ImageViewerSeven}
                    alt={ViceCityImage.Image_7.alt}
                    sizes={ViceCityImage.Image_7.size}
                    placeholder={placeholderSeven}
                    className="object-cover [object-position:50%_center]"
                    ButtonStyle="w-full h-full"
                  />
                </div>
                <div className="relative aspect-square h-[65vh] w-auto self-center col-start-2 row-span-2 ">
                  <ImageModel
                    src={ImageEight}
                    viewerImg={ImageViewerEight}
                    alt={ViceCityImage.Image_8.alt}
                    sizes={ViceCityImage.Image_8.size}
                    placeholder={placeholderEight}
                    className="object-cover [object-position:100%_center]"
                    ButtonStyle="w-full h-full"
                  />
                </div>
              </div>

              <div className="vicecity-grid ">
                <div className="relative aspect-square w-auto h-[100vh]  col-span-2 row-span-2">
                  <ImageModel
                    src={ImageNine}
                    viewerImg={ImageViewerNine}
                    alt={ViceCityImage.Image_9.alt}
                    sizes={ViceCityImage.Image_9.size}
                    placeholder={placeholderNine}
                    className="object-cover [object-position:100%_center]"
                    ButtonStyle="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div ref={bgRef} className="overlay-bg -z-2 opacity-90">
            <Image
              src="/images/Place/vice-city/background.webp"
              alt="Vice City Overlay"
              fill
              className=" overlay-bg-Image select-none aspect-auto "
              sizes="100vw"
              unoptimized
            />
          </div>

          <button
            className="absolute top-8 left-8 md:top-4 md:left-4 lg:left-20 lg:top-15 z-[111] bg-gta-pink-light text-gta-gray rounded-full w-25 h-13  flex flex-row items-center justify-center gap-2 hover:bg-gta-pink/90 transition-colors duration-200 cursor-pointer"
            onClick={onClose}
            ref={buttonRef}
            aria-label="Close overlay"
          >
            <FullArrowSvg className="rotate-180 w-4" />
            <span className=" font-semibold font-round text-sm ">Back</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Overlay_ViceCity;
