import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Jason = () => {
  const jasonRef = useRef(null);
  useGSAP(() => {
    gsap.set(jasonRef.current, { marginTop: "-120vh" });

    gsap.timeline({
      scrollTrigger: {
        trigger: jasonRef.current,
        start: "top 90%",
        end: "40% center",
        scrub: 2,
        // markers: true
      },
    });

    gsap.to(
      " .img-box",
      {
        scrollTrigger: {
          trigger: jasonRef.current,
          start: "top center",
          end: "80% center",
          scrub: 2,
        },
        y: -150,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );
  });

  return (
    <section
      id="jason"
      ref={jasonRef}
      className="relative z-10 mt-60 py-38 ps-70 flex lg:flex-row flex-col justify-between  w-full overflow-hidden"
    >
      <div className="max-w-lg jason-content">
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

        <div className="bg-yellow h-[95vh] w-[30vw] md:mt-36 mt-20 -translate-x-5">
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

      <div className="space-y-5 mt-70 ml-5 img-box">
        <div className="bg-yellow h-[90vh] w-[60vw] -translate-x-5">
          <Image
            src="/images/People/jason/jason-2.webp"
            alt="Jason Duval"
            fill
            unoptimized
            className="object-cover [object-position:5%_center] hover:scale-[0.98] transition duration-700 ease-in-out"
          />
        </div>
        <div className="bg-yellow h-[55vh] md:w-[32vw] -translate-x-5">
          <Image
            src="/images/People/jason/jason-6.webp"
            alt="Jason Duval"
            fill
            sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            className="object-cover  hover:scale-[0.97] transition duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default Jason;
