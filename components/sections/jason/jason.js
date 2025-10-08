import JasonContent_1 from "./jasonContent_1";
import JasonContent_2 from "./jasonContent_2";
import JasonVideo from "./jasonVideo";

function Jason() {
  return (
    <>
      <section id="jason" className="relative overflow-hidden">
        <JasonContent_1 />
        <JasonVideo />
      </section>
      <JasonContent_2 />
    </>
  );
}

export default Jason;
