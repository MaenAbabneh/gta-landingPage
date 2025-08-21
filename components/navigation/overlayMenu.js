import Image from "next/image";

import { gtaData } from "@/constants/Links";

import  Burger  from "../burger";

function OverlayMenu({
  isMenuOpen,
  setIsMenuOpen,
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
          <div className="flex flex-col items-start pl-6">
            {gtaData.People.map((person, index) => {
              const sectionName = person.href.replace(/^\/+|#+/g, ""); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`cursor-pointer font-long font-medium clamp text-[3.56rem] uppercase transition-colors duration-300 leading-none text-left tracking-normal ${
                    isActive
                      ? "text-gta-pink"
                      : "text-gta-white hover:text-gta-yellow"
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
          <div className="flex flex-col items-start space-y-6">
            {gtaData.Places.map((place, index) => {
              const sectionName = place.href.replace(/^\/+|#+/g, ""); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`text-white font-round font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide transition-colors duration-300 text-left ${
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
          <div className="space-y-6">
            {gtaData.Trailers.map((trailer, index) => (
              <div
                key={index}
                className="flex items-center gap-6 cursor-pointer"
                onMouseEnter={() =>
                  handleItemHover({ image: trailer.thumbnail })
                }
                onMouseLeave={handleItemLeave}
              >
                <div className="relative">
                  <Image
                    src={trailer.thumbnail || "/placeholder.svg"}
                    alt={trailer.title}
                    width={320}
                    height={192}
                    className="w-80 h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {trailer.duration}
                  </div>
                  {trailer.isNew && (
                    <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="text-white">
                  <h3 className="font-round font-bold text-2xl mb-2">
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
          <div className="space-y-6">
            {gtaData.Downloads.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}
              >
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                  width={320}
                  height={192}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-6 rounded-lg">
                  <h3 className="text-white font-round font-bold text-3xl">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 w-full h-dvh  pointer-events-auto ">

      <div className="flex  w-screen  bg-gta-overlay-50 filter backdrop-blur-[150px] backdrop-brightness-[120%] backdrop-saturate-[250%] transform-all duration-500  animate-fade-in animate-fill-forward">

        <div className="flex flex-row justify-center items-center  h-screen min-w-[40vw] xl:min-w-[50vw]">
          {hoveredItem &&
          (activeTab === "People" || activeTab === "Places") &&
          hoveredItem.image ? (
            <Image
              src={hoveredItem.image}
              alt={hoveredItem.label || "Content"}
              width={1200}
              height={720}
              className="animate-fade-in hidden sm:block object-cover h-full absolute top-0 left-0"
            />
          ) : (
              <Image
                src="/images/gta-vi-logo-white.svg"
                alt="GTA VI Logo"
                width={242}
                height={0}
                className="animate-fade-in  logo-glow "
              />
          )}
        </div>
      </div>

      {/* Right Column: Enhanced near-black background with authentic styling */}
      <div className="flex flex-col fixed right-0 top-0 bg-gta-column-left  w-[85vw] md:w-[60vw] xl:w-[50vw] h-screen z-10 animate-slide-left ">
        <div className="flex justify-between items-center mt-11 ml-10 mr-35 ">
          <div className="hidden md:flex pl-2   ">
            {Object.keys(gtaData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-13 px-6 rounded-full transition-all nav-font text-bxl tracking-wider cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-gta-black"
                    : "text-white hover:text-gta-yellow"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
      
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderTabContent()}
        </div>
      </div>

    </div>
  );
}

export default OverlayMenu;
