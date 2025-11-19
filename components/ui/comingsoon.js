import Image from "next/image";
import { PsIcon, XboxIcon } from "@/components/ui/svg";

function ComingSoon({ refs = {} }) {
  const { comingSoonRef, VIlogoRef, textRef, consolesRef } = refs;
  return (
    <div
      ref={comingSoonRef}
      className="absolute z-[0] inset-0 w-full h-lvh  flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center h-full w-full md:gap-5">
        <div
          ref={VIlogoRef}
          className="hidden-VI-Logo opacity-0 relative lg:mb-5"
          style={{
            visibility: "hidden",
          }}
        >
          <Image
            src="/images/logo.webp"
            alt="Grand Theft Auto VI Logo"
            fill
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover "
            priority
          />
        </div>
        <h3
          ref={textRef}
          className=" text-center text-[3rem] md:text-[5rem] lg:text-[5.4rem] xl:text-[6.3rem] font-black leading-10 md:leading-17 lg:leading-19 xl:leading-22 gradient-text "
        >
          COMING
          <br />
          MAY 26
          <br />
          2026
        </h3>
        <div
          ref={consolesRef}
          className="flex flex-row items-center justify-center gap-5  text-gta-white "
        >
          <PsIcon className="max-w-16  md:min-w-25 xl:max-w-100 md:max-h-40 xl:max-h-100" />
          <XboxIcon className="max-w-25  md:min-w-40 xl:max-w-170 md:max-h-40 xl:max-h-100" />
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
