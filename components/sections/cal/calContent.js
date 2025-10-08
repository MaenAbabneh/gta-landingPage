"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import ImageModel from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

function CalContent() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);

  const fadeImageRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartTwoRef.current, { marginTop: "0vh" });
      gsap.set(fadeImageRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartTwoRef.current,
          start: "top top",
          end: "+=1800 bottom",
          scrub: true,
          pinSpacing: false,
          // markers: true,
        },
      });
      tl.to(rightSideRef.current, { y: -100, ease: "none", duration: 1 }).to(
        fadeImageRef.current,
        { opacity: 1, ease: "none", duration: 0.6 },
        "0"
      );
    },
    {
      scope: PartTwoRef,
    }
  );
  return (
    <section
      ref={PartTwoRef}
      className="relative py-10 w-full ps-49 min-h-dvw z-10 flex flex-col md:flex-row gap-5 overflow-hidden"
    >
      <div
        ref={rightSideRef}
        className="flex flex-col  jason-content gap-20 mt-30"
      >
        <p className="text-white max-w-85 md:text-[1.4rem] text-lg font-round font-black leading-tight self-center mr-30">
          Fresh out of prison and ready to change the odds in her favor, Lucia’s
          committed to her plan — no matter what it takes.
        </p>
        <ImageModel
          src="/images/People/lucia/lucia-6.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover [object-position:60%_center]"
          ButtonStyle="w-[35vw] h-[110vh] "
        />
      </div>

      <div className="flex flex-col w-full ">
        <h2 className=" text-pink md:text-[2.7rem] font-round font-bold text-3xl ml-25 mb-25 leading-11 self-start">
          A life with
          <br />
          Jason could be
          <br />
          her way out.
        </h2>
        <div className="relative w-full flex flex-col gap-5 justify-end items-start">
          <ImageModel
            src="/images/People/lucia/lucia-4.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover [object-position:0%_center] "
            ButtonStyle="w-[50vw] h-[80vh] "
            priority
          />
          <ImageModel
            src="/images/People/lucia/Lucia-3.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
            className=" object-cover [object-position:20%_center]  "
            ButtonStyle="h-[50vh] w-[30vw]"
            fadeImageRef={fadeImageRef}
          />
        </div>
      </div>
    </section>
  );
}

export default CalContent;
