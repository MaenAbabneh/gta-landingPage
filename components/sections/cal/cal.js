import CalContent from "./calContent";
import CalHero from "./calHero";

function Cal() {
  return (
    <section
      id="cal"
      data-background="bg-cal-gradient"
      className="overflow-hidden bg-transparent"
    >
      <CalHero />
      <CalContent />
    </section>
  );
}

export default Cal;
