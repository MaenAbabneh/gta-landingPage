"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ComingSoon from "../ui/comingsoon";
import Link from "next/link";
import { RockstarSvg, ESRBSvg } from "../ui/svg";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const comingRef = useRef(null);
  const comingSoonRef = useRef(null);
  const VIlogoRef = useRef(null);
  const textRef = useRef(null);
  const consolesRef = useRef(null);

  useGSAP(
    () => {
      gsap.set([VIlogoRef.current, footerRef.current], { autoAlpha: 0 });
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: comingRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
      mainTl.fromTo(
        comingSoonRef.current,
        {
          scale: 1.1,
        },
        {
          scale: 1,
        },
        0
      );
      mainTl.fromTo(
        textRef.current,
        {
          backgroundImage: `radial-gradient(
          circle at 50% 150vh,
          rgba(255, 214, 135, 0) 0vh,
          rgba(157, 47, 106, 0.5) 50vh,
          rgba(157, 47, 106, 0.8) 90vh,
          rgba(32, 31, 66, 0) 100vh)`,
        },
        {
          backgroundImage: `radial-gradient(
          circle at 50% -30vh,
          rgb(255, 213, 133) 0px,
          rgb(247, 77, 82) 50vh,
          rgb(145, 42, 105) 90vh,
          rgba(32, 31, 66, 0) 150vh)`,
        },
        0
      );
      mainTl.to(
        VIlogoRef.current,
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        0
      );
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () =>
            mainTl.scrollTrigger ? mainTl.scrollTrigger.end : "bottom bottom",
          end: "+=50%",
          scrub: true,
          id: "exit-anim",
          invalidateOnRefresh: true, // لإعادة الحساب عند تغيير حجم الشاشة
        },
      });
      exitTl.to(
        footerRef.current,
        {
          autoAlpha: 1,
          ease: "none",
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center  pb-[min(8vw,204px)] -mt-[90vh]"
    >
      <div ref={comingRef} className="h-[200vh] ">
        <ComingSoon refs={{ comingSoonRef, VIlogoRef, textRef, consolesRef }} />
      </div>
      <footer
        ref={footerRef}
        className="relative flex flex-col items-center justify-center gap-[20px] md:gap-[36px] -pt-20 pointer-events-auto"
      >
        <div className="flex items-center justify-center gap-[20px] md:gap-[36px] px-[min(2vw,51.2px)] ">
          <p className="text-gta-white text-[min(3vw,76.8px)] md:text-[min(1.77vw,48.128px)] font-round font-bold text-balance tracking-[-0.0125em] cursor-pointer">
            Wishlist Now
          </p>
          <div className="flex items-center justify-center gap-[20px] md:gap-[36px] ">
            <Link
              href={"https://www.playstation.com/games/grand-theft-auto-vi"}
              className="px-3 py-2 md:px-5 md:py-3 lg:px-6.5 lg:py-4.5 bg-[hsla(0,0%,100%,0.1)] rounded-full group hover:bg-[hsla(0,0%,100%,0.2)] transition-colors duration-300"
            >
              <Image
                src={"/images/ps-logo.svg"}
                alt="PlayStation Store"
                width={64}
                height={64}
                className="w-auto h-2  md:h-4 group-hover:scale-105 transition-transform duration-300 "
              />
            </Link>
            <Link
              href={
                "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn"
              }
              className="px-3 py-2 md:px-5 md:py-3 lg:px-6.5 lg:py-4.5 bg-[hsla(0,0%,100%,0.1)] rounded-full group hover:bg-[hsla(0,0%,100%,0.2)] transition-colors duration-300"
            >
              <Image
                src={"/images/x-logo.svg"}
                alt="PlayStation Store"
                width={64}
                height={64}
                className="w-auto h-2 md:h-4 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        <div className="grid footer-grid items-center justify-center">
          <Link
            href={
              "https://signin.rockstargames.com/signin/user-form?cid=rsg&returnUrl=%2FVI%2Fcal"
            }
            className="flex items-center justify-center bg-transparent hover:bg-gray-500 rounded-full border-1 border-[hsl(0,0%,100%,0.2)] mt-6 col-start-2 col-end-12 md:col-start-4 md:col-end-10 text-center md:py-3 w-full h-full"
          >
            <strong className="flex flex-row cursor-pointer items-center justify-center  lg:px-6 lg:py-6 ">
              <RockstarSvg className="w-auto h-4 md:h-8 lg:h-6 text-white " />
              <div className="text-gta-white text-[min(1.5vw,38.128px)] md:text-[min(1vw,48.128px)] font-round font-bold text-nowrap">
                Get Rockstar Propaganda
              </div>
            </strong>
            <span className="block text-gta-white text-[min(1.8vw,48.128px)] md:text-[min(1vw,27px)] font-round mt- cursor-pointer mx-auto lg:px-6 text-balance leading-[1.3] ">
              Get the latest game announcements, updates on special events and
              offers, and much more from Rockstar Games.
            </span>
          </Link>
        </div>

        <nav className="w-full flex flex-row items-center justify-center gap-3 md:gap-6 lg:gap-10 font-round font-bold text-[hsla(0,0%,100%,.6)] text-[min(2.333vw,59.64px)] md:text-[min(1.2vw,51.2px)]  flex-wrap text-center  pt-6   ">
          <Link href={"#"} className="hover:underline">
            Corporate
          </Link>

          <Link href={"#"} className="hover:underline">
            Privacy
          </Link>

          <Link href={"#"} className="hover:underline">
            Cookie Settings
          </Link>
          <Link href={"#"} className="hover:underline">
            Cookie Policy
          </Link>

          <Link href={"#"} className="hover:underline">
            Legal
          </Link>

          <Link href={"#"} className="hover:underline">
            Do Not Sell or Share My Personal Information
          </Link>
        </nav>

        <div className="flex flex-row iteam-center justify-center gap-[20px] md:gap-[36px] pointer-events-auto">
          <ESRBSvg className={"w-auto h-6 md:h-10 lg:h-15"} />
          <p className="text-gta-white text-[min(1.5vw,38.128px)] md:text-[min(1.2vw,22.128px)] font-round font-bold text-balance tracking-[-0.0125em] leading-[1.3]">
            May contain content inappropriate for children.
            <br /> Visit{" "}
            <Link
              href={"https://www.esrb.org/"}
              className=" underline hover:text-[hsla(0,0%,100%,.6)] cursor-pointer "
            >
              esrb.org
            </Link>{" "}
            for rating information.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
