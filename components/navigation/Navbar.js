"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useScrollLockContext } from "@/context/ScrollLockContext";

import Burger from "../ui/burger";
import { MainLogo } from "../ui/svg";
import { useTrailer } from "@/context/TrailerContext";
import OverlayMenu from "./overlayNav/overlayMenu";

gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const { openTrailer } = useTrailer();

  const { requestLock, releaseLock } = useScrollLockContext();
  useEffect(() => {
    if (isMenuOpen) {
      requestLock();
      return () => releaseLock();
    }
    return undefined;
  }, [isMenuOpen, requestLock, releaseLock]);

  const handleLinkClick = (href) => {
    // التحقق إذا كان العنصر المنقور عليه هو trailer
    if (typeof href === "object" && href.video_ID) {
      // إغلاق القائمة الرئيسية
      setIsMenuOpen(false);
      // افتح التريلر عبر context
      openTrailer(href);
      return;
    }

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
      duration: 0.1,
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
        setIsMenuOpen={setIsMenuOpen}
      />

    </nav>
  );
}

export default Navbar;
