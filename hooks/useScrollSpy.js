import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

import { gtaData } from "@/constants/Links";

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState("");

  useGSAP(() => {
    const sectionsToTrack = Object.values(gtaData).flatMap((catagory) =>
      catagory.filter((item) => item.href)
    );

    sectionsToTrack.forEach((item) => {
      // Clean the href and ensure it's a valid section name
      let sectionName = item.href.replace(/^\/+|#+/g, ""); // Remove leading slashes and hashes

      // Skip empty or invalid section names
      if (!sectionName || sectionName.includes("/")) {
        console.warn("Skipping invalid section:", item.href);
        return;
      }

      const sectionId = `#${sectionName}`; // Create proper ID selector

      // Check if element exists before creating ScrollTrigger
      if (!document.querySelector(sectionId)) {
        console.warn("Section element not found:", sectionId);
        return;
      }

      ScrollTrigger.create({
        trigger: sectionId,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSection(sectionName);
        },
        onEnterBack: () => {
          setActiveSection(sectionName);
        },
      });
    });
  }, []);
  

  return activeSection;
}
