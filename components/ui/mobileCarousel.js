"use client";

import { useRef, useState, useEffect } from "react";
import ImageModel from "@/components/ui/ImageModel";
import { gsap } from "gsap";

/**
 * @typedef {object} SlideProps
 * @property {string} src - مسار الصورة الرئيسية.
 * @property {string} viewerImg - مسار الصورة لعارض الصور.
 * @property {string} alt - النص البديل للصورة.
 * @property {string} sizes - خاصية sizes للصور المتجاوبة.
 * @property {string} placeholder - Placeholder للصورة.
 * @property {string} className - أصناف CSS إضافية للصورة.
 */

/**
 * @param {{slides: SlideProps[]}} props
 */
function MobileCarousel({ slides }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current.children[index];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const getX = (e) => (e.clientX || e.touches?.[0]?.clientX) ?? 0;

  const handleDragStart = (e) => {
    if (e.button === 0 || e.touches) {
      setIsDragging(true);
      setDragStartX(getX(e));
      setInitialScrollLeft(carouselRef.current.scrollLeft);
      gsap.killTweensOf(carouselRef.current);
      carouselRef.current.style.scrollBehavior = "auto";
      carouselRef.current.style.touchAction = "none";
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();

    const currentX = getX(e);
    const dragDistance = currentX - dragStartX;

    const maxScroll =
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const targetScroll = initialScrollLeft - dragDistance;

    let overscrollValue = 0;

    if (targetScroll < 0) {
      overscrollValue = -targetScroll * 0.3;
    } else if (targetScroll > maxScroll) {
      overscrollValue = (maxScroll - targetScroll) * 0.3;
    }

    if (overscrollValue !== 0) {
      gsap.set(carouselRef.current, { x: overscrollValue });
    } else {
      gsap.set(carouselRef.current, { x: 0 });
      carouselRef.current.scrollLeft = targetScroll;
    }
  };

  const handleDragEnd = (e) => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);

    carouselRef.current.style.touchAction = "auto";

    const container = carouselRef.current;
    const containerCenterScroll =
      container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    Array.from(container.children).forEach((child, idx) => {
      const childCenterScroll = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenterScroll - childCenterScroll);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    // حدّث الحالة فورًا لتفادي أي تصادم في الواجهة
    setActiveIndex(closestIndex);

    // إعادة قيمة التحويل (x) إلى 0 ثم التمرير إلى الشريحة الأقرب
    gsap.to(container, {
      x: 0,
      duration: 0.3,
      ease: "power3.out",
      onComplete: () => scrollToSlide(closestIndex),
    });

    container.style.scrollBehavior = "smooth";
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleDragStart, { passive: true });
    el.addEventListener("touchmove", handleDragMove, { passive: false });
    el.addEventListener("touchend", handleDragEnd, { passive: true });
    el.addEventListener("touchcancel", handleDragEnd, { passive: true });

    el.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      el.removeEventListener("touchstart", handleDragStart);
      el.removeEventListener("touchmove", handleDragMove);
      el.removeEventListener("touchend", handleDragEnd);
      el.removeEventListener("touchcancel", handleDragEnd);

      el.removeEventListener("mousedown", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [carouselRef.current, isDragging, dragStartX, initialScrollLeft]);

  const renderImage = (slide) => (
    <ImageModel
      src={slide.src}
      viewerImg={slide.viewerImg}
      alt={slide.alt}
      sizes={slide.sizes}
      placeholder={slide.placeholder}
      className={slide.className}
      ButtonStyle="w-full h-full"
    />
  );

  return (
    <>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-3 scrollbar-none w-full px-15"
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`min-w-[75vw] h-auto aspect-[9/16] snap-center overflow-hidden relative shrink-0 transform duration-300 ${activeIndex === idx ? " z-10" : ""}`}
          >
            {renderImage(slide)}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              activeIndex === idx
                ? "w-2 bg-gta-pink"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default MobileCarousel;
