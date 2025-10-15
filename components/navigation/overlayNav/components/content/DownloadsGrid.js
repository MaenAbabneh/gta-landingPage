"use client";

import Image from "next/image";

import { gtaData } from "@/constants/Links";

import { FullArrowSvg } from "../../../../svg";

export default function DownloadsGrid({ onHover, onLeave }) {
  return (
    <div className="space-y-6 flex flex-col">
      {gtaData.Downloads.map((item, index) => (
        <div
          key={index}
          className="relative group cursor-pointer text-gta-pink hover:text-gta-gray transition-all duration-300"
          onMouseEnter={() => onHover(item)}
          onMouseLeave={onLeave}
        >
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-50 object-cover brightness-75 hover:brightness-100 hover:border-6 border-gta-white transition-all duration-300"
            width={320}
            height={192}
          />
          <div className="absolute bottom-0 right-0 left-0 flex items-center justify-between py-3 px-5 rounded-lg">
            <h3 className="text-white font-long uppercase text-3xl">
              {item.title}
            </h3>
            <div className="w-10 h-10 bg-gta-gray rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-gta-white transition-all duration-300">
              <FullArrowSvg className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
      <button className="self-center flex items-center gap-2 py-3 px-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
        <span className="font-round font-bold text-gta-white text-sm">
          See All Downloads
        </span>
        <FullArrowSvg className="w-4 h-4 text-gta-white" />
      </button>
    </div>
  );
}
