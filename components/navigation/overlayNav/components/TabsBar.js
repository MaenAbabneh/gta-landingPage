"use client";

import { gtaData } from "@/constants/Links";

export default function TabsBar({ activeTab, onChange }) {
  return (
    <div className="hidden md:flex">
      {Object.keys(gtaData).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`h-13 px-6 rounded-full transition-all nav-font text-size cursor-pointer ${
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
