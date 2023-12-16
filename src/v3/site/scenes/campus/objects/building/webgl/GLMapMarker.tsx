import { cn } from "@Utils/common.utils";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

export const GLMapMarker = memo(
  ({ label, isShow }: { isShow: boolean; lat: number; lng: number; label: string }) => {
    const variants: { [key: string]: Variants } = {
      marker: {
        hidden: { opacity: 0, y: -20, scale: 0.5 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
        },
        exit: {
          opacity: 0,
          y: 0,
          transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate={isShow ? "show" : "hidden"}
        variants={variants["marker"]}
        className={cn(
          "absolute left-[-25px] top-[-55px] h-[50px] w-[50px] origin-[50%_200%] text-center",
        )}
      >
        <div className="absolute bottom-0 left-[50%] z-[1] w-fit translate-x-[-50%] translate-y-[5px] rounded-full bg-[#F54D55] p-1 text-[14px]">
          <div className="h-[6px] w-[6px] rounded-full bg-white" />
        </div>
        <img
          width={28}
          height={28}
          src={"/v3/images/location.png"}
          className="relative z-[2] h-full w-full origin-[50%_100%] translate-y-[-50%] animate-bounce cursor-pointer object-contain"
        />
      </motion.div>
    );
  },
);
