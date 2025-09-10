"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";

import Burger from "../burger";
import { MainLogo } from "../svg";
import OverlayMenu from "./overlayMenu";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);

    // Clean the href and extract section name
    const sectionName = href.replace(/^\/+|#+/g, ""); // Remove leading slashes and hashes

    // Skip if invalid section name
    if (!sectionName) {
      console.warn("Invalid href for scrolling:", href);
      return;
    }

    // Update URL immediately
    window.history.pushState({}, "", `/${sectionName}`);

    // Scroll to the section using the ID
    gsap.to(window, {
      duration: 1.5,
      scrollTo: `#${sectionName}`,
      ease: "power2.inOut",
    });
  };

  return (
    <>
      <nav className="fixed z-20  px-14 py-11  bg-transparent flex justify-between items-center justify-items-center">
        {!isMenuOpen && (
          <Link
            href="/"
            className="fixed top-16 md:top-12  left-14 inline-flex flex-row items-center justify-center w-button h-button box-border rounded-full outline-[4px] outline-transparent outline-solid"
          >
            <MainLogo />
            <span className="sr-only">GTA VI Logo</span>
          </Link>
        )}

        <Burger
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          ClassName="fixed z-50 top-12 right-14 "
        />
      </nav>
      <div className="fixed inset-0 pointer-events-none z-10">
        {isMenuOpen && (
          <OverlayMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            handleLinkClick={handleLinkClick}
          />
        )}
      </div>
    </>
  );
}

export default Navbar;
