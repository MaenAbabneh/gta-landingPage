"use client";

import { gtaData } from "@/constants/Links";

export default function PlacesList({
  activeSection,
  onHover,
  onLeave,
  onClick,
  activeTab,
}) {
  const isSectionInDom = (sectionName) => {
    return (
      typeof window !== "undefined" &&
      document.getElementById(sectionName) !== null
    );
  };

  return (
    <div className="flex flex-col items-start pt-5 ">
      <h3 className="text-2xl font-bold font-round mb-10 text-gray-300">
        {activeTab}
      </h3>

      {gtaData.Places.map((place, index) => {
        const sectionName = place.href.replace(/^\/+|#+/g, "");
        const isActive = activeSection === sectionName;

        const isSectionAvailable = isSectionInDom(sectionName);
        const isDisable = !isSectionAvailable;

        const disabledClasses = isDisable
          ? "text-gray-600 cursor-not-allowed opacity-50"
          : "text-gta-white hover:text-gta-yellow";

        return (
          <button
            key={index}
            className={`font-long text-5xl md:text-[3.56rem] uppercase leading-none transition-colors duration-300 text-left ${
              isActive ? "text-gta-pink" : disabledClasses
            }`}
            onClick={() => {if(!isDisable) onClick(place.href)}}
            onMouseEnter={() => onHover(place)}
            onMouseLeave={onLeave}
          >
            {place.label}
          </button>
        );
      })}
    </div>
  );
}
