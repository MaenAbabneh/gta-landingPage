"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin,ScrollTrigger   } from "gsap/all";
import { usePathname } from "next/navigation";

import Hero from "../components/sections/Hero";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const pathname = usePathname();

  useGSAP(() => {
    const sectionId = pathname.substring(1); 
    if (sectionId && document.getElementById(sectionId)) {
      const timer = setTimeout(() => {
        gsap.to(window, {
          duration: 0,
          scrollTo: `#${sectionId}`,
          ease: "power2.inOut"
        });
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [pathname]); 


  return (
    <main>
      <Hero />
      <section id="jason" className="h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-center pt-20">People Section</h2>
      </section>
      <section id="lucia" className="h-screen bg-gray-200">
        <h2 className="text-3xl font-bold text-center pt-20">Places Section</h2>
      </section>
      <section id="vice-city" className="h-screen bg-gray-300">
        <h2 className="text-3xl font-bold text-center pt-20">Downloads Section</h2>
      </section>
      
    </main>
  );
}
