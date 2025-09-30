"use client";

import { useEffect } from "react";

import { cld } from "@/lib/cloudinary"; // استورد النسخة الموحدة

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

    const buildUrl = (a) => {
      if (a.url) return a.url;
      if (a.type === "image")
        return cld().image(a.id).format("auto").quality("auto").toURL();
      return cld().video(a.id).format("auto").quality("auto").toURL();
    };

    const prefetchImage = (url) => {
      try {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
      } catch {}
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;
    };

    const prefetchVideo = async (url) => {
      try {
        await fetch(url, {
          mode: "cors",
          cache: "default",
          credentials: "omit",
        });
      } catch {}
    };

    const run = async () => {
      const queue = assets.map((a) => ({ ...a, url: buildUrl(a) })); // مرتبة من الأعلى للأسفل

      const worker = async () => {
        while (!aborted && queue.length) {
          const item = queue.shift();
          if (!item) break;
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
