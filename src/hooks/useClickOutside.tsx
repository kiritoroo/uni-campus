import React from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | undefined>,
  callback: () => void,
  options?: {
    exclude: string[];
  },
) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (options && options.exclude.every((id) => e.target.id !== id)) {
        callback();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
