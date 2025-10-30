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
            activeTab={activeTab}
            activeSection={activeSection}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            onClick={(href) => handleLinkClick(href)}
          />
        );
      case "Places":
        return (
          <PlacesList
            activeTab={activeTab}
            activeSection={activeSection}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            onClick={(href) => handleLinkClick(href)}
          />
        );

      case "Trailers":
        return (
          <TrailersList
            activeTab={activeTab}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            onTrailerClick={handleLinkClick}
          />
        );

      case "Downloads":
        return (
          <DownloadsGrid
            activeTab={activeTab}
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
  const timelineRef = useRef(null); // لحفظ التايملاين الحالي

  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const leftColum = leftColumRef.current;

      if (!container || !overlay || !panel) return;

      // إلغاء أي أنيميشن سابق
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

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
            timelineRef.current = null;
          },
        });

        timelineRef.current = tl;

        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
          .fromTo(
            panel,
            { x: 500, opacity: 0 },
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
        setIsAnimating(true);

        gsap.set(container, { pointerEvents: "none" });

        const tl = gsap.timeline({
          ease: "power2.in",
          onComplete: () => {
            gsap.set(container, { visibility: "hidden" });
            setIsAnimating(false);
            timelineRef.current = null;
          },
        });

        timelineRef.current = tl;

        tl.to(overlay, { opacity: 0, duration: 0.5 }, 0)
          .to(panel, { x: 500, opacity: 0, duration: 0.4 }, 0)
          .to(leftColum, { opacity: 0, duration: 0.3 }, 0);
      }
    },
    { dependencies: [isMenuOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 grid grid-cols-6 z-40 h-screen w-screen"
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
        className="overlay-panel col-[2/7] md:col-[3/7] lg:col-[4/7] bg-gta-column-left w-full h-lvh "
      >
        <div className="justify-center items-center flex md:hidden row-[header] font-round font-bold mt-10 mb-10 mr-20 gap-5 ">
          <button className="flex  items-center justify-center  text-lg bg-transparent text-gta-white gap-0 md:gap-2  hover:text-gta-white-60">
            <GloableSvg className="w-9 h-10" />
            <span className="hidden md:block">En</span>
            <ArrowSvg className={"rotate-180 w-6 h-10"} />
          </button>
          <button className="flex items-center justify-center text-2xl px-2 py-2 bg-transparent text-gta-white gap-2 hover:text-gta-white-60">
            <span>Motion</span>
            <ArrowSvg className={"rotate-180 w-6 h-10"} />
          </button>
        </div>

        <div className=" relative flex justify-between items-center mr-0 ml-0 mt-0 mb-0 md:mr-30 md:ml-10 md:mt-20 md:mb-0 xl:mr-30 xl:ml-15 xl:mt-16 xl:mb-0  row-[footer]  md:row-[header]  Taps-mask ">
          <div className="bg-gta-gradient-secondary md:bg-transparent w-full h-full md:w-0 md:h-0 border-t md:border-none border-[hsla(0,0%,100%,.1)] md:border-transparent ">
            <TabsBar activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        <div
          className=" row-[content] pt-0 pb-5 pr-15 pl-5 md:pl-10 md:pr-10  md:pb-0 md:pt-10 xl:pb-15 xl:pt-15  overflow-y-auto  scrollbar-none overscroll-contain  ios-scroll rendered-content"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          {renderTabContent()}
        </div>

        <div className="justify-between items-center font-round font-bold hidden md:flex row-[footer] px-15 pb-10 pt-5">
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
