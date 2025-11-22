import LuciaContent_1 from "./luciaContent_1";
import LuciaContent_2 from "./luciaContent_2";
import LuciaFooter from "./luciaFooter";
import LuciaVideo from "./luciaVideo_1";
import LuciaVideo_2 from "./luciaVideo_2";

function Lucia() {
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden"
    >
      <LuciaVideo />
      <LuciaContent_1 />
      <LuciaVideo_2 />
      <LuciaContent_2 />
      <LuciaFooter />
    </div>
  );
}

export default Lucia;
