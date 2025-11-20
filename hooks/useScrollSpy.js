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

    const triggers = [];

    sectionsToTrack.forEach((item, index) => {
      // Clean the href and ensure it's a valid section name
      let sectionName = item.href.replace(/^\/+|#+/g, ""); // Remove leading slashes and hashes

      // Skip empty or invalid section names
      if (!sectionName || sectionName.includes("/")) {
        return;
      }

      const sectionId = `#${sectionName}`; // Create proper ID selector

      // Check if element exists before creating ScrollTrigger
      if (!document.querySelector(sectionId)) {
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: sectionId,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSection(sectionName);
          window.history.replaceState(
            { fromScroll: true },
            "",
            `/`
          );
        },
        onEnterBack: () => {
          setActiveSection(sectionName);
          window.history.replaceState(
            { fromScroll: true },
            "",
            `/`
          );
        },
        // Clear active state ONLY when scrolling past the last section
        onLeave: () => {
          if (index === sectionsToTrack.length - 1) {
            setActiveSection("");
            window.history.replaceState({ fromScroll: true }, "", "/");
          }
        },
        // Clear active state ONLY when scrolling before the first section
        onLeaveBack: () => {
          if (index === 0) {
            setActiveSection("");
            window.history.replaceState({ fromScroll: true }, "", "/");
          }
        },
      });
      triggers.push(trigger);
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return activeSection;
}
