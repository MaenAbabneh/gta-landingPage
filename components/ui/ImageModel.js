"use client";

import { useGSAP } from "@gsap/react";
import * as Dialog from "@radix-ui/react-dialog";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useLazyImage } from "@/hooks/useLazyImage";

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
  placeholder,
  enableLazyLoad = true,
  iscal = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const buttonRef = useRef(null);
  const portalRef = useRef(null);
  const modalImageRef = useRef(null);
  const modalBgRef = useRef(null);
  const vignetteRef = useRef(null);
  const modalBurgerRef = useRef(null);

  const {
    src: lazySrc,
    containerRef,
    isLoaded,
  } = useLazyImage(src, placeholder, { rootMargin: "1500px" });

  const finalSrc = enableLazyLoad ? lazySrc || placeholder : src;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { requestLock, releaseLock } = useScrollLockContext();

  useEffect(() => {
    if (isOpen) {
      requestLock();
      return () => {
        releaseLock();
      };
    }
    return undefined;
  }, [isOpen, requestLock, releaseLock]);

  useGSAP(
    () => {
      if (!isOpen) return;

      const portal = portalRef.current;
      const button = buttonRef.current;
      const modalImage = modalImageRef.current;
      const modalBg = modalBgRef.current;
      const vignette = vignetteRef.current;
      const modalBurger = modalBurgerRef.current;

      if (!portal || !button || !modalImage || !modalBg || !vignette) return;

      if (isOpen) {
        const rect = button.getBoundingClientRect();

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

        const state = Flip.getState(modalImage);

        const finalSrc = viewerImg || src;

        const runFlipWithSize = (finalW, finalH) => {
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

          Flip.from(state, {
            duration: 0.5,
            ease: "expo.in",
            onStart: () => {
              const tl = gsap.timeline();
              tl.to(
                modalBg,
                { opacity: 1, duration: 1, ease: "power2.out" },
                0.5
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
              runFlipWithSize(window.innerWidth, window.innerHeight);
            };
          }
        } else {
          runFlipWithSize(window.innerWidth, window.innerHeight);
        }
      } else if (!isOpen && isMounted) {
      }
    },
    { dependencies: [isOpen], scope: portalRef }
  );

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
      duration: 0.75,
      ease: "expo.out",
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setIsOpen(true);
        else closeModal();
      }}
    >
      <Dialog.Trigger asChild>
        <button
          ref={(el) => {
            buttonRef.current = el;
            if (enableLazyLoad) containerRef.current = el;
          }}
          onClick={openModal}
          className={`relative ${ButtonStyle} `}
          aria-label={`Open ${alt || "image"} in modal`}
        >
          <div
            ref={fadeImageRef}
            className={`group relative max-w-full h-full overflow-hidden ${iscal ? "bg-gta-blue" : "bg-gta-yellow"} `}
          >
            <Image
              suppressHydrationWarning={true}
              src={finalSrc}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              unoptimized
              className={`${className} scale-100 group-hover:scale-[.983] transition-all duration-500  ${
                !isLoaded && enableLazyLoad ? "blur-md" : ""
              }`}
            />
            <span
              className={`flex items-center justify-center w-18 h-18 md:w-12 md:h-12 absolute bottom-0 right-0 m-5 rounded-full ${iscal ? "bg-gta-dark-blue group-hover:bg-gta-blue" : "bg-gta-gray group-hover:bg-gta-yellow"} transition-colors duration-300 ease-in-out`}
            >
              <ExpandedArrow
                className={`w-7 h-7 md:w-5 md:h-5 ${iscal ? "text-gta-blue group-hover:text-gta-dark-blue" : "text-gta-yellow group-hover:text-gta-gray"} `}
              />
            </span>
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal forceMount>
        {isMounted && isOpen && (
          <Dialog.Content
            ref={portalRef}
            className="fixed inset-0 z-[999]"
            onEscapeKeyDown={(e) => {
              e.preventDefault();
              closeModal();
            }}
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <div
              ref={modalBgRef}
              className="modal-bg fixed inset-0 bg-black"
              onClick={closeModal}
            />
            <Dialog.Title className="sr-only">
              {alt || "image View"}
            </Dialog.Title>
            <Dialog.Description id="image-desc" className="sr-only">
              Fullscreen view {alt || "image"}
            </Dialog.Description>
            {/* هذا العنصر هو الذي يتم تحريكه بالكامل */}
            <div ref={modalImageRef} className="modal-image absolute">
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
                  ref={vignetteRef}
                  className="vignette absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
              </div>
            </div>

            <div
              ref={modalBurgerRef}
              className="modal-burger absolute top-5 right-5 z-50 pointer-events-auto"
            >
              <Burger
                isMenuOpen={true}
                setIsMenuOpen={closeModal}
                isOpenStyle="modal-burger burger-lightbox hover:bg-gta-gray-dark transition-colors"
                spanStyleUp="!bg-gta-pink"
                spanStyleDown="!bg-gta-pink"
              />
            </div>
            <Dialog.Close className="sr-only">Close</Dialog.Close>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageModal;
