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
      
      
    </main>
  );
}
