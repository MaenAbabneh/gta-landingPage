import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to GTAIV</h1>
      <p className="mt-4 text-lg">
        Experience the world of Grand Theft Auto IV like never before.
      </p>
      <Image
        src="/path/to/your/image.jpg"
        alt="GTAIV"
        width={500}
        height={300}
        className="mt-8 rounded-lg"
      />
    </main>
  );
}
