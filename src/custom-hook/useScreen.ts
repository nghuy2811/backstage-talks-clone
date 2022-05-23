import React, { useState, useEffect } from "react";

const useScreen = () => {
  const [isOnLargeScreen, setIsOnLargerScreen] = useState<boolean>();
  const [viewWidth, setViewWidth] = useState(0);

  useEffect(() => {
    setViewWidth(window.innerWidth);
    window.addEventListener("resize", () => setViewWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setViewWidth(window.innerWidth)
      );
  }, [viewWidth]);

  useEffect(() => {
    if (viewWidth > 990) {
      setIsOnLargerScreen(true);
    } else setIsOnLargerScreen(false);
  }, [viewWidth, isOnLargeScreen]);

  return {
    isMobile: !isOnLargeScreen,
    isDesktop: isOnLargeScreen,
  };
};

export default useScreen;
