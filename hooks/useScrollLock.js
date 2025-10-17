import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

/**
 * Custom Hook لإيقاف وتفعيل التمرير + إخفاء شريط التمرير
 * @param {boolean} isLocked - حالة قفل التمرير (true = إيقاف, false = تفعيل)
 */
export function useScrollLock(isLocked) {
  const lenis = useLenis();

  // حفظ القيم الأصلية لاستعادتها
  const prevOverflowRef = useRef("");
  const prevPaddingRightRef = useRef("");
  const prevOverscrollRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const html = document.documentElement;

    if (isLocked) {
      // إيقاف Lenis (smooth scroll)
      lenis?.stop();

      // حفظ القيم الحالية
      prevOverflowRef.current = body.style.overflow;
      prevPaddingRightRef.current = body.style.paddingRight;
      prevOverscrollRef.current = html.style.overscrollBehavior;

      // حساب عرض شريط التمرير لتفادي اهتزاز المحتوى
      const scrollbarWidth = window.innerWidth - html.clientWidth;

      // إخفاء التمرير
      body.style.overflow = "hidden";

      // تعويض اختفاء الشريط لمنع القفزة الأفقية
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // منع سلوك overscroll (خصوصاً على iOS)
      html.style.overscrollBehavior = "none";
    } else {
      // إعادة التمرير
      lenis?.start();

      // استرجاع القيم الأصلية
      body.style.overflow = prevOverflowRef.current || "";
      body.style.paddingRight = prevPaddingRightRef.current || "";
      html.style.overscrollBehavior = prevOverscrollRef.current || "";
    }

    // Cleanup: تأكد من الاسترجاع عند التفكيك
    return () => {
      lenis?.start();
      if (typeof window === "undefined") return;
      const body = document.body;
      const html = document.documentElement;
      body.style.overflow = prevOverflowRef.current || "";
      body.style.paddingRight = prevPaddingRightRef.current || "";
      html.style.overscrollBehavior = prevOverscrollRef.current || "";
    };
  }, [isLocked, lenis]);
}