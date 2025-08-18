"use client";

import { useState , useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { gtaData } from "@/constants/Links";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { OverlayMenu } from "./OverlayMenu";

gsap.registerPlugin(ScrollTrigger);

function IntegratedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [hoveredItem, setHoveredItem] = useState(null);
  const activeSection = useScrollSpy();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    
    // Clean the href and extract section name
    const sectionName = href.replace(/^\/+|#+/g, ''); // Remove leading slashes and hashes
    
    // Skip if invalid section name
    if (!sectionName) {
      console.warn('Invalid href for scrolling:', href);
      return;
    }
    
    // Update URL immediately
    window.history.pushState({}, '', `/${sectionName}`);
    
    // Scroll to the section using the ID
    gsap.to(window, {
      duration: 0,
      scrollTo: `#${sectionName}`,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      {/* Always visible navigation bar */}
      
      <nav className="fixed z-30 flex justify-between items-center pt-[3.1rem] pl-[4rem] pr-[3rem] w-full ">

        {/* Small "VI" logo - conditionally shown */}
        {!isMenuOpen && (
          <Link href="/">
            <Image
              src="/images/nav-logo.png"
              alt="VI Logo"
              width={36}
              height={30}
              className="cursor-pointer filter invert transition-all duration-200 hover:opacity-80"
            />
          </Link>
        )}

        {isMenuOpen && <div className="flex flex-1/2"></div>}

        {/* Empty div when menu is open to maintain layout */}

        {isMenuOpen && (
          <div className="flex-wrap w-full flex-1/3 hidden sm:flex">
            {Object.keys(gtaData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-6 md:py-4 rounded-full transition-all nav-font text-[0.98rem] tracking-wider cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "text-white hover:text-gta-yellow "
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Single state-toggle button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`rounded-full h-13 w-13 mr-3 transition-all duration-200 ease-in-out flex-none ${
            isMenuOpen
              ? "bg-white/5 hover:bg-white/10"
              : "bg-transparent hover:bg-white/5"
          }`}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col items-center justify-center gap-[0.35rem]">
            {/* First span - transforms from top hamburger line to part of X */}
            <span
              className={`bg-white transition-all duration-400 ease-in-out ${
                isMenuOpen
                  ? "rotate-45 translate-y-[4px] w-[1rem] h-[0.2rem] rounded-[1px]"
                  : "w-[1.7rem] h-[0.37rem] rounded-[1px]"
              }`}
            ></span>
            {/* Second span - transforms from bottom hamburger line to part of X */}
            <span
              className={`bg-white transition-all duration-400 ease-in-out ${
                isMenuOpen
                  ? "-rotate-45 translate-y-[-5px] w-[1rem] h-[0.2rem] rounded-[1px]"
                  : "w-[1.7rem] h-[0.37rem] rounded-[1px]"
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Full-screen overlay content - conditionally shown */}
      {isMenuOpen && (
         <OverlayMenu
          activeSection={activeSection}
          activeTab={activeTab}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          handleLinkClick={handleLinkClick}
        />
      )}
    </div>
  );
}

export default IntegratedNavbar;
