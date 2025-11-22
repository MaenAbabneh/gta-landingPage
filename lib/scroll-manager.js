// lib/scroll-manager.js

let lockCount = 0;
let lenisInstance = null;
let prevOverflow = "";
let prevHtmlOverflow = "";
let prevPaddingRight = "";
let prevScrollerPadding = "";
let prevScroller = null;
let prevOverscroll = "";
let subscribers = [];

// Returns the best scrollbar width available. First attempts the simple innerWidth/clientWidth diff,
// then checks potential scrollable container (Lenis or document.scrollingElement), and finally falls
// back to creating a temporary scroll element.
export const getScrollbarWidth = () => {
  if (typeof window === "undefined" || typeof document === "undefined")
    return 0;

  // 1) standard diff
  const diff = window.innerWidth - document.documentElement.clientWidth;
  if (diff > 0) return diff;

  // 2) if there is a custom scroller (e.g., Lenis), detect it and use its scrollbar width
  try {
    const scroller =
      document.querySelector(".lenis") ||
      document.scrollingElement ||
      document.documentElement;
    if (scroller && scroller !== document.documentElement) {
      const sDiff = scroller.offsetWidth - scroller.clientWidth;
      if (sDiff > 0) return sDiff;
    }
  } catch (e) {
    // ignore
  }

  // 3) fallback: create a small scroll div off-screen and measure its scrollbar
  try {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);
    const scrollbar = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbar > 0 ? scrollbar : 0;
  } catch (e) {
    return 0;
  }
};

export const initScrollManager = (lenis) => {
  lenisInstance = lenis;
  if (process.env.NODE_ENV === "development")
    console.debug(
      "[scroll-manager] initScrollManager called, lenis instance set"
    );
};

export const requestScrollLock = () => {
  lockCount++;
  // notify subscribers of change
  subscribers.forEach((cb) => cb(lockCount));
  if (process.env.NODE_ENV === "development")
    console.debug("[scroll-manager] requestScrollLock", { lockCount });
  if (lockCount === 1) {
    // Stop Lenis
    lenisInstance?.stop();
    if (process.env.NODE_ENV === "development")
      console.debug("[scroll-manager] lenisInstance.stop() called");

    // Save current styles
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const body = document.body;
      const html = document.documentElement;
      prevOverflow = body.style.overflow;
      prevHtmlOverflow = html.style.overflow;
      prevPaddingRight = body.style.paddingRight;
      prevOverscroll = html.style.overscrollBehavior;

      // Apply lock styles using !important to avoid overrides
      html.style.setProperty("overflow", "hidden", "important");
      body.style.setProperty("overflow", "hidden", "important");
      const scrollbar = getScrollbarWidth();
      // detect scroller - prefer explicit Lenis scroller if present
      const scroller =
        document.querySelector(".lenis") ||
        document.scrollingElement ||
        document.documentElement;
      if (scrollbar > 0) {
        if (
          scroller &&
          scroller !== document.body &&
          scroller !== document.documentElement
        ) {
          prevScroller = scroller;
          prevScrollerPadding = scroller.style.paddingRight;
          scroller.style.paddingRight = `${scrollbar}px`;
        } else {
          body.style.paddingRight = `${scrollbar}px`;
        }
      }
      html.style.overscrollBehavior = "none";
      if (process.env.NODE_ENV === "development")
        console.debug("[scroll-manager] applied lock styles", {
          bodyOverflow: body.style.overflow,
          paddingRight: body.style.paddingRight,
        });
    }
  }
};

export const releaseScrollLock = () => {
  if (lockCount === 0) return;

  lockCount--;
  // notify subscribers of change
  subscribers.forEach((cb) => cb(lockCount));
  if (lockCount === 0) {
    // Start Lenis
    lenisInstance?.start();
    if (process.env.NODE_ENV === "development")
      console.debug("[scroll-manager] lenisInstance.start() called");

    // Restore previous styles; use removeProperty where appropriate
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const body = document.body;
      const html = document.documentElement;
      if (prevHtmlOverflow) {
        html.style.overflow = prevHtmlOverflow;
      } else {
        html.style.removeProperty("overflow");
      }
      if (prevOverflow) {
        body.style.overflow = prevOverflow;
      } else {
        body.style.removeProperty("overflow");
      }
      // restore scroller padding if we modified it
      if (prevScroller) {
        prevScroller.style.paddingRight = prevScrollerPadding || "";
        prevScroller = null;
        prevScrollerPadding = "";
      } else {
        body.style.paddingRight = prevPaddingRight || "";
      }
      html.style.overscrollBehavior = prevOverscroll || "";
      if (process.env.NODE_ENV === "development")
        console.debug("[scroll-manager] restored styles", {
          bodyOverflow: body.style.overflow,
          paddingRight: body.style.paddingRight,
        });
    }

    // Clear saved styles
    prevOverflow = "";
    prevPaddingRight = "";
    prevOverscroll = "";
  }
};

export const getLockCount = () => lockCount;

export const isLocked = () => lockCount > 0;

export const onLockChange = (cb) => {
  if (typeof cb !== "function") return () => {};
  subscribers.push(cb);
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx !== -1) subscribers.splice(idx, 1);
  };
};
