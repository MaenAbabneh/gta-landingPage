"use client";

import { gtaData } from "@/constants/Links";

export default function PeopleList({
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
      {gtaData.People.map((person, index) => {
        const sectionName = person.href.replace(/^\/+|#+/g, "");
        const isActive = activeSection === sectionName;

        const isSectionAvailable = isSectionInDom(sectionName);
        const isDisable = !isSectionAvailable;

        const disabledClasses = isDisable
          ? "text-gray-600 cursor-not-allowed opacity-50"
          : "text-gta-white hover:text-gta-yellow";

        return (
          <button
            key={index}
            suppressHydrationWarning={true}
            className={`cursor-pointer text-wrap font-long font-black text-[2.5rem] md:text-[3.56rem] uppercase transition-colors duration-500 leading-none ${
              isActive ? "text-gta-pink" : disabledClasses
            }`}
            onClick={() => {
              if (!isDisable) onClick(person.href);
            }}
            onMouseEnter={() => onHover(person)}
            onMouseLeave={onLeave}
          >
            {person.label}
          </button>
        );
      })}
    </div>
  );
}
