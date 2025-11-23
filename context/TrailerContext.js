"use client";

import { createContext, useContext, useState, useMemo } from "react";

const TrailerContext = createContext({
  isOpen: false,
  selectedTrailer: null,
  openTrailer: () => {},
  closeTrailer: () => {},
});

export const useTrailer = () => useContext(TrailerContext);

export const TrailerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const openTrailer = (trailerData) => {
    setSelectedTrailer(trailerData);
    setIsOpen(true);
  };

  const closeTrailer = () => {
    setIsOpen(false);
    // Delay clearing data to allow exit animation to finish
    setTimeout(() => setSelectedTrailer(null), 500);
  };

  // Use useMemo to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isOpen,
      selectedTrailer,
      openTrailer,
      closeTrailer,
    }),
    [isOpen, selectedTrailer]
  );

  return (
    <TrailerContext.Provider value={value}>{children}</TrailerContext.Provider>
  );
};
