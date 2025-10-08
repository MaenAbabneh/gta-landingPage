"use client";
import clsx from "clsx";

function Burger({
  isMenuOpen,
  setIsMenuOpen,
  ClassName = "",
  isOpenStyle = "",
  spanStyleUp = "",
  spanStyleDown = "",
}) {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={clsx(
        ` group cursor-pointer flex justify-center items-center rounded-full w-18 h-18  md:w-12 md:h-12 xl:w-13 xl:h-13  outline-solid outline-transparent transition-all duration-200 ease-in-out`,
        {
          [` ${isOpenStyle} `]: isMenuOpen,
          [``]: !isMenuOpen,
        },
        ClassName
      )}
      aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
    >
      <div
        className={`flex flex-col items-center justify-center  origin-center animate-fill-forwards duration-250 ease-in-out ${isMenuOpen ? "gap-1" : "gap-[0.3rem]"}`}
      >
        <span
          className={`bg-gta-white  transition-all origin-center duration-400 ease-in-out animate-fill-forwards  ${isMenuOpen ? `translate-y-1 rotate-45 w-4 md:w-[1rem] h-[0.23rem] ${spanStyleUp}` : "w-8 h-2 md:w-6.5 md:h-1.5  group-hover:bg-gta-yellow"}`}
        ></span>
        <span
          className={`bg-gta-white  transition-all origin-center duration-400 ease-in-out animate-fill-forwards  ${isMenuOpen ? `-translate-y-1 -rotate-45 w-4 md:w-[1rem] h-[0.23rem] ${spanStyleDown}` : "w-8 h-2 md:w-6.5 md:h-1.5 group-hover:bg-gta-yellow"}`}
        ></span>
      </div>
    </button>
  );
}

export default Burger;
