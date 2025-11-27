import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

import { gtaData } from "@/constants/Links";

// ensure plugin is registered in case this hook mounts before other setup
gsap.registerPlugin(ScrollTrigger);

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState("");

  useGSAP(() => {
    const sectionsToTrack = Object.values(gtaData).flatMap((catagory) =>
      catagory.filter((item) => item.href)
    );

    const triggers = [];

    sectionsToTrack.forEach((item, index) => {
      // Clean the href and ensure it's a valid section name
      // remove leading/trailing slashes and any hashes
      let sectionName = item.href.replace(/^\/+|\/+$/g, "").replace(/#+/g, "");

      // Skip empty or invalid section names
      if (!sectionName || sectionName.includes("/")) {
        return;
      }

      const sectionId = `#${sectionName}`; // Create proper ID selector

      // Use the actual element (more reliable than a selector string)
      const el = document.querySelector(sectionId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        markers: true,
        refreshPriority:-1,
        onEnter: () => {
          setActiveSection(sectionName);
          window.history.replaceState(
            { fromScroll: true },
            "",
            `/${sectionName}`
          );
        },
        onEnterBack: () => {
          setActiveSection(sectionName);
          window.history.replaceState(
            { fromScroll: true },
            "",
            `/${sectionName}`
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

    // Force a refresh after triggers are created so start/end get calculated correctly.
    // a small delay ensures DOM layout and any smooth-scrolling proxy (e.g. Lenis) are ready.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return activeSection;
}
