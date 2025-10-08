"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import ImageModal from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

const LuciaContent_1 = () => {
  const PartOneRef = useRef(null);
  const rightColumRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartOneRef.current, { marginTop: "170vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartOneRef.current,
          start: "top center",
          end: "+=1500",
          scrub: 2,
          // markers: true
        },
      });
      tl.to(rightColumRef.current, { y: -100, ease: "none", duration: 1 });
    },
    { scope: PartOneRef }
  );

  return (
    <section
      ref={PartOneRef}
      className="relative z-10  flex md:flex-row flex-col h-full gap-5  overflow-hidden"
    >
      <div
        ref={rightColumRef}
        className="flex flex-col items-end gap-5 pt-50  "
      >
        <ImageModal
          src="/images/People/lucia/Lucia-1.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="object-cover [object-position:80%_center]"
          ButtonStyle="h-[90vh] w-[50vw]"
          priority
        />
        <ImageModal
          src="/images/People/lucia/lucia-5.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="object-cover [object-position:65%_center]"
          ButtonStyle="h-[100vh] w-[30vw]"
        />
      </div>
      <div className="flex flex-col justify-center jason-content h-full  ">
        <h1 className="text-yellow font-long uppercase text-[5.5rem] mb-5 self-center ml-20">
          Lucia Caminos
        </h1>
        <div className="mb-10 max-w-90 self-center ">
          <h2 className="text-pink  md:text-[2.5rem] font-round font-bold text-3xl mb-6 leading-11 ">
            Lucia’s father taught her to fight as soon as she could walk.
          </h2>
          <p className="text-white md:text-[1.4rem] text-lg  font-round font-black leading-tight">
            Life has been coming at her swinging ever since. Fighting for her
            family landed her in the Leonida Penitentiary. Sheer luck got her
            out. Lucia’s learned her lesson — only smart moves from here.
          </p>
        </div>
        <ImageModal
          src="/images/People/lucia/Lucia-2.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover [object-position:65%_center]"
          ButtonStyle="h-[65vh] w-[38vw]"
        />
        <div className="mb-10 max-w-90 self-center ">
          <p className="text-white md:text-[1.45rem] text-lg  font-round font-black leading-tight mt-25">
            More than anything, Lucia wants the good life her mom has dreamed of
            since their days in Liberty City — but instead of half-baked
            fantasies, Lucia is prepared to take matters into her own hands.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LuciaContent_1;
