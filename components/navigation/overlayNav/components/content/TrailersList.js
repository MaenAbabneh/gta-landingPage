"use client";

import Image from "next/image";

import { gtaData } from "@/constants/Links";

export default function TrailersList({ onHover, onLeave, activeTab }) {
  return (
    <div className="w-full h-full space-y-6 py-5">
      <h3 className="text-2xl font-bold font-round mb-10 text-gray-300">
        {activeTab}
      </h3>

      {gtaData.Trailers.map((trailer, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-satrt items-start md:items-center max-w-90  md:min-w-150 min-h-50 md:min-h-40  bg-white/5 hover:bg-white/10 cursor-pointer"
          onMouseEnter={() => onHover({ image: trailer.thumbnail })}
          onMouseLeave={onLeave}
        >
          <div className="relative min-w-90 min-h-40 md:min-w-60 md:min-h-34 lg:min-w-80 lg:min-h-44">
            <Image
              src={trailer.thumbnail || "/placeholder.svg"}
              alt={trailer.title}
              fill
              sizes="100vw"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm backdrop-brightness-70">
                <div className="w-0 h-0 border-l-[11px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <p className="absolute bottom-2 text-gta-white right-2 bg-black/50 text-sm px-2 py-1 rounded">
              {trailer.duration}
            </p>
          </div>
          
          <div className="ml-5 my-5  md:mt-0  text-gta-white">
            {trailer.isNew && (
              <p className="bg-white text-black text-sm font-long px-2 py-0.5 w-10  rounded">
                NEW
              </p>
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
