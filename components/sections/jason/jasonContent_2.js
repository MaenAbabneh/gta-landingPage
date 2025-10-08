import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef} from "react";

import ImageModel from "@/components/ImageModel"; 

gsap.registerPlugin(ScrollTrigger);

function JasonContent_2() {
  const PartTwoRef = useRef(null);
  const rightSideRef = useRef(null);

  const fadeImageRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(PartTwoRef.current, { marginTop: "-10vh" });
      gsap.set(fadeImageRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: PartTwoRef.current,
          start: "top top",
          end: "+=1800 bottom",
          scrub: true,
          // markers: true,
        },
      });
      tl.to(rightSideRef.current, { y: -100, ease: "none", duration: 1 })
      .to(
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
        className="relative py-30 w-full min-h-dvw z-10 flex flex-col md:flex-row gap-5"
      >
        <div className="flex flex-col w-full ">
          <h2 className=" text-pink md:text-[2.7rem] font-round font-bold text-3xl ml-70 mb-25 leading-11 ">
            Another day in
            <br />
            paradise, right?
          </h2>
          <div className=" w-full flex flex-col gap-2 justify-end items-end">
            <ImageModel
              src="/images/People/jason/jason-5.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover [object-position:0%_center] "
              ButtonStyle="w-[50vw] h-[80vh] "
            />
            <ImageModel
              src="/images/People/jason/jason-3.webp"
              alt="Jason Duval"
              sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
              className=" object-cover [object-position:20%_center]  "
              ButtonStyle="h-[50vh] w-[30vw]"
              fadeImageRef={fadeImageRef}
            />
          </div>
        </div>

        <div
          ref={rightSideRef}
          className="flex flex-col w-full jason-content gap-20 mt-10"
        >
          <p className="text-white w-80 md:text-[1.4rem] text-lg font-round font-black leading-tight self-center mr-30">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he&apos;d like it to turn out but right now,
            it&apos;s hard to tell.
          </p>
          <ImageModel
            src="/images/People/jason/jason-4.webp"
            alt="Jason Duval"
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover [object-position:25%_center]"
            ButtonStyle="w-[35vw] h-[110vh] "
          />
        </div>
      </section>
  
  );
}

export default JasonContent_2;
