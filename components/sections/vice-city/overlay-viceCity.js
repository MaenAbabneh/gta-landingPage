"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks/useScrollLock";

function Overlay_ViceCity({ isOpen, onClose }) {
  const overlaybgRef = useRef(null);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useScrollLock(isMounted);

  useGSAP(() => {
    if (!overlaybgRef.current || !buttonRef.current) return;
    if (isOpen) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });
      tl.to({}, {}); // إضافة تأخير بسيط لضمان التشغيل السلس للأنيميشن
      tl.fromTo(
        overlaybgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0
      ).fromTo(
        buttonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "<"
      );
    } else if ((!isOpen, isMounted)) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setIsMounted(false);
        },
      });
      tl.fromTo(
        overlaybgRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6 },
        0
      ).fromTo(
        buttonRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.3 },
        "<"
      );
    }
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998]">
      {/* خلفية لإغلاق عند النقر */}
      <div
        ref={overlaybgRef}
        className="absolute inset-0 bg-gta-dark-slate z-0"
        onClick={onClose}
      />

      <button
        className="absolute top-8 right-8 md:top-4 md:right-4 lg:right-6 lg:top-6 z-[9999] bg-gta-gray text-white rounded-full w-15 h-15 sm:w-12 sm:h-12 flex flex-col items-center justify-center hover:bg-gta-gray-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
        onClick={onClose}
        ref={buttonRef}
        aria-label="Close overlay"
      >
        <span className="absolute left-1/2 top-1/2 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gta-pink"></span>
        <span className="absolute left-1/2 top-1/2 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gta-pink"></span>
      </button>
    </div>,
    document.body
  );
}

export default Overlay_ViceCity;
