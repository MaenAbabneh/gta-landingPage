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
      let sectionName = item.href.replace(/^\/+|\/+$/g, "").replace(/#+/g, "");

      if (!sectionName || sectionName.includes("/")) {
        return;
      }

      const sectionId = `#${sectionName}`;

      const el = document.querySelector(sectionId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        // markers: true,
        refreshPriority: -1,
        onEnter: () => {
          setActiveSection(sectionName);
          window.history.replaceState({ fromScroll: true }, "", `/`);
        },
        onEnterBack: () => {
          setActiveSection(sectionName);
          window.history.replaceState({ fromScroll: true }, "", `/`);
        },
        onLeave: () => {
          if (index === sectionsToTrack.length - 1) {
            setActiveSection("");
            window.history.replaceState({ fromScroll: true }, "", "/");
          }
        },
        onLeaveBack: () => {
          if (index === 0) {
            setActiveSection("");
            window.history.replaceState({ fromScroll: true }, "", "/");
          }
        },
      });
      triggers.push(trigger);
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return activeSection;
}
