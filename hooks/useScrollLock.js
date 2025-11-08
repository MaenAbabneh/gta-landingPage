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
  const scrollbarWidthRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const html = document.documentElement;

    if (isLocked) {
      // حساب عرض شريط التمرير قبل إخفائه
      scrollbarWidthRef.current =
        window.innerWidth - document.documentElement.clientWidth;

      // إيقاف Lenis (smooth scroll)
      lenis?.stop();

      // حفظ القيم الحالية
      prevOverflowRef.current = body.style.overflow;
      prevPaddingRightRef.current = body.style.paddingRight;
      prevOverscrollRef.current = html.style.overscrollBehavior;

      // إخفاء التمرير
      body.style.overflow = "hidden";

      // تعويض اختفاء الشريط لمنع القفزة الأفقية
      if (scrollbarWidthRef.current > 0) {
        body.style.paddingRight = `${scrollbarWidthRef.current}px`;
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

      // إعادة تعيين عرض scrollbar
      scrollbarWidthRef.current = 0;
    }

    // Cleanup: تأكد من الاسترجاع عند التفكيك
    return () => {
      if (isLocked) {
        lenis?.start();
        if (typeof window !== "undefined") {
          const body = document.body;
          const html = document.documentElement;
          body.style.overflow = "";
          body.style.paddingRight = "";
          html.style.overscrollBehavior = "";
        }
      }
    };
  }, [isLocked, lenis]);
}
