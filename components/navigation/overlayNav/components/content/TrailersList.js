"use client";

import Image from "next/image";

import { gtaData } from "@/constants/Links";

export default function TrailersList({ onHover, onLeave }) {
  return (
    <div className="space-y-6 pt-20">
      {gtaData.Trailers.map((trailer, index) => (
        <div
          key={index}
          className="flex items-center gap-4 justify-start bg-white/5 hover:bg-white/10 cursor-pointer"
          onMouseEnter={() => onHover({ image: trailer.thumbnail })}
          onMouseLeave={onLeave}
        >
          <div className="relative">
            <Image
              src={trailer.thumbnail || "/placeholder.svg"}
              alt={trailer.title}
              width={320}
              height={192}
              className="w-80 h-44 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm backdrop-brightness-70">
                <div className="w-0 h-0 border-l-[11px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
              {trailer.duration}
            </div>
          </div>
          <div className="text-white flex flex-col items-start p-0 m-0">
            {trailer.isNew && (
              <div className="bg-white text-black text-sm font-long px-2 py-0.5 rounded">
                NEW
              </div>
            )}
            <h3 className="font-round font-normal text-lg mb-2 mt-2">
              {trailer.title}
            </h3>
            <p className="font-round text-gray-400">{trailer.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
