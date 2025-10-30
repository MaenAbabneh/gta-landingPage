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
  viewerImg,
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

  useGSAP(
    () => {
      if (!isOpen) return;

      const portal = portalRef.current;
      const button = buttonRef.current;
      if (!portal || !button) return;

      const rect = button.getBoundingClientRect();

      const modalImage = portal.querySelector(".modal-image");
      const modalBg = portal.querySelector(".modal-bg");
      const vignette = portal.querySelector(".vignette");
      const modalBurger = portal.querySelector(".modal-burger");

      // الخطوة 1: جهّز الحالة الأولية للـ modal ليبدو مطابقًا للزر
      gsap.set(modalImage, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      gsap.set(modalBg, { opacity: 0 });
      gsap.set(vignette, { opacity: 0 });

      if (modalBurger) {
        gsap.set(modalBurger, {
          opacity: 0,
          pointerEvents: "none",
        });
      }

      // الخطوة 2: التقط هذه الحالة الأولية كنقطة بداية للأنيميشن
      const state = Flip.getState(modalImage);

      const finalSrc = viewerImg || src;

      const runFlipWithSize = (finalW, finalH) => {
        // ضع modalImage في الحالة النهائية (مركزيّة مع الحفاظ على الحجم)
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const top = Math.max(0, (vh - finalH) / 2);
        const left = Math.max(0, (vw - finalW) / 2);

        gsap.set(modalImage, {
          width: finalW,
          height: finalH,
          top,
          left,
        });

        // الخطوة 4: قم بالتحريك من الحالة الأولى إلى الحالة النهائية
        Flip.from(state, {
          duration: 0.7,
          ease: "expo.inOut",
          onStart: () => {
            // هنا نقوم بالأنيميشنات الداخلية التي لم تتغير
            const tl = gsap.timeline();
            tl.to(
              modalBg,
              { opacity: 1, duration: 0.6, ease: "power2.out" },
              0
            );
            tl.to(vignette, { opacity: 0.5, duration: 1.2 }, 0);

            if (modalBurger) {
              tl.to(
                modalBurger,
                {
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  pointerEvents: "auto",
                },
                0.9
              );
            }
          },
        });
      };

      // حاول تحميل الصورة للحصول على أبعادها الحقيقية
      if (finalSrc) {
        const probe = new window.Image();
        probe.src = finalSrc;
        const handle = () => {
          const naturalW = probe.naturalWidth || window.innerWidth;
          const naturalH = probe.naturalHeight || window.innerHeight;
          // قيّد الحجم ليتناسب مع نافذة العرض
          const scale = Math.min(
            1,
            Math.min(
              window.innerWidth / naturalW,
              window.innerHeight / naturalH
            )
          );
          runFlipWithSize(
            Math.round(naturalW * scale),
            Math.round(naturalH * scale)
          );
        };
        if (probe.complete) {
          handle();
        } else {
          probe.onload = handle;
          probe.onerror = () => {
            // في حال فشل تحميل الصورة، استخدم ملء الشاشة كاحتياط
            runFlipWithSize(window.innerWidth, window.innerHeight);
          };
        }
      } else {
        // لا يوجد مصدر نهائي، استخدم ملء الشاشة
        runFlipWithSize(window.innerWidth, window.innerHeight);
      }
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
    const vignette = portal.querySelector(".vignette");
    const modalBurger = portal.querySelector(".modal-burger");

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
      duration: 0.7,
      ease: "expo.inOut",
      onStart: () => {
        const tl = gsap.timeline();
        tl.to(vignette, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
        tl.to(modalBg, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
        if (modalBurger) {
          tl.to(
            modalBurger,
            {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: "power2.in",
              pointerEvents: "none",
            },
            0
          );
        }
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
        <div
          ref={fadeImageRef}
          className="group relative max-w-full h-full overflow-hidden"
        >
          <Image
            suppressHydrationWarning={true}
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
                    src={viewerImg}
                    alt={alt}
                    fill
                    sizes="100vw"
                    unoptimized
                    className={`${className} thumb-image`}
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
              isOpenStyle="modal-burger burger-lightbox hover:bg-gta-gray-dark transition-colors"
              spanStyleUp=" !bg-gta-pink"
              spanStyleDown="!bg-gta-pink"
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageModal;
