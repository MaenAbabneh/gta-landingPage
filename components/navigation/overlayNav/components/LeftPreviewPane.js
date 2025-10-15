"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { NavLogo } from "../../../svg";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

function LeftPreviewPane({ hoveredItem, activeTab, ref }) {
  const logoLayerRef = useRef(null);
  const imageLayer1Ref = useRef(null);
  const imageLayer2Ref = useRef(null);
  const leftColumRef = ref;

  const activeLayerRef = useRef(logoLayerRef);
  const isLayer1Next = useRef(true);
  const panTweenRef = useRef(null);

  useEffect(() => {
    // ١. (الحل) - أوقف كل الأنيميشنات السابقة على كل الطبقات
    gsap.killTweensOf([
      logoLayerRef.current,
      imageLayer1Ref.current,
      imageLayer2Ref.current,
    ]);
    if (panTweenRef.current) {
      panTweenRef.current.kill();
    }
    // ٢. تحقق مما إذا كان يجب عرض صورة جديدة أم لا
    const shouldShowImage =
      hoveredItem &&
      (activeTab === "People" || activeTab === "Places") &&
      hoveredItem.image;

    // -- الحالة الأولى: لا يوجد صورة لعرضها (أظهر الشعار) --
    if (!shouldShowImage) {
      if (activeLayerRef.current === logoLayerRef.current) return;

      gsap.to(activeLayerRef.current, { opacity: 0, duration: 0.4 });
      gsap.to(logoLayerRef.current, { opacity: 1, duration: 0.4 });
      activeLayerRef.current = logoLayerRef.current;
      return;
    }

    if (activeLayerRef.current?.dataset.src === hoveredItem.image) {
      return;
    }

    // -- الحالة الثانية: هناك صورة جديدة لعرضها --

    // حدد أي طبقة صورة هي التالية المتاحة
    const nextImageLayer = isLayer1Next.current
      ? imageLayer1Ref.current
      : imageLayer2Ref.current;
    nextImageLayer.src = hoveredItem.image;
    nextImageLayer.dataset.src = hoveredItem.image;

    gsap.set(nextImageLayer, { x: "0%" });
    // قم بتشغيل أنيميشن التلاشي المتقاطع
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        panTweenRef.current = gsap.fromTo(
          nextImageLayer,
          {
            x: "0%",
          },
          {
            x: "-50%",
            duration: 20,
            ease: "none",
            repeat: -1,
          }
        );
      },
    });
    // إخفاء الطبقة النشطة حاليًا
    tl.to(activeLayerRef.current, {
      opacity: 0,
      duration: 0.8,
    });
    // إظهار الطبقة التالية في نفس الوقت
    tl.to(nextImageLayer, { opacity: 1, duration: 0.8 }, "<");

    // حدّث الطبقة النشطة لتصبح هي الصورة الجديدة
    activeLayerRef.current = nextImageLayer;
    // قم بتبديل دور طبقة الصورة التالية للاستخدام في المرة القادمة
    isLayer1Next.current = !isLayer1Next.current;
  }, [hoveredItem, activeTab]);
  return (
    <div
      ref={leftColumRef}
      className=" h-full w-full col-[1/2] md:col-[1/3] lg:col-[1/4] justify-center hidden md:grid grid-cols-3 items-center "
    >
      <Image
        ref={imageLayer1Ref}
        src={transparentPixel} // المصدر الأولي فارغ
        alt=""
        fill
        sizes="50vw"
        className="absolute inset-0 object-cover opacity-0 pointer-events-none"
      />

      {/* طبقة الصورة الثانية */}
      <Image
        ref={imageLayer2Ref}
        src={transparentPixel} // المصدر الأولي فارغ
        alt=""
        fill
        sizes="50vw"
        className="absolute inset-0 object-cover opacity-0 pointer-events-none"
      />
      <div
        ref={logoLayerRef}
        className="logo-glow w-full h-full  col-start-1 col-span-3  flex items-center justify-center"
      >
        <NavLogo />
      </div>
    </div>
  );
}

export default LeftPreviewPane;