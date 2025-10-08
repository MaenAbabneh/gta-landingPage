import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Custom Hook لإيقاف وتفعيل التمرير
 * @param {boolean} isLocked - حالة قفل التمرير (true = إيقاف, false = تفعيل)
 */
export function useScrollLock(isLocked) {
  const lenis = useLenis();

  useEffect(() => {
    if (isLocked) {
      // إيقاف Lenis (smooth scroll)
      lenis?.stop();

      // إيقاف التمرير العادي
    } else {
      // تفعيل Lenis مجدداً
      lenis?.start();

      // استعادة التمرير العادي
    }

    // Cleanup function
    return () => {
      lenis?.start();
    };
  }, [isLocked, lenis]);
}
