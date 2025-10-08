"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useScrollLock } from "@/hooks/useScrollLock";

import Burger from "./burger";
import { ExpandedArrow } from "./svg";

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
  const buttonRef = useRef(null); // مرجع للزر
  const portalRef = useRef(null); // مرجع للنافذة المنبثقة

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useScrollLock(isOpen);

  const { contextSafe } = useGSAP();

  const openModal = contextSafe(() => {
    const button = buttonRef.current;
    if (!button) return;

    // التقط rect للصورة الفعلية داخل الزر لضمان التطابق 1:1
    const imgEl = button.querySelector("img");
    const rect = (imgEl || button).getBoundingClientRect();
    const computed = window.getComputedStyle(imgEl || button);
    const borderRadius = computed.borderRadius;

    setIsOpen(true);

    gsap.delayedCall(0, () => {
      const portal = portalRef.current;
      if (!portal) return;

      const modalImage = portal.querySelector(".modal-image");
      const modalBg = portal.querySelector(".modal-bg");
      const thumbImg = portal.querySelector(".thumb-image");
      const viewerImg = portal.querySelector(".viewer-image");
      const zoomWrap = portal.querySelector(".zoom-wrap");
      const vignette = portal.querySelector(".vignette");

      // ابدأ من نفس المقاس والمكان تماماً
      gsap.set(modalImage, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        transformOrigin: "top left",
        borderRadius,
      });

      // حضّر التلاشي المتقاطع
      gsap.set(thumbImg, { opacity: 1 });
      gsap.set(viewerImg, { opacity: 0 });

      // حضّر تأثير الزوم الداخلي + تمويه بسيط كبداية (من المنتصف دائماً)
      gsap.set(zoomWrap, {
        scale: 1,
        filter: "blur(2px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      // فينييتة الحواف
      gsap.set(vignette, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

      // تكبير وتموضع للحجم النهائي (ملء الشاشة)
      tl.to(
        modalImage,
        {
          top: "0vh",
          left: "0vw",
          width: "100vw",
          height: "100vh",
          duration: 1.2,
        },
        0
      );

      // الزوم الداخلي + إزالة الـ blur تدريجياً
      tl.to(zoomWrap, { scale: 1, duration: 0.9 }, 0); // دفشة دخول
      tl.to(zoomWrap, { scale: 1, duration: 0.3 }, 0.9); // استقرار
      tl.to(zoomWrap, { filter: "blur(0px)", duration: 0.8 }, 0);

      // الخلفية
      tl.to(modalBg, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);

      // فينييتة تتناغم مع الدخول
      tl.to(vignette, { opacity: 0.5, duration: 1.2 }, 0);

      // فينييتة تتناغم مع الدخول
      tl.to(vignette, { opacity: 0.5, duration: 1.2 }, 0);

      // Crossfade: من نسخة المصغّر (cover) إلى نسخة العرض (contain)
      tl.to(thumbImg, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.15);
      tl.to(
        viewerImg,
        { opacity: 1, duration: 0.45, ease: "power2.out" },
        0.15
      );
    });
  });

  const closeModal = contextSafe(() => {
    const button = buttonRef.current;
    const portal = portalRef.current;
    if (!button || !portal) return;

    const imgEl = button.querySelector("img");
    const rect = (imgEl || button).getBoundingClientRect();

    const modalImage = portal.querySelector(".modal-image");
    const modalBg = portal.querySelector(".modal-bg");
    const thumbImg = portal.querySelector(".thumb-image");
    const viewerImg = portal.querySelector(".viewer-image");
    const zoomWrap = portal.querySelector(".zoom-wrap");
    const vignette = portal.querySelector(".vignette");

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // أعِد إظهار نسخة المصغّر وأخفِ نسخة العرض
    tl.to(viewerImg, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(thumbImg, { opacity: 1, duration: 0.2, ease: "power2.in" }, 0);

    // عكس الزوم مع تمويه خفيف للخروج
    tl.to(zoomWrap, { scale: 0.98, filter: "blur(1px)", duration: 0.6 }, 0);

    // أطفئ الفينييتة والخلفية بتناغم
    tl.to(vignette, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
    tl.to(modalBg, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);

    // العودة لنقطة البداية بدقة
    tl.to(
      modalImage,
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        duration: 0.6,
      },
      0
    ).add(() => setIsOpen(false));
  });

  return (
    <>
      <button
        ref={buttonRef}
        onClick={openModal}
        className={`relative  ${ButtonStyle}`}
        aria-label={`Open ${alt || "image"} in modal`}
        style={{ opacity: isOpen ? 0.2 : 1 }}
      >
        <div ref={fadeImageRef} className="group relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized
            className={`${className} border-gta-yellow ${isOpen ? "border-0" : "border-0 group-hover:border-6"} transition-all duration-300 ease-in-out`}
          />
          <span className="flex items-center justify-center w-12 h-12 absolute bottom-0 right-0 m-5 bg-gta-gray rounded-full group-hover:bg-gta-yellow transition-colors duration-300 ease-in-out">
            <ExpandedArrow className="w-5 h-5 text-gta-yellow group-hover:text-gta-gray  " />
          </span>
        </div>
      </button>

      {isMounted &&
        isOpen &&
        createPortal(
          <div ref={portalRef} className="fixed inset-0 z-[9998]">
            <div
              className="modal-bg fixed inset-0 bg-black opacity-0"
              onClick={closeModal}
            />

            <div
              className="modal-image absolute"
              style={{ willChange: "top,left,width,height" }}
            >
              <div
                className="zoom-wrap absolute inset-0 will-change-transform"
                style={{ willChange: "transform,filter" }}
              >
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
