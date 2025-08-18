"use client";

import { usePathname } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger , ScrollToPlugin  } from "gsap/all";

import IntegratedNavbar from "../components/navigation/IntegratedNavbar";
import Hero from "../components/sections/Hero";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  // الخطوة 2: قراءة المسار الحالي من الرابط
  const pathname = usePathname(); 

  // الخطوة 3: التمرير إلى القسم عند تحميل الصفحة
  useGSAP(() => {
    // استخلاص اسم القسم من الرابط (مثلاً "lucia" من "/lucia")
    const sectionId = pathname.substring(1); 

    // إذا كان هناك اسم قسم في الرابط ويوجد عنصر بهذا الـ ID
    if (sectionId && document.getElementById(sectionId)) {
      // انتظر قليلاً لضمان أن كل شيء قد تم عرضه، ثم قم بالتمرير
      const timer = setTimeout(() => {
        gsap.to(window, {
          duration: 0,
          scrollTo: `#${sectionId}`,
          ease: "power2.inOut"
        });
      }, 500); // تأخير نصف ثانية

      return () => clearTimeout(timer); // تنظيف المؤقت
    }
  }, [pathname]); // هذا التأثير يعتمد على الرابط ويعمل عند التحميل
  return (
    <main>
      <IntegratedNavbar />
      <Hero />
      
      {/* Test sections for people */}
      <section id="lucia" className="min-h-screen bg-blue-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Lucia Section</h2>
      </section>
      
      <section id="cal" className="min-h-screen bg-green-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Cal Section</h2>
      </section>
      
      <section id="boobie" className="min-h-screen bg-red-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Boobie Section</h2>
      </section>
      
      <section id="dre" className="min-h-screen bg-purple-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Dre Section</h2>
      </section>
      
      <section id="real" className="min-h-screen bg-yellow-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Real Section</h2>
      </section>
      
      <section id="raul" className="min-h-screen bg-orange-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Raul Section</h2>
      </section>
      
      <section id="brain" className="min-h-screen bg-pink-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Brain Section</h2>
      </section>
      
      {/* Test sections for places */}
      <section id="vice-city" className="min-h-screen bg-gray-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Vice City Section</h2>
      </section>
      
      <section id="leonida-keys" className="min-h-screen bg-teal-500 p-8 flex items-center justify-center">
        <h2 className="text-4xl text-white">Leonida Keys Section</h2>
      </section>
    </main>
  );
}
