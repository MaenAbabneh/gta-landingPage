"use client";

import Image from "next/image";

import { gtaData } from "@/constants/Links";

import { FullArrowSvg } from "../../../../ui/svg";

export default function DownloadsGrid({ onHover, onLeave, activeTab }) {
  return (
    <div className="space-y-4 md:space-y-6 flex flex-col pt-5 ">
      <h3 className="text-xl md:text-2xl font-bold font-round mb-6 md:mb-10 text-gray-300">
        {activeTab}
      </h3>

      {gtaData.Downloads.map((item, index) => (
        <div
          key={index}
          className="group cursor-pointer text-gta-pink hover:text-gta-gray transition-all duration-300"
          onMouseEnter={() => onHover(item)}
          onMouseLeave={onLeave}
        >
          <div className="relative w-full h-40 md:h-48 lg:h-50 overflow-hidden">
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover brightness-75 hover:brightness-100 hover:border-4 md:hover:border-6 border-gta-white transition-all duration-300"
            />
            <div className="absolute bottom-0 right-0 left-0 flex items-center justify-between py-2 px-3 md:py-3 md:px-5 rounded-lg">
              <h3 className="text-white font-long uppercase text-xl md:text-2xl lg:text-3xl">
                {item.title}
              </h3>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gta-gray rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-gta-white transition-all duration-300">
                <FullArrowSvg className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button className="self-center flex items-center gap-2 py-2 px-3 md:py-3 md:px-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
        <span className="font-round font-bold text-gta-white text-xs md:text-sm">
          See All Downloads
        </span>
        <FullArrowSvg className="w-3 h-3 md:w-4 md:h-4 text-gta-white" />
      </button>
    </div>
  );
}
