"use client";

import { gtaData } from "@/constants/Links";

export default function PeopleList({
  activeSection,
  onHover,
  onLeave,
  onClick,
  activeTab,
}) {
  return (
    <div className="flex flex-col items-start pt-5 ">
      <h3 className="text-2xl font-bold font-round mb-10 text-gray-300">{activeTab}</h3>
      {gtaData.People.map((person, index) => {
        const sectionName = person.href.replace(/^\/+|#+/g, "");
        const isActive = activeSection === sectionName;
        return (
          <button
            key={index}
            className={`cursor-pointer text-wrap font-long font-black text-[2.8rem] md:text-[3.56rem] uppercase transition-colors duration-500 leading-none ${
              isActive
                ? "text-gta-pink"
                : "text-gta-white hover:text-gta-yellow"
            }`}
            onClick={() => onClick(person.href)}
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
