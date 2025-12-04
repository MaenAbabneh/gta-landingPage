"use client";

import { gsap } from "gsap";
import { useEffect,useRef, useState } from "react";

import ImageModel from "@/components/ui/ImageModel";

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

  const activeIndexRef = useRef(0);

  const interactionRef = useRef({
    isDragging: false,
    dragStartX: 0,
    initialScrollLeft: 0,
    lastX: 0,
  });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const child = container.children[index];
    if (!child) return;

    // compute target scroll so the child is centered inside the carousel container
    const targetScroll =
      child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2;

    // animate scrollLeft of the container (does not change page viewport)
    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => setActiveIndex(index),
    });
  };

  const getX = (e) => (e.clientX || e.touches?.[0]?.clientX) ?? 0;

  const handleDragStart = (e) => {
    if (e.button === 0 || e.touches) {
      const cur = interactionRef.current;
      const startX = getX(e);
      cur.isDragging = true;
      cur.dragStartX = startX;
      cur.lastX = startX;
      cur.initialScrollLeft = carouselRef.current.scrollLeft;
      gsap.killTweensOf(carouselRef.current);
      carouselRef.current.style.scrollBehavior = "auto";
      carouselRef.current.style.touchAction = "grabbing";
    }
  };

  const handleDragMove = (e) => {
    const cur = interactionRef.current;
    if (!cur.isDragging || !carouselRef.current) return;
    e.preventDefault();

    const currentX = getX(e);
    cur.lastX = currentX;
    const dragDistance = currentX - cur.dragStartX;

    const maxScroll =
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const targetScroll = cur.initialScrollLeft - dragDistance;

    let overscrollValue = 0;

    if (targetScroll < 0) {
      overscrollValue = -targetScroll * 0.4;
    } else if (targetScroll > maxScroll) {
      overscrollValue = (maxScroll - targetScroll) * 0.4;
    }

    if (overscrollValue !== 0) {
      gsap.set(carouselRef.current, { x: overscrollValue });
    } else {
      gsap.set(carouselRef.current, { x: 0 });
      carouselRef.current.scrollLeft = targetScroll;
    }
  };

  const handleDragEnd = (e) => {
    const cur = interactionRef.current;
    if (!cur.isDragging || !carouselRef.current) return;
    cur.isDragging = false;
    carouselRef.current.style.touchAction = "auto";

    const currentX = cur.lastX;
    const dragDistance = currentX - cur.dragStartX;
    const threshold = 25;

    const steps = Math.abs(dragDistance) > threshold ? 1 : 0;
    const direction = dragDistance < 0 ? 1 : -1;

    let targetIndex = activeIndexRef.current + direction * steps;
    targetIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));

    setActiveIndex(targetIndex);

    const container = carouselRef.current;
    const child = container.children[targetIndex];

    if (!child) return;

    let targetScroll = child
      ? child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2
      : container.scrollLeft;

    gsap.to(container, {
      x: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollLeft: targetScroll,
      onComplete: () => {
        carouselRef.current.style.scrollBehavior = "smooth";
      },
    });
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
  }, []);

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
    <div className="flex flex-col items-center img-fade">
      <div
        ref={carouselRef}
        className="flex overflow-hidden gap-3 scrollbar-none will-change-transform w-full px-15 touch-pan-y"
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`min-w-[75vw] h-auto aspect-[9/16] snap-center overflow-hidden  [object-position:center_center] relative shrink-0 transform duration-300 ${activeIndex === idx ? " z-10" : ""}`}
          >
            {renderImage(slide)}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center bg-white/5 opacity-95 min-w-32 h-16 rounded-full my-15 gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={` rounded-full transition-all duration-300 ease-out ${
              activeIndex === idx
                ? "h-[11px] w-[11px] bg-gta-white"
                : "h-[10px] w-[10px] bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileCarousel;
