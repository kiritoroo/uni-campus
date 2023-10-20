import { cn } from "@Utils/common.utils";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { Icons } from "@Scripts/ui/Icons";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";

interface UIBuildingMarkerProps {
  position: THREE.Vector3;
  label: string;
  uses: string;
}

export const UIBuildingMarker = ({ position, label, uses }: UIBuildingMarkerProps) => {
  const buildingStoreProxy = useBuildingStoreProxyInContext();
  const snapBuildingStoreProxy = useSnapshot(buildingStoreProxy);

  return (
    <group position={position}>
      <Html distanceFactor={200} position={[0, 0, 0]} center className="pointer-events-none">
        <motion.div
          animate={
            snapBuildingStoreProxy.isPointerEnter
              ? {
                  y: "-15px",
                  scale: 1.15,
                  transition: { type: "spring", mass: 0.5, stiffness: 100, damping: 5 },
                }
              : {
                  y: "0",
                  scale: 1,
                  transition: { type: "spring", mass: 0.5, stiffness: 100, damping: 10 },
                }
          }
          className="pointer-events-none relative cursor-pointer select-none text-center drop-shadow-lg"
        >
          <div
            className={cn(
              "relative z-[2] w-max max-w-[400px] rounded-[5px] bg-[#404A57] px-4 py-2 text-[#FFFFFF]",
              {
                "bg-[#365AAB] transition-colors duration-300":
                  snapBuildingStoreProxy.isPointerEnter,
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

            <h2 className="text-[16px] font-medium">{label}</h2>
            {snapBuildingStoreProxy.isPointerEnter && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", type: "keyframes" }}
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
                  snapBuildingStoreProxy.isPointerEnter,
              },
            )}
          />
        </motion.div>
      </Html>
    </group>
  );
};
