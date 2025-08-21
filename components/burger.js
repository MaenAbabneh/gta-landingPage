"use client";
import clsx from "clsx";

function Burger({ isMenuOpen, setIsMenuOpen , ClassName=""  }) {
  return (
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={clsx(`flex justify-center items-center rounded-full  w-12 h-12 xl:w-13 xl:h-13  outline-solid outline-transparent transition-all duration-200 ease-in-out`, {
          [`bg-white/5 hover:bg-gta-white/10 transform-all duration-75 ease-in-out `]: isMenuOpen,
          [``]: !isMenuOpen
        },
        ClassName)}
        aria-label="Toggle Menu"
      >
        <div
          className={`flex flex-col items-center justify-center  origin-center animate-fill-forwards duration-250 ease-in-out ${isMenuOpen ? "gap-1" : "gap-[0.3rem]"}`}
        >
          <span
            className={`bg-gta-white  transition-all origin-center duration-400 ease-in-out animate-fill-forwards  ${isMenuOpen ? "translate-y-1 rotate-45 w-[1rem] h-[0.23rem] " : "w-6.5 h-[0.36rem] xl:w-7 "}`}
          ></span>
          <span
            className={`bg-gta-white  transition-all origin-center duration-400 ease-in-out animate-fill-forwards  ${isMenuOpen ? "-translate-y-1 -rotate-45 w-[1rem] h-[0.23rem] " : "w-6.5 h-[0.36rem] xl:w-7"}`}
          ></span>
        </div>
      </button>
  );
}

export default Burger;
