import Image from "next/image";

import { gtaData } from "@/constants/Links";

import { ArrowSvg, FullArrowSvg, GloableSvg, NavLogo } from "../svg";

function OverlayMenu({
  activeTab,
  activeSection,
  hoveredItem,
  handleLinkClick,
  setHoveredItem,
  setActiveTab,
}) {
  const handleItemHover = (image) => {
    setHoveredItem(image);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "People":
        return (
          <div className="flex flex-col items-start pt-9 ">
            {gtaData.People.map((person, index) => {
              const sectionName = person.href.replace(/^\/+|#+/g, ""); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`text-gta-white cursor-pointer text-wrap font-long font-black text-[3.56rem]  uppercase transition-colors duration-500 leading-none  ${
                    isActive ? "text-gta-pink" : "hover:text-gta-yellow"
                  }`}
                  onClick={() => handleLinkClick(person.href)}
                  onMouseEnter={() => handleItemHover(person)}
                  onMouseLeave={handleItemLeave}
                >
                  {person.label}
                </button>
              );
            })}
          </div>
        );

      case "Places":
        return (
          <div className="flex flex-col items-start pt-23">
            {gtaData.Places.map((place, index) => {
              const sectionName = place.href.replace(/^\/+|#+/g, ""); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`text-gta-white font-long text-[3.56rem] uppercase leading-none transition-colors duration-300 text-left ${
                    isActive ? "text-gta-pink" : "hover:text-gta-yellow"
                  }`}
                  onClick={() => handleLinkClick(place.href)}
                  onMouseEnter={() => handleItemHover(place)}
                  onMouseLeave={handleItemLeave}
                >
                  {place.label}
                </button>
              );
            })}
          </div>
        );

      case "Trailers":
        return (
          <div className="space-y-6 pt-20">
            {gtaData.Trailers.map((trailer, index) => (
              <div
                key={index}
                className="flex items-center gap-4 justify-start bg-white/5 hover:bg-white/10 cursor-pointer "
                onMouseEnter={() =>
                  handleItemHover({ image: trailer.thumbnail })
                }
                onMouseLeave={handleItemLeave}
              >
                <div className="relative ">
                  <Image
                    src={trailer.thumbnail || "/placeholder.svg"}
                    alt={trailer.title}
                    width={320}
                    height={192}
                    className="w-80 h-44 object-cover "
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm backdrop-brightness-70">
                      <div className="w-0 h-0 border-l-[11px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {trailer.duration}
                  </div>
                </div>
                <div className="text-white flex flex-col items-start p-0 m-0">
                  {trailer.isNew && (
                    <div className="bg-white text-black text-sm font-long px-2 py-0.5  rounded">
                      NEW
                    </div>
                  )}

                  <h3 className="font-round font-normal text-lg mb-2 mt-2">
                    {trailer.title}
                  </h3>

                  <p className="font-round text-gray-400">{trailer.date}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "Downloads":
        return (
          <div className="space-y-6 flex flex-col ">
            {gtaData.Downloads.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer  text-gta-pink hover:text-gta-gray transition-all duration-300"
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}
              >
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-50 object-cover brightness-75 hover:brightness-100  hover:border-6 border-gta-white transition-all duration-300"
                  width={320}
                  height={192}
                />
                <div className="absolute bottom-0 right-0 left-0 flex items-center justify-between py-3 px-5 rounded-lg">
                  <h3 className="text-white font-long uppercase  text-3xl">
                    {item.title}
                  </h3>
                  <div className="w-10 h-10 bg-gta-gray rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-gta-white transition-all duration-300">
                    <FullArrowSvg className="w-5 h-5 " />
                  </div>
                </div>
              </div>
            ))}
            <button className="self-center flex items-center gap-2 py-3 px-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
              <span className="font-round font-bold text-gta-white text-sm">
                See All Downloads{" "}
              </span>
              <FullArrowSvg className="w-4 h-4 text-gta-white " />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 w-full h-dvh  pointer-events-auto ">
      <div className="flex  w-screen  bg-gta-overlay-50 filter backdrop-blur-[150px] backdrop-brightness-[120%] backdrop-saturate-[250%] transform-all  animate-fade-in">
        <div className=" flex-row justify-center hidden md:flex items-center  h-screen min-w-[40vw] xl:min-w-[50vw]">
          {hoveredItem &&
          (activeTab === "People" || activeTab === "Places") &&
          hoveredItem.image ? (
            <Image
              src={hoveredItem.image}
              alt={hoveredItem.label || "Content"}
              width={1200}
              height={720}
              className="animate-fade-in  object-cover h-full absolute "
            />
          ) : (
            <>
              <div className="logo-glow">
                <NavLogo />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Column: Enhanced near-black background with authentic styling */}
      <div className="flex flex-col fixed right-0 top-0 bg-gta-column-left  w-[85vw] md:w-[60vw] xl:w-[50vw] h-screen z-10 animate-slide-left transition-all ">
        <div className="justify-center mt-13 ml-5 mr-35 lg:mt-12 lg:ml-9 lg:mr-35 items-center font-round font-bold flex md:hidden">
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-2  hover:text-gta-white-60">
            <GloableSvg />
            En
            <ArrowSvg className={"rotate-180"} />
          </button>
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-2 hover:text-gta-white-60">
            Motion
            <ArrowSvg className={"rotate-180"} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-12 ml-5 mr-35 lg:mt-12 lg:ml-14 lg:mr-35  ">
          <div className="hidden md:flex   ">
            {Object.keys(gtaData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-13 px-6 rounded-full transition-all nav-font text-size cursor-pointer ${
                  activeTab === tab
                    ? "bg-gta-white text-gta-black"
                    : "text-gta-white hover:text-gta-yellow"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 py-14 px-15  overflow-y-auto">
          {renderTabContent()}
        </div>

        <div className="justify-between pl-12 pb-10 pr-13 items-center font-round font-bold hidden md:flex">
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-1.5  hover:text-gta-white-60">
            <GloableSvg />
            English
            <ArrowSvg />
          </button>
          <button className="flex items-center justify-center px-2 py-2 bg-transparent text-gta-white gap-1.5 hover:text-gta-white-60">
            Motion
            <ArrowSvg />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayMenu;
