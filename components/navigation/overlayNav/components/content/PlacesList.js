"use client";

import { gtaData } from "@/constants/Links";

export default function PlacesList({
  activeSection,
  onHover,
  onLeave,
  onClick,
}) {
  return (
    <div className="flex flex-col items-start pt-9 ">
      {gtaData.Places.map((place, index) => {
        const sectionName = place.href.replace(/^\/+|#+/g, "");
        const isActive = activeSection === sectionName;
        return (
          <button
            key={index}
            className={`font-long text-[3.56rem] uppercase leading-none transition-colors duration-300 text-left ${
              isActive
                ? "text-gta-pink"
                : "text-gta-white hover:text-gta-yellow"
            }`}
            onClick={() => onClick(place.href)}
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
