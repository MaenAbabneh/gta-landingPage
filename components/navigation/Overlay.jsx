import Image from "next/image";
import { gtaData } from "@/constants/Links";


function Overlay({ activeTab, activeSection, hoveredItem, handleLinkClick, setHoveredItem }) {

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
          <div className="flex flex-col items-start ">
            {gtaData.People.map((person, index) => {
              const sectionName = person.href.replace(/^\/+|#+/g, ""); // Clean href
              const isActive = activeSection === sectionName;

              return (
                <button
                  key={index}
                  className={`cursor-pointer font-long text-[3.5rem] uppercase transition-colors duration-300 leading-none text-left tracking-tight ${
                    isActive
                      ? "text-gta-pink"
                      : "text-white hover:text-gta-yellow"
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
                  className={`text-white font-round font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide transition-colors duration-300 text-left ${
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
                  <img
                    src={trailer.thumbnail || "/placeholder.svg"}
                    alt={trailer.title}
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
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
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
    <div
      className="flex h-full bg-gta-overlay-50  "
      style={{
        backdropFilter:
          "brightness(120%) saturate(200%) blur(150px) hue-rotate(-14deg)",
        WebkitBackdropFilter: "brightness(60%) saturate(120%) blur(150px)",
      }}
    >
      {/* Left Column: Dark gradient background with large VI logo */}
      <div className=" flex w-1/6 sm:w-1/3 md:w-[51vw]  h-full justify-center bg-transparent">
        <div className="hidden sm:flex flex-col justify-center items-center gap-4 ">
          {hoveredItem &&
          (activeTab === "People" || activeTab === "Places") &&
          hoveredItem.image ? (
            <Image
              src={hoveredItem.image}
              alt={hoveredItem.label || "Content"}
              width={1200}
              height={720}
              className="animate-fade-in object-cover h-full "
            />
          ) : (
            <div className=" logo-glow relative flex items-center justify-center filter">
              <Image
                src="/images/gta-vi-logo-white.svg"
                alt="GTA VI Logo"
                width={242}
                height={0}
                className="animate-fade-in relative z-10   invert"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Enhanced near-black background with authentic styling */}
      <div
        className="w-5/6 sm:w-2/3 md:w-[49vw] h-[100vh] flex flex-col"
        style={{
          background: "var(--gta-gradient-primary)",
        }}
      >
        {/* Top section with four main tab buttons */}
        <div className="flex items-start justify-start p-4 md:p-8 pt-[3.5rem] md:pt-[3rem] ">
          {/* Group of four main tab buttons - conditionally shown */}
          <div className="flex flex-wrap gap-2 md:gap-1 w-full"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default Overlay;
