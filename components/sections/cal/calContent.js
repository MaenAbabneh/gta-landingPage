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
      gsap.set(PartTwoRef.current, { marginTop: "-20vh" });
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
      className="relative py-10 w-full ps-49 min-h-dvw z-10 flex flex-col md:flex-row gap-5 "
    >
    <div className=" calContent absolute inset-0 z-[-3]" />
      <div
        ref={rightSideRef}
        className="flex flex-col gap-20 mt-30 "
      >
     
        <ImageModel
          src="/images/People/cal/Cal-4.webp"
          alt="Jason Duval"
          sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover [object-position:50%_center]"
          ButtonStyle="w-[35vw] h-[65vh] "
        />
      </div>

      <div className="flex flex-col w-full ">
        <div className="relative w-full flex flex-col gap-5 justify-end items-start">
          <ImageModel
            src="/images/People/cal/Cal-1.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover [object-position:100%_center] "
            ButtonStyle="w-[50vw] h-[90vh] "
            priority
          />
          <ImageModel
            src="/images/People/cal/Cal-3.webp"
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
