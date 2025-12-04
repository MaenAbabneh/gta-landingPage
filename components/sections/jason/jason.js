import JasonContent_1 from "./jasonContent_1";
import JasonContent_2 from "./jasonContent_2";
import JasonIntro from "./jasonIntro";
import JasonVideo from "./jasonVideo";

function Jason() {
  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-hidden">
        <JasonIntro />
        <JasonContent_1 />
        <JasonVideo />
        <JasonContent_2 />
      </div>
    </>
  );
}

export default Jason;
