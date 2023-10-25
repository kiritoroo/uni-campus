import { cn, lightenDarkenColor } from "@Utils/common.utils";
import { Html } from "@react-three/drei";
import { Variants, motion, useAnimate, useAnimationControls } from "framer-motion";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { Icons } from "@Scripts/shared/Icons";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { RefObject, memo, useEffect, useRef, useState } from "react";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { randomRand } from "@Utils/math.utils";
import { SPACE_COLOR_MAP } from "@Assets/constants";

interface UIBuildingMarkerProps {
  position: THREE.Vector3;
  label: string;
  uses: string;
  space: string;
}

export const UIBuildingMarker = memo(({ position, space, label, uses }: UIBuildingMarkerProps) => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const { buildingPicked } = useSnapshot(campusStoreProxy);
  const { isPicked, isPointerEnter } = useSnapshot(buildingStoreProxy);
  const buildingUUID = useBuildingStoreInContext().use.buildingUUID();

  const [htmlRefForce, setHtmlRefForce] = useState<HTMLDivElement | null>(null);
  const [, animate] = useAnimate();
  const controls = useAnimationControls();
  const variants = useRef<Variants>({
    "state-hide": {
      scale: 0,
      transition: { type: "spring", mass: 0.5, stiffness: randomRand(50, 100), damping: 10 },
      transitionEnd: {
        display: "none",
      },
    },
    "state-idle": {
      y: 0,
      scale: 1,
      transition: { type: "spring", mass: 0.5, stiffness: 100, damping: 10 },
    },
    "state-pointer-enter": {
      y: "-15px",
      scale: 1.15,
      transition: { type: "spring", mass: 0.5, stiffness: 100, damping: 5 },
    },
    "state-picked": {
      y: 0,
      scale: 0,
      transition: { duration: 0.3, delay: 0.5, type: "tween" },
      transitionEnd: {
        display: "none",
      },
    },
  });

  useEffect(() => {
    if (buildingPicked && buildingPicked?.buidlingUUID === buildingUUID && isPicked) {
      controls.start("state-picked");
    } else if (buildingPicked && buildingPicked?.buidlingUUID !== buildingUUID && !isPicked) {
      controls.start("state-hide");
    } else if (buildingPicked === null && isPointerEnter && !isPicked) {
      controls.start("state-pointer-enter");
    } else {
      controls.start("state-idle");
    }
  }, [buildingPicked, isPicked, isPointerEnter]);

  useEffect(() => {
    // Controls cannot first animate because ref is undefined
    // Force solution & animate with gsap
    if (htmlRefForce) {
      animate(
        htmlRefForce,
        { scale: 1 },
        {
          type: "spring",
          mass: randomRand(0.5, 0.8),
          stiffness: randomRand(50, 100),
          damping: randomRand(5, 10),
          delay: randomRand(0.0, 0.4),
          onPlay: () => {},
          onComplete: () => {
            controls.set("state-idle");
          },
        },
      );
      // gsap
      //   .to(htmlRefForce, {
      //     scale: 1,
      //     duration: 0.4 + randomRand(0, 0.2),
      //     ease: Expo.easeInOut,
      //     onStart: () => {
      //       controls.set("state-idle");
      //     },
      //   })
      //   .play();
    }
  }, [htmlRefForce]);

  return (
    <group position={position}>
      <Html
        distanceFactor={200}
        position={[0, 0, 0]}
        // occlude="raycast"
        center
        className="pointer-events-none"
      >
        <motion.div
          ref={(el) => {
            if (el) {
              setHtmlRefForce(el);
            }
          }}
          variants={variants.current}
          initial={{
            scale: 0,
          }}
          animate={controls}
          style={{
            originX: "50%",
            originY: "100%",
          }}
          className="pointer-events-none relative cursor-pointer select-none text-center drop-shadow-lg"
        >
          <div
            style={{
              backgroundColor: SPACE_COLOR_MAP[space] ?? "#FFFFFF",
              borderColor:
                isPointerEnter || isPicked
                  ? lightenDarkenColor("#46448B", -10)
                  : lightenDarkenColor(SPACE_COLOR_MAP[space], -10),
            }}
            className={cn(
              "relative z-[2] w-max max-w-[400px] rounded-[10px] border-2 px-5 py-3 text-[#FFFFFF]",
              {
                "!bg-[#46448B] transition-colors duration-300": isPointerEnter || isPicked,
              },
            )}
          >
            <div className="absolute right-0 top-0 translate-x-[35%] translate-y-[-20%]">
              <div className="animate__pulse ">
                <div className="flex items-center justify-center rounded-full bg-[#F50359] p-[5px]">
                  <Icons.ExclamationMark className="h-[16px] w-[16px] fill-white" />
                </div>
              </div>
            </div>

            <h2 className="text-[18px] font-bold uppercase">{label}</h2>
            {(isPointerEnter || isPicked) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", type: "keyframes", delay: 0.1 }}
                className="text-[14px] font-normal"
              >
                {uses}
              </motion.p>
            )}
          </div>
          <div
            style={{
              backgroundColor: SPACE_COLOR_MAP[space] ?? "#FFFFFF",
              borderColor:
                isPointerEnter || isPicked
                  ? lightenDarkenColor("#46448B", -10)
                  : lightenDarkenColor(SPACE_COLOR_MAP[space], -10),
              // clipPath: "polygon(0 0, 50% 50%, 0 100%)",
            }}
            className={cn(
              "bottom absolute bottom-0 left-1/2 z-[2] h-4 w-4 origin-center translate-x-[-50%] translate-y-[calc(50%)] rotate-45 border-b-2 border-r-2",
              {
                "!bg-[#46448B] transition-colors duration-300": isPointerEnter || isPicked,
              },
            )}
          />
        </motion.div>
      </Html>
    </group>
  );
});
