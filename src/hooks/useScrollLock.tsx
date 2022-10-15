import React from "react";

export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "unset";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
