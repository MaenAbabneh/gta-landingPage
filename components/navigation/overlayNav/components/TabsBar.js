"use client";

import { gtaData } from "@/constants/Links";

export default function TabsBar({ activeTab, onChange }) {
  return (
    <div className="py-10 pr-50 md:pr-0 md:py-0 flex items-center w-150 md:w-full h-full  overflow-x-auto md:overflow-x-visible scrollbar-none gap-4 md:gap-0   ">
      {Object.keys(gtaData).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`h-20 px-10 md:h-12 md:px-4 xl:py- xl:px-5 rounded-[40px] md:rounded-full transition-all nav-font text-2xl md:text-sm xl:text-lg cursor-pointer ${
            activeTab === tab
              ? "bg-gta-white text-gta-black"
              : "text-gta-white hover:text-gta-yellow"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
