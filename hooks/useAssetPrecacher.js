"use client";

import { useEffect } from "react";
import { cacheAsset, isCacheSupported } from "@/lib/cacheManager";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function useAssetPrecacher(
  assets,
  { maxConcurrent = 1, delayMs = 150 } = {}
) {
  useEffect(() => {
    if (!assets?.length) return;

    // احترم وضع توفير البيانات والشبكات البطيئة
    const conn = navigator.connection;
    if (conn?.saveData) return;
    if (conn && ["slow-2g", "2g"].includes(conn.effectiveType)) return;

    let aborted = false;

    // اختيار حجم الفيديو المناسب بناءً على حجم الشاشة
    const getVideoUrl = (urls) => {
      if (!urls) return null;
      const width = window.innerWidth;
      if (width < 768) return urls.mobile;
      if (width < 1280) return urls.tablet;
      return urls.desktop;
    };

    const prefetchImage = async (url) => {
      try {
        if (isCacheSupported()) {
          const cached = await cacheAsset(url);
          if (cached) return;
        }
        // Fallback: traditional prefetch

        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
      } catch {
        // Silently fail and continue
      }
      try {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = url;
      } catch {
        // Silently fail
      }
    };

    const prefetchVideo = async (url) => {
      try {
        if (isCacheSupported()) {
          const cached = await cacheAsset(url);
          if (cached) return;
        }
        // Fallback: simple fetch to warm browser cache
        await fetch(url, {
          mode: "cors",
          cache: "default",
          credentials: "omit",
        });
      } catch {
        // Silently fail
      }
    };

    const run = async () => {
      // تحضير قائمة العناصر مع URLs الصحيحة
      const queue = assets.map((a) => {
        if (a.type === "image") {
          return { ...a };
        } else {
          // للفيديوهات، اختر URL المناسب من urls object
          return { ...a, url: getVideoUrl(a.urls) };
        }
      });

      const worker = async () => {
        while (!aborted && queue.length) {
          const item = queue.shift();
          if (!item?.url) continue;
          if (item.type === "image") prefetchImage(item.url);
          else await prefetchVideo(item.url);
          if (delayMs) await sleep(delayMs);
          await new Promise((r) =>
            "requestIdleCallback" in window
              ? requestIdleCallback(() => r())
              : setTimeout(r, 0)
          );
        }
      };

      const workers = Array.from(
        { length: Math.max(1, maxConcurrent) },
        worker
      );
      await Promise.all(workers);
    };

    const start = () => {
      if (aborted) return;
      const kick = () =>
        "requestIdleCallback" in window
          ? requestIdleCallback(run, { timeout: 3000 })
          : setTimeout(run, 1500);
      if (document.readyState === "complete") kick();
      else window.addEventListener("load", kick, { once: true });
    };

    start();
    return () => {
      aborted = true;
    };
  }, [maxConcurrent, delayMs, assets]);
}
