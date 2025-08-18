"use client";

import { useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { gtaData } from "@/constants/Links";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function IntegratedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("People");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  useGSAP(() => {
    const sectionsToTrack = Object.values(gtaData).flatMap((catagory) =>
      catagory.filter((item) => item.href)
    );

    sectionsToTrack.forEach((item) => {
      // Clean the href and ensure it's a valid section name
      let sectionName = item.href.replace(/^\/+|#+/g, ''); // Remove leading slashes and hashes
      
      // Skip empty or invalid section names
      if (!sectionName || sectionName.includes('/')) {
        console.warn('Skipping invalid section:', item.href);
        return;
      }
      
      const sectionId = `#${sectionName}`; // Create proper ID selector
      
      // Check if element exists before creating ScrollTrigger
      if (!document.querySelector(sectionId)) {
        console.warn('Section element not found:', sectionId);
        return;
      }
      
      ScrollTrigger.create({
        trigger: sectionId,
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => {
          setActiveSection(sectionName);
        },
        onEnterBack: () => {
          setActiveSection(sectionName);
        },
      });
    });

  }, []);

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

  const handleItemHover = (image) => {
    setHoveredItem(image);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "People":
        return (
          <div className="flex flex-col items-start ">
            {gtaData.People.map((person, index) => {
              const sectionName = person.href.replace(/^\/+|#+/g, ''); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`cursor-pointer font-long text-[3.5rem] uppercase transition-colors duration-300 leading-none text-left tracking-tight ${
                    isActive
                      ? "text-gta-pink"
                      : "text-white hover:text-gta-yellow"
                  }`}
                  onClick={() => handleLinkClick(person.href)}
                  onMouseEnter={() => handleItemHover(person)}
                  onMouseLeave={handleItemLeave}
                >
                  {person.label}
                </button>
              );
            })}
          </div>
        );

      case "Places":
        return (
          <div className="flex flex-col items-start space-y-6">
            {gtaData.Places.map((place, index) => {
              const sectionName = place.href.replace(/^\/+|#+/g, ''); // Clean href
              const isActive = activeSection === sectionName;
              
              return (
                <button
                  key={index}
                  className={`text-white font-round font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide transition-colors duration-300 text-left ${
                    isActive 
                      ? "text-gta-pink" 
                      : "hover:text-yellow-400"
                  }`}
                  onClick={() => handleLinkClick(place.href)}
                  onMouseEnter={() => handleItemHover(place)}
                  onMouseLeave={handleItemLeave}
                >
                  {place.label}
                </button>
              );
            })}
          </div>
        );

      case "Trailers":
        return (
          <div className="space-y-6">
            {gtaData.Trailers.map((trailer, index) => (
              <div
                key={index}
                className="flex items-center gap-6 cursor-pointer"
                onMouseEnter={() =>
                  handleItemHover({ image: trailer.thumbnail })
                }
                onMouseLeave={handleItemLeave}
              >
                <div className="relative">
                  <img
                    src={trailer.thumbnail || "/placeholder.svg"}
                    alt={trailer.title}
                    className="w-80 h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {trailer.duration}
                  </div>
                  {trailer.isNew && (
                    <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="text-white">
                  <h3 className="font-round font-bold text-2xl mb-2">
                    {trailer.title}
                  </h3>
                  <p className="font-round text-gray-400">{trailer.date}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "Downloads":
        return (
          <div className="space-y-6">
            {gtaData.Downloads.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}
              >
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-6 rounded-lg">
                  <h3 className="text-white font-round font-bold text-3xl">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
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
        <div
          className="flex h-full bg-gta-overlay-50  "
          style={{
            backdropFilter:
              "brightness(120%) saturate(200%) blur(150px) hue-rotate(-14deg)",
            WebkitBackdropFilter: "brightness(60%) saturate(120%) blur(150px)",
          }}
        >
          {/* Left Column: Dark gradient background with large VI logo */}
          <div className=" flex w-1/6 sm:w-1/3 md:w-[50vw]  h-full justify-center bg-transparent">
            <div className="hidden sm:flex flex-col justify-center items-center gap-4 ">
              {hoveredItem &&
              (activeTab === "People" || activeTab === "Places") &&
              hoveredItem.image ? (
                <Image
                  src={hoveredItem.image}
                  alt={hoveredItem.label || "Content"}
                  width={1200}
                  height={720}
                  className="animate-fade-in object-cover h-full "
                />
              ) : (
                <div className=" logo-glow relative flex items-center justify-center filter">
                  <Image
                    src="/images/gta-vi-logo-white.svg"
                    alt="GTA VI Logo"
                    width={242}
                    height={0}
                    className="animate-fade-in relative z-10   invert"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Enhanced near-black background with authentic styling */}
          <div
            className="w-5/6 sm:w-2/3 md:w-[49vw] h-[100vh] flex flex-col"
            style={{
              background: "var(--gta-gradient-primary)",
            }}
          >
            {/* Top section with four main tab buttons */}
            <div className="flex items-start justify-start p-4 md:p-8 pt-[3.5rem] md:pt-[3rem] ">
              {/* Group of four main tab buttons - conditionally shown */}
              <div className="flex flex-wrap gap-2 md:gap-1 w-full"></div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntegratedNavbar;
