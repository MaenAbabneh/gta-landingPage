"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useScrollLock } from "@/hooks/useScrollLock";

import Burger from "./burger";
import { ExpandedArrow } from "./svg";

gsap.registerPlugin(Flip);

const ImageModal = ({
  src,
  alt,
  className,
  sizes,
  ButtonStyle,
  fadeImageRef,
  priority = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef(null);
  const portalRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useScrollLock(isOpen);

  // تم نقل منطق الأنيميشن إلى useGSAP ليعتمد على تغيير isOpen
  useGSAP(
    () => {
      if (!isOpen) return;

      const portal = portalRef.current;
      const button = buttonRef.current;
      if (!portal || !button) return;

      const rect = button.getBoundingClientRect(); // أبعاد الزر الأصلي

      const modalImage = portal.querySelector(".modal-image");
      const modalBg = portal.querySelector(".modal-bg");
      const thumbImg = portal.querySelector(".thumb-image");
      const viewerImg = portal.querySelector(".viewer-image");
      const zoomWrap = portal.querySelector(".zoom-wrap");
      const vignette = portal.querySelector(".vignette");

      // الخطوة 1: جهّز الحالة الأولية للـ modal ليبدو مطابقًا للزر
      gsap.set(modalImage, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      gsap.set(thumbImg, { opacity: 1 });
      gsap.set(viewerImg, { opacity: 0 });
      gsap.set(modalBg, { opacity: 0 });
      // ... تحضير باقي العناصر الداخلية
      gsap.set(zoomWrap, { scale: 1, filter: "blur(2px)" });
      gsap.set(vignette, { opacity: 0 });

      // الخطوة 2: التقط هذه الحالة الأولية كنقطة بداية للأنيميشن
      const state = Flip.getState(modalImage);

      // الخطوة 3: حدد الحالة النهائية (ملء الشاشة)
      gsap.set(modalImage, {
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
      });

      // الخطوة 4: قم بالتحريك من الحالة الأولى إلى الحالة النهائية
      Flip.from(state, {
        duration: 1.2,
        ease: "expo.inOut",
        onStart: () => {
          // هنا نقوم بالأنيميشنات الداخلية التي لم تتغير
          const tl = gsap.timeline();
          tl.to(modalBg, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
          tl.to(zoomWrap, { filter: "blur(0px)", scale: 1, duration: 0.8 }, 0);
          tl.to(vignette, { opacity: 0.5, duration: 1.2 }, 0);
          tl.to(
            thumbImg,
            { opacity: 0, duration: 0.45, ease: "power2.out" },
            0.15
          );
          tl.to(
            viewerImg,
            { opacity: 1, duration: 0.45, ease: "power2.out" },
            0.15
          );
        },
      });
    },
    { dependencies: [isOpen], scope: portalRef }
  ); // يعتمد على isOpen

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    const portal = portalRef.current;
    const button = buttonRef.current;
    if (!portal || !button) return;

    const rect = button.getBoundingClientRect();

    const modalImage = portal.querySelector(".modal-image");
    const modalBg = portal.querySelector(".modal-bg");
    const thumbImg = portal.querySelector(".thumb-image");
    const viewerImg = portal.querySelector(".viewer-image");
    const zoomWrap = portal.querySelector(".zoom-wrap");
    const vignette = portal.querySelector(".vignette");

    // الخطوة 1: التقط الحالة الحالية (ملء الشاشة)
    const state = Flip.getState(modalImage);

    // الخطوة 2: حدد الحالة النهائية (العودة فوق الزر)
    gsap.set(modalImage, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    // الخطوة 3: قم بالتحريك من حالة ملء الشاشة إلى الحالة النهائية
    Flip.from(state, {
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => {
        const tl = gsap.timeline();
        tl.to(viewerImg, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
        tl.to(thumbImg, { opacity: 1, duration: 0.2, ease: "power2.in" }, 0);
        tl.to(zoomWrap, { scale: 0.98, filter: "blur(1px)", duration: 0.6 }, 0);
        tl.to(vignette, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
        tl.to(modalBg, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
      },
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={openModal}
        className={`relative ${ButtonStyle}`}
        aria-label={`Open ${alt || "image"} in modal`}
      >
        <div ref={fadeImageRef} className="group relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized
            className={`${className} border-gta-yellow border-0 group-hover:border-6 transition-all duration-300 ease-in-out`}
          />
          <span className="flex items-center justify-center w-12 h-12 absolute bottom-0 right-0 m-5 bg-gta-gray rounded-full group-hover:bg-gta-yellow transition-colors duration-300 ease-in-out">
            <ExpandedArrow className="w-5 h-5 text-gta-yellow group-hover:text-gta-gray" />
          </span>
        </div>
      </button>

      {isMounted &&
        isOpen &&
        createPortal(
          <div ref={portalRef} className="fixed inset-0 z-[9998]">
            <div
              className="modal-bg fixed inset-0 bg-black"
              onClick={closeModal}
            />

            {/* هذا العنصر هو الذي يتم تحريكه بالكامل */}
            <div className="modal-image absolute">
              <div
                className="zoom-wrap absolute inset-0"
                style={{ willChange: "transform,filter" }}
              >
                {/* الصورة الأولى (تبدأ بحجم الزر) */}
                <div className="absolute inset-0">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    unoptimized
                    className={`${className} thumb-image`}
                  />
                </div>

                {/* الصورة الثانية (التي تظهر في النهاية) */}
                <div className="absolute inset-0">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="100vw"
                    unoptimized
                    className="object-contain viewer-image"
                  />
                </div>

                <div
                  className="vignette absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
              </div>
            </div>

            <Burger
              isMenuOpen={true}
              setIsMenuOpen={closeModal}
              ClassName="absolute top-8 right-16 z-[9999]"
              isOpenStyle="bg-gta-gray hover:bg-gta-gray-dark transition-colors"
              spanStyleUp="!bg-gta-pink !h-0.5 !w-6 md:!w-4 !translate-y-0.5"
              spanStyleDown="!bg-gta-pink !h-0.5 !w-6 md:!w-4 !-translate-y-1"
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageModal;
