import { useClickOutside } from "@Global/hooks/useClickOutside";
import { Icons } from "@Scripts/shared/Icons";
import { cn } from "@Utils/common.utils";
import { css } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export const UICampusSearch = () => {
  const [isFocus, setIsFocus] = useState(false);

  const searchWrapperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(searchWrapperRef, () => {
    setIsFocus(false);
  });

  return (
    <div className="relative translate-x-[20px] translate-y-[-16px] select-none">
      <div
        ref={searchWrapperRef}
        className={cn(
          "w-[380px] rounded-xl px-4 py-4 transition-all duration-100",
          {
            "bg-transparent": !isFocus,
          },
          { "bg-white shadow-[0_2px_8px_1px_rgba(220,220,220,0.3)]": isFocus },
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center overflow-hidden rounded-[10px] bg-white px-8 shadow-[0_1px_5px_0_rgba(220,220,220,0.5)] transition-colors duration-100",
            {
              "bg-[#f0f0f1] shadow-none": isFocus,
            },
          )}
        >
          <input
            className="w-full bg-transparent py-3 text-[14px] font-medium text-[#24244D] placeholder:font-medium placeholder:text-[#24244D]/80 focus:outline-none"
            placeholder="Search Campus Places"
            onFocus={() => {
              setIsFocus(true);
            }}
          />
          <Icons.Search className="ml-6 h-6 w-6 cursor-pointer fill-[#24244D]" />
        </div>

        <AnimatePresence>
          {isFocus && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
                transition: { duration: 0.1 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1 },
              }}
            >
              <div className="py-2 text-[14px]">Search result</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
