import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Part_2() {
  const PartTwoRef = useRef(null);
  const JasonStoryRef = useRef(null);
  const VideoRef = useRef(null);
  useGSAP(() => {
    gsap.set(PartTwoRef.current, { marginTop: "-30vh" });
    gsap.set(JasonStoryRef.current, { marginTop: "100vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: PartTwoRef.current,
        start: "top top",
        end: "+=2000 bottom",
        scrub: 2,
        pin: true,
        // markers: true,
      },
    });
      if (VideoRef.current) {
        tl.to(
          VideoRef.current,
          {
            currentTime: VideoRef.current.duration,
            ease: "none",
          },
          "<"
        );
    }
  });

  return (
    <section ref={PartTwoRef} className="relative w-full overflow-hidden">
      <div className="absolute inset-0 ">
        <div className="h-dvh">
          <video
            ref={VideoRef}
            src="https://res.cloudinary.com/dlgi2ockk/video/upload/v1755803140/jason-2_qfzmgs.mp4"
            muted
            autoPlay
            playsInline
            className="size-full object-cover [object-position:20%_center]"
          ></video>
        </div>
      </div>

      <div
        ref={JasonStoryRef}
        className="relative z-10 ps-70 flex lg:flex-row flex-col justify-between  "
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
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
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
      </div>
    </section>
  );
}

export default Part_2;
