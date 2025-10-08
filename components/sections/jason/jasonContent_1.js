"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import ImageModal from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

const JasonContent_1 = () => {
  const PartOneRef = useRef(null);
  const rightColumRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartOneRef.current, { marginTop: "100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartOneRef.current,
          start: "top center",
          end: "+=1500",
          scrub: 2,
          // markers: true
        },
      });
      tl.to(rightColumRef.current, { y: -200, ease: "none", duration: 1 });
    },
    { scope: PartOneRef }
  );

  return (
    <section
      ref={PartOneRef}
      className="relative z-10 px-70 grid grid-cols-1 md:grid-cols-2 h-dvh "
    >
      <div className="flex flex-col jason-content">

        <h1 className="text-yellow font-long uppercase text-[5.5rem] mb-5">
          Jason Duval
        </h1>
      <div className="mb-10">
        <h2 className="text-pink w-90 md:text-[2.5rem] font-round font-bold text-3xl mb-6 leading-11 ">
          Jason wants an easy life, but things just keep getting harder.
        </h2>
        <p className="text-white md:text-[1.4rem] text-lg md:pe-40 pe-30 font-round font-black leading-tight">
          Jason grew up around grifters and crooks. After a stint in the Army
          trying to shake off his troubled teens, he found himself in the Keys
          doing what he knows best, working for local drug runners. It might be
          time to try something new.
        </p>
      </div>
        <ImageModal
          src="/images/People/jason/jason-1.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover [object-position:80%_center]"
          ButtonStyle="h-[95vh] w-[30vw]"
        />
      </div>

      <div ref={rightColumRef} className="flex flex-col gap-3 pt-50 ">
      <ImageModal
          src="/images/People/jason/jason-2.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover [object-position:5%_center]"
          ButtonStyle="h-[80vh] w-[50vw]"
        />
        <ImageModal
          src="/images/People/jason/jason-6.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          ButtonStyle="h-[55vh] md:w-[32vw]"
        />
      </div>
    </section>
  );
};

export default JasonContent_1;
