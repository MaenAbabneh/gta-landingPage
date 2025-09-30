"use client";
import { useEffect,useState } from 'react';

// ✅ حدد هنا قائمة الأصول الهامة التي يجب انتظارها
const criticalAssets = [
  '/images/big-hero-text.svg',
  '/images/heroKeyArt.jpg',
  "/images/People/jason/Jason-1.webp",
  "/images/hero-bg.webp",
  "/images/logo.webp",

];

export default function ClientLoader({ children, loadingUI }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // نستخدم Promise.all للتأكد من اكتمال تحميل كل الأصول الهامة
    Promise.all(
      criticalAssets.map(src =>
        fetch(src).then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch ${src}`);
          }
        })
      )
    )
    .then(() => {
      // بعد اكتمال التحميل، نخفي شاشة التحميل
      console.log("✅ Critical assets preloaded successfully.");
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to preload critical assets:", err);
      setLoading(false); // أخفِ شاشة التحميل حتى لو فشل التحميل
    });
  }, []);

  // إذا كانت الحالة "تحميل"، اعرض شاشة التحميل. وإلا، اعرض محتوى الصفحة.
  return loading ? loadingUI : children;
}