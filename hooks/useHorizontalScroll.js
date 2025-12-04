import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * Custom Hook لتحويل عجلة الماوس العمودية إلى تمرير أفقي سلس باستخدام Lenis
 * @param {React.RefObject} ref - مرجع العنصر الذي سيتم تطبيق التمرير الأفقي عليه
 * @param {boolean} isEnabled - تفعيل أو تعطيل التمرير الأفقي
 * @param {Object} options - خيارات Lenis (lerp, duration, etc.)
 */
export function useHorizontalScroll(ref, isEnabled = true, options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !isEnabled) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container,
      orientation: "horizontal", 
      gestureOrientation: "both",
      autoRaf: false, 
      wheelMultiplier: options.wheelMultiplier || 1,
      lerp: options.lerp || 0.1,
      duration: options.duration || 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });

    lenisRef.current = lenis;

    // استخدام gsap.ticker (نفس الطريقة في lenis.js)
    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ref, isEnabled, JSON.stringify(options)]);

  return lenisRef;
}
