import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import ImageModel from "@/components/ImageModel";

gsap.registerPlugin(ScrollTrigger);

function JasonContent_2() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);
  const fadeImageRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartTwoRef.current, { marginTop: "200vh" });
      gsap.set(fadeImageRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartTwoRef.current,
          start: "top top",
          end: "+=1800 ",
          scrub: 1.5,
          // markers: true,
        },
      });

      tl.to(rightSideRef.current, { y: -100, ease: "none", duration: 1.8 }).to(
        fadeImageRef.current,
        { opacity: 1, ease: "none", duration: 0.5 },
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
      className="relative w-full min-h-lvh z-10 grid-gallary justify-center items-center gap-5"
    >
      <div className="col-[main-start/4] flex flex-col gap-5">
        <h2 className=" text-pink text-3xl lg:text-[2.5rem] xl:text-[3rem] font-round font-bold text-balance leading-8 lg:leading-10 xl:leading-13 xl:mb-5 self-center">
          Another day in
          <br />
          paradise, right?
        </h2>
        <div className="grid grid-cols-2 grid-row-3 gap-5 ">
          <div className="relative aspect-[1/1] max-w-full h-auto col-[1/4] overflow-hidden">
            <ImageModel
              src="/images/People/jason/jason-5.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-full h-full "
            />
          </div>
          <div className="relative aspect-[1/1] max-w-full h-auto col-[2/4] overflow-hidden">
            <ImageModel
              src="/images/People/jason/jason-3.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
              className=" object-cover [object-position:20%_center]  "
              ButtonStyle="h-full w-full"
              fadeImageRef={fadeImageRef}
            />
          </div>
        </div>
      </div>

      <div
        ref={rightSideRef}
        className="flex flex-col jason-content col-[4/content-end] gap-5"
      >
        <p className="text-white  lg:text-[1.1rem] xl:text-[1.4rem] text-balance md:mx-5 xl:mx-20  font-round font-black leading-tight slef-center">
          Meeting Lucia could be the best or worst thing to ever happen to him.
          Jason knows how he&apos;d like it to turn out but right now, it&apos;s
          hard to tell.
        </p>
        <div className="relative aspect-[9/16] max-w-full h-auto overflow-hidden">
          <ImageModel
            src="/images/People/jason/jason-4.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover [object-position:25%_center]"
            ButtonStyle="w-full h-full "
          />
        </div>
      </div>
    </section>
  );
}

export default JasonContent_2;
