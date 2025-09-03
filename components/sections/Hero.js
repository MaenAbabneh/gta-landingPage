import Image from "next/image";

import { GrandMaskSvg } from "../svg";

function Hero() {
  return (
    <section className="relative w-dvw h-dvh overflow-hidden z-0">
      <GrandMaskSvg className=" absolute inset-0 z-10" />
      <div className="size-full">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero Background"
          className=" object-cover h-full md:scale-125 "
          fill
          sizes="100vw"
          unoptimized={true}
        />
      </div>
    </section>
  );
}

export default Hero;
