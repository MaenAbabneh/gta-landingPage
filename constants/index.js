import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 766 });
  const isTablet = useMediaQuery({ minWidth: 766, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskSize: "3100% ",
      maskPos: "50% 49.8%",
      maskSize: "160px ",
    };
  }

  if (isTablet) {
    return {
      initialMaskSize: "3500% ",
      maskPos: "50% 50%",
      maskSize: "26% ",
    };
  }

  return {
    initialMaskSize: "3500% ",
    maskPos: "50% 49.8%",
    maskSize: "13.8% ",
  };
};