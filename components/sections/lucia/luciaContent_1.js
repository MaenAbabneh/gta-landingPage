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

  // useGSAP(
  //   () => {
  //     gsap.set(PartOneRef.current, { marginTop: "170vh" });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: PartOneRef.current,
  //         start: "top center",
  //         end: "+=1500",
  //         scrub: 2,
  //         pinSpacing: false,
  //         // markers: true
  //       },
  //     });
  //     tl.to(rightColumRef.current, { y: -100, ease: "none", duration: 1 });
  //   },
  //   { scope: PartOneRef }
  // );

  return (  
    <section ref={PartOneRef} className="relative z-10 grid-gallary gap-5 ">
        {/* Left Column */}
        <div className=" col-[content-start/8]  grid grid-cols-6  "> 
          <div className=" aspect-[1/1] relative overflow-hidden col-span-6 col-start-1 w-full  ">
            <ImageModal
              src="/images/People/lucia/Lucia-1.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover [object-position:80%_center]"
              ButtonStyle="w-full h-full"
              priority
            />
          </div>
          <div className="relative aspect-[9/16] col-span-4 col-start-3  [opject-postion_center] overflow-hidden">
            <ImageModal
              src="/images/People/lucia/lucia-5.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover [object-position:65%_center]"
              ButtonStyle="h-full w-full"
            />
          </div>
        </div>

        {/* Right Column */}

        <div className=" col-[8/content-end]  grid " ref={rightColumRef}>
          <h1 className="text-yellow font-long uppercase text-[5.5rem] col-start-2 col-span-5 w-full ">
            Lucia Caminos
          </h1>
          <div className=" col-start-2 col-span-4 flex flex-col gap-5 w-full ">
            <h2 className="text-pink md:text-[2.5rem] font-round font-bold text-3xl leading-11 ">
              Lucia’s father taught her to fight as soon as she could walk.
            </h2>
            <p className="text-white  md:text-[1.4rem] text-lg  font-round font-black leading-tight">
              Life has been coming at her swinging ever since. Fighting for her
              family landed her in the Leonida Penitentiary. Sheer luck got her
              out. Lucia’s learned her lesson — only smart moves from here.
            </p>
          </div>
          <div className="w-full relative overflow-hidden aspect-[1/1] col-start-1 col-span-6  ">
            <ImageModal
              src="/images/People/lucia/Lucia-2.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover [object-position:65%_center]"
              ButtonStyle="h-full w-full"
            />
          </div>
          <div className=" col-span-4 col-start-2 w-full">
            <p className="text-white md:text-[1.45rem] text-lg  font-round font-black leading-tight">
              More than anything, Lucia wants the good life her mom has dreamed
              of since their days in Liberty City — but instead of half-baked
              fantasies, Lucia is prepared to take matters into her own hands.
            </p>
          </div>
        </div>
    </section>
  );
};

export default LuciaContent_1;
