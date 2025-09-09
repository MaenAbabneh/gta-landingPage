import Image from "next/image";
import React from "react";

import { PsIcon, XboxIcon } from "../svg";

function ComingSoon({ comingSoonRef }) {
  return (
    <section
      ref={comingSoonRef}
      className=" w-dvw h-dvh  flex flex-col items-center justify-center  text-white "
    >
      {/* الشعار */}
      <div className=" w-40 h-40 md:w-52 md:h-52 relative ">
        <Image
          src="/images/logo.webp"
          alt="Grand Theft Auto VI Logo"
          layout="fill"
          className="object-contain"
        />
      </div>

      {/* نص "COMING MAY 26 2026" */}
      <div className="text-center text-clip  ">
        <h3 className=" text-[4rem] md:text-[6.2rem] font-black  mb-11 leading-15  md:leading-22 ">
          COMING
          <br />
          MAY 26
          <br />
          2026
        </h3>
      </div>

      {/* أيقونات المنصات */}
      <div className="flex items-center text-gta-white mb-4">
        <PsIcon className=""  />
        <XboxIcon className=" " />
      </div>
    </section>
  );
}

export default ComingSoon;
