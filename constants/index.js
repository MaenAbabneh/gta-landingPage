import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 766 });
  const isTablet = useMediaQuery({ minWidth: 766, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskSize: "3100% ",
      maskPos: "50% 49.8%",
      maskPos2: "50% 50%",
      maskSize: "40% ",
      maskSize2: "120px ",
    };
  }

  if (isTablet) {
    return {
      initialMaskSize: "3500% ",
      maskPos: "50% 50%",
      maskPos2: "50% 50%",
      maskSize: "26% ",
      maskSize2: "20% ",
    };
  }

  return {
    initialMaskSize: "3500% ",
    maskPos: "50% 50%",
    maskPos2: "50% 50%",
    maskSize: "13.8% ",
    maskSize2: "10% ",
  };
};