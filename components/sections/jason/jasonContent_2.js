import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function JasonContent_2() {
  const PartTwoRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartTwoRef.current, { marginTop: "-30vh"  });
      // gsap.set(PartTwoRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartTwoRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            // markers: true,
        },
      });

    },
    {
      scope: PartTwoRef,
    }
  );
  return (
    <section
      ref={PartTwoRef}
      className="relative w-full z-10  py-38 ps-70 flex lg:flex-row flex-col justify-between PartTow    "
    >
      <div className="max-w-lg jason-content ">
        <h1 className="text-yellow font-long uppercase text-[5.5rem] mb-10">
          Jason Duval
        </h1>
        <h2 className="text-pink w-90 md:text-[2.5rem] font-round font-bold text-3xl mb-7 leading-11 ">
          Jason wants an easy life, but things just keep getting harder.
        </h2>
        <p className="text-white md:text-[1.4rem] text-lg md:pe-28 pe-20 font-round font-black leading-tight">
          Jason grew up around grifters and crooks. After a stint in the Army
          trying to shake off his troubled teens, he found himself in the Keys
          doing what he knows best, working for local drug runners. It might be
          time to try something new.
        </p>
        <div className="bg-yellow h-[95vh] w-[30vw] md:mt-36 mt-20 -translate-x-5 relative ">
          <Image
            src="/images/People/jason/jason-1.webp"
            alt="Jason Duval"
            fill
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            className="object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default JasonContent_2;
