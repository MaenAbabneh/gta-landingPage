import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Navbar from "./components/navigation/Navbar";
import Hero from "./components/sections/Hero";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
