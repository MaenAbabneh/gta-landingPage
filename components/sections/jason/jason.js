import JasonIntro from "./jasonIntro";
import JasonContent_1 from "./jasonContent_1";
import JasonVideo from "./jasonVideo";
import JasonContent_2 from "./jasonContent_2";

function Jason() {
  return (
    <>
      <section id="jason" className="relative flex flex-col w-full h-full overflow-hidden">
        <JasonIntro />
        <JasonContent_1 />
        <JasonVideo />
        <JasonContent_2 />
      </section>
    </>
  );
}

export default Jason;
