import Image from "next/image";
import { PsIcon, XboxIcon } from "@/components/ui/svg";

function ComingSoon({ refs = {}, isHero = false }) {
  const { comingSoonRef, VIlogoRef, textRef, consolesRef } = refs;
  return (
    <div
      ref={comingSoonRef}
      className={` h-lvh w-full flex flex-col items-center justify-center ${isHero ? " absolute z-[0] inset-0" : "relative "} `}
    >
      <div
        className={` flex flex-col items-center justify-center  ${isHero ? "gap-3 md:gap-5 lg:gap-10" : ""}`}
      >
        <div className={`flex flex-col items-center justify-center   ${isHero ? "coming-soon-gap" : "gap-5 md:gap-15 "}`}>
          <div ref={VIlogoRef} className="relative  w-[clamp(20vh,25vw,30vh)] h-[clamp(8vh,10vw,15vh)] md:h-[clamp(10vh,15vw,20vh)]">
            <Image
              src="/images/logo.webp"
              alt="Grand Theft Auto VI Logo"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              fill
              priority
              style={{
                visibility: isHero ? "hidden" : "visible",
              }}
            />
          </div>
          <h3
            ref={textRef}
            className="coming-soon-text font-black uppercase gradient-text "
          >
            COMING
            <br />
            November 19
            <br />
            2026
          </h3>
        </div>

        <div
          ref={consolesRef}
          className="flex flex-row items-center justify-center gap-5 lg:gap-10 text-gta-white "
          style={{
            visibility: isHero ? "inherit" : "hidden",
          }}
        >
          <PsIcon className="w-13 md:w-30 h-auto" />
          <XboxIcon className="w-20 md:w-50 h-auto" />
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
