"use client";

import { createContext, useContext, useMemo,useState } from "react";

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
    setSelectedTrailer(null)
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
