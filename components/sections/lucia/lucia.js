import LuciaContent_1 from "./luciaContent_1";
import LuciaContent_2 from "./luciaContent_2";
import LuciaFooter from "./luciaFooter";
import LuciaVideo from "./luciaVideo_1";
import LuciaVideo_2 from "./luciaVideo_2";

function Lucia() {
  return (
    <section
      id="lucia"
      data-background="bg-gta-gradient-primary"
      className=" bg-transparent"
    >
      <LuciaVideo />
      <LuciaContent_1 />
      <LuciaVideo_2 />
      <LuciaContent_2 />
      <LuciaFooter />
    </section>
  );
}

export default Lucia;
