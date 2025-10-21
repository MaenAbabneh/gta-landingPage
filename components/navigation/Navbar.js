"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { useState } from "react";

import { useScrollLock } from "@/hooks/useScrollLock";

import Burger from "../burger";
import { MainLogo } from "../svg";
import OverlayMenu from "./overlayNav/overlayMenu";

gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [hoveredItem, setHoveredItem] = useState(null);

  useScrollLock(isMenuOpen);

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);

    const sectionName = href.replace(/^\/+|#+/g, "");

    if (!sectionName) {
      return;
    }

    const target = document.getElementById(sectionName);
    if (!target) {
      return;
    }

    // تحديث URI بدون علامة fromScroll (لأن هذا من نقر مباشر)
    window.history.replaceState({}, "", `/${sectionName}`);

    gsap.to(window, {
      duration: 1.2,
      ease: "power2.inOut",
      scrollTo: {
        y: target,
        autoKill: true,
        offsetY: 0,
      },
    });
  };

  return (
    <nav className="nav z-50">
      <Link
        href="/"
        className={`${isMenuOpen ? "hidden" : "block"} GTA-VI-Logo group`}
      >
        <MainLogo
          ClassName={`${isMenuOpen ? "hidden" : "block"} main-logo  group-hover:text-gta-yellow`}
        />
        <span className="sr-only">GTA VI Logo</span>
      </Link>

      <Burger
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isOpenStyle="burgerOverlay"
      />

      <OverlayMenu
        isMenuOpen={isMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        handleLinkClick={handleLinkClick}
      />
    </nav>
  );
}

export default Navbar;
