"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";

import { ArrowSvg, GloableSvg } from "../../svg";
import DownloadsGrid from "./components/content/DownloadsGrid";
import PeopleList from "./components/content/PeopleList";
import PlacesList from "./components/content/PlacesList";
import TrailersList from "./components/content/TrailersList";
import LeftPreviewPane from "./components/LeftPreviewPane";
import TabsBar from "./components/TabsBar";

function OverlayMenu({
  activeTab,
  hoveredItem,
  handleLinkClick,
  setHoveredItem,
  setActiveTab,
  isMenuOpen,
}) {
  const activeSection = useScrollSpy();

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
          <PeopleList
            activeSection={activeSection}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            onClick={(href) => handleLinkClick(href)}
          />
        );
      case "Places":
        return (
          <PlacesList
            activeSection={activeSection}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            onClick={(href) => handleLinkClick(href)}
          />
        );

      case "Trailers":
        return (
          <TrailersList
            onHover={handleItemHover}
            onLeave={handleItemLeave}
          />
        );

      case "Downloads":
        return (
          <DownloadsGrid
            onHover={handleItemHover}
            onLeave={handleItemLeave}
          />
        );

      default:
        return null;
    }
  };

  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const leftColumRef = useRef(null);

  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const leftColum = leftColumRef.current;

      if (!container || !overlay || !panel) return;

      if (isMenuOpen) {
        setIsAnimating(true);

        gsap.set(container, { pointerEvents: "none", visibility: "visible" });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            gsap.set(container, {
              pointerEvents: "auto",
              visibility: "visible",
            });
            setIsAnimating(false);
          },
        });
        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
          .fromTo(
            panel,
            { x: 300, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 },
            "<"
          )
          .fromTo(
            leftColum,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "<"
          );
      } else {
        if (isAnimating) return;

        setIsAnimating(true);

        gsap.set(container, { pointerEvents: "none" });

        const tl = gsap.timeline({
          ease: "power2.in",
          onComplete: () => setIsAnimating(false),
        });
        tl.to(overlay, { opacity: 0, duration: 0.4 }, 0)
          .to(panel, { x: 300, opacity: 0, duration: 0.3 }, 0)
          .to(leftColum, { opacity: 0, duration: 0.2 }, 0);
      }
    },
    { dependencies: [isMenuOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-6 w-screen h-screen fixed inset-0 z-40 "
    >
      <div
        ref={overlayRef}
        className="w-full h-full absolute inset-0 -z-0 bg-gta-overlay-50 filter backdrop-blur-[150px] backdrop-brightness-[120%] backdrop-saturate-[250%]"
      />
      <LeftPreviewPane
        ref={leftColumRef}
        hoveredItem={hoveredItem}
        activeTab={activeTab}
      />

      {/* Right Column */}

      <div
        ref={panelRef}
        className="flex flex-col col-[2/7] md:col-[3/7] lg:col-[4/7] bg-gta-column-left   h-screen z-10  "
      >
        <div className="justify-center mt-13 ml-5 mr-35 lg:mt-12 lg:ml-9 lg:mr-35 items-center font-round font-bold flex md:hidden">
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-2  hover:text-gta-white-60">
            <GloableSvg />
            En
            <ArrowSvg className={"rotate-180"} />
          </button>
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-2 hover:text-gta-white-60">
            Motion
            <ArrowSvg className={"rotate-180"} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-12 ml-5 mr-35 lg:mt-12 lg:ml-14 lg:mr-35  ">
          <TabsBar activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex-1 py-14 px-15">{renderTabContent()}</div>

        <div className="justify-between pl-12 pb-10 pr-13 items-center font-round font-bold hidden md:flex">
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-1.5  hover:text-gta-white-60">
            <GloableSvg />
            English
            <ArrowSvg />
          </button>
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-1.5 hover:text-gta-white-60">
            Motion
            <ArrowSvg />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayMenu;
