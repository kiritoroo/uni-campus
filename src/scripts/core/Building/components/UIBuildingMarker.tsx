import { cn } from "@Utils/common.utils";
import { Html } from "@react-three/drei";
import { Variants, motion, useAnimate, useAnimationControls } from "framer-motion";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { Icons } from "@Scripts/ui/Icons";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";
import { randomRand } from "@Utils/math.utils";
import gsap, { Expo } from "gsap";

interface UIBuildingMarkerProps {
  position: THREE.Vector3;
  label: string;
  uses: string;
}

export const UIBuildingMarker = ({ position, label, uses }: UIBuildingMarkerProps) => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const snapCampusStoreProxy = useSnapshot(campusStoreProxy);
  const snapBuildingStoreProxy = useSnapshot(buildingStoreProxy);
  const buildingUUID = useBuildingStoreInContext().use.building_uuid();

  const [htmlRefForce, setHtmlRefForce] = useState<HTMLDivElement | null>(null);
  const [, animate] = useAnimate();
  const controls = useAnimationControls();
  const variants: Variants = {
    "state-hide": {
      scale: 0,
      transition: { type: "spring", mass: 0.5, stiffness: randomRand(50, 100), damping: 10 },
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
      y: "-15px",
      scale: [0.8, 1.2],
      transition: { type: "spring", mass: 0.5, stiffness: 100, damping: 5 },
    },
  };

  useEffect(() => {
    if (
      snapCampusStoreProxy.buildingPicked?.buidlingUUID === buildingUUID &&
      snapBuildingStoreProxy.isPicked
    ) {
      controls.start("state-picked");
    } else if (
      snapCampusStoreProxy.buildingPicked === null &&
      snapBuildingStoreProxy.isPointerEnter &&
      !snapBuildingStoreProxy.isPicked
    ) {
      controls.start("state-pointer-enter");
    } else if (snapCampusStoreProxy.buildingPicked && !snapBuildingStoreProxy.isPicked) {
      controls.start("state-hide");
    } else {
      controls.start("state-idle");
    }
  }, [
    snapCampusStoreProxy.buildingPicked,
    snapBuildingStoreProxy.isPicked,
    snapBuildingStoreProxy.isPointerEnter,
  ]);

  useEffect(() => {
    // Controls cannot first animate because ref is undefined
    // Force solution & animate with gsap
    if (htmlRefForce) {
      animate(
        htmlRefForce,
        { scale: 1 },
        {
          type: "spring",
          mass: 0.5,
          stiffness: 100,
          damping: 5,
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
          variants={variants}
          initial={"state-hide"}
          animate={controls}
          style={{
            originX: "50%",
            originY: "100%",
          }}
          className="pointer-events-none relative cursor-pointer select-none text-center drop-shadow-lg"
        >
          <div
            className={cn(
              "relative z-[2] w-max max-w-[400px] rounded-[10px] bg-[#404A57] px-5 py-3 text-[#FFFFFF]",
              {
                "bg-[#365AAB] transition-colors duration-300":
                  snapBuildingStoreProxy.isPointerEnter || snapBuildingStoreProxy.isPicked,
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

            <h2 className="text-[16px] font-medium uppercase">{label}</h2>
            {(snapBuildingStoreProxy.isPointerEnter || snapBuildingStoreProxy.isPicked) && (
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
              clipPath: "polygon(0 0, 50% 50%, 0 100%)",
            }}
            className={cn(
              "bottom absolute bottom-0 left-1/2 z-[1] h-5 w-5 origin-center translate-x-[-50%] translate-y-[calc(100%-1px)] rotate-90 bg-[#404A57]",
              {
                "bg-[#365AAB] transition-colors duration-300":
                  snapBuildingStoreProxy.isPointerEnter || snapBuildingStoreProxy.isPicked,
              },
            )}
          />
        </motion.div>
      </Html>
    </group>
  );
};
