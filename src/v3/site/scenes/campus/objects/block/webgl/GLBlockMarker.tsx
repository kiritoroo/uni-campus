import { cn } from "@Utils/common.utils";
import { Html } from "@react-three/drei";
import { TBlockSchema } from "@v3/site/schemas/block";
import { useBlockStore } from "../hooks/useBlockStore";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { randomRand } from "@Utils/math.utils";

const GLBlockMarker = ({ blockData }: { blockData: TBlockSchema }) => {
  const blockStore = useBlockStore();

  const isPointerEnterBlockNearest = blockStore.use.isPointerEnterBlockNearest();

  const [markerRefForce, setMarkerRefForce] = useState<HTMLDivElement | null>(null);
  const [, animate] = useAnimate();

  useEffect(() => {
    if (!markerRefForce) return;

    if (isPointerEnterBlockNearest) {
      animate(
        markerRefForce,
        { y: "-15px", scale: 1.15 },
        { type: "spring", mass: 0.5, stiffness: 100, damping: 5 },
      );
    }

    if (!isPointerEnterBlockNearest) {
      animate(
        markerRefForce,
        { y: 0, scale: 1 },
        { type: "spring", mass: 0.5, stiffness: 100, damping: 10 },
      );
    }
  }, [isPointerEnterBlockNearest]);

  useEffect(() => {
    if (!markerRefForce) return;

    // Animate on first enter scene
    animate(
      markerRefForce,
      { scale: 1 },
      {
        type: "spring",
        mass: randomRand(0.5, 0.8),
        stiffness: randomRand(50, 100),
        damping: randomRand(5, 10),
        delay: randomRand(0.0, 0.4),
        onPlay: () => {},
        onComplete: () => {},
      },
    );
  }, [markerRefForce]);

  return (
    <group
      position={[
        blockData.marker_position.x,
        blockData.marker_position.y,
        blockData.marker_position.z,
      ]}
    >
      <Html distanceFactor={200} position={[0, 0, 0]} center className="pointer-events-none">
        <motion.div
          ref={(el) => {
            if (el) {
              setMarkerRefForce(el);
            }
          }}
          initial={{
            scale: 0,
          }}
          className="pointer-events-none relative cursor-pointer select-none text-center drop-shadow-lg"
        >
          <div
            className={cn(
              "relative z-[2] w-max  max-w-[400px] bg-[#454545] px-8 py-3 text-[#FFFFFF]",
              { "bg-[#7f99b4] transition-colors duration-100": isPointerEnterBlockNearest },
            )}
          >
            <div className="text-[14px] font-bold uppercase">{blockData.name}</div>

            <div
              className={cn(
                "bottom absolute bottom-0 left-1/2 z-[2] h-3 w-3 origin-center translate-x-[-50%] translate-y-[calc(50%)] rotate-45 bg-[#363636]",
                { "bg-[#516274] transition-colors duration-100": isPointerEnterBlockNearest },
              )}
            />
          </div>
        </motion.div>
      </Html>
    </group>
  );
};

export default GLBlockMarker;
