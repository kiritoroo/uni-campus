import { Html } from "@react-three/drei";
import { TBlockSchema } from "@v3/site/schemas/block";
import { memo, useMemo } from "react";
import { useBlockStore } from "../hooks/useBlockStore";
import { ChevronRightIcon } from "lucide-react";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { AnimatePresence, motion } from "framer-motion";

const GLBlockMarkerOverview = memo(({ blockData }: { blockData: TBlockSchema }) => {
  const campusSceneStore = useCampusSceneStore();
  const blockStore = useBlockStore();

  const distanceFromCameraToOrigin = campusSceneStore.use.distanceFromCameraToOrigin();
  const distanceFromCameraToBlock = blockStore.use.distanceFromCameraToBlock();
  // const isBlockPointerEnterNearest = blockStore.use.isPointerEnterBlockNearest();

  const isBlockNearCamera = useMemo(() => {
    if (distanceFromCameraToBlock < distanceFromCameraToOrigin) return true;
    return false;
  }, [distanceFromCameraToOrigin, distanceFromCameraToBlock]);

  const renderedHtmlLabel = useMemo(() => {
    return (
      <Html distanceFactor={200} position={[0, 0, 0]} center className="pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none relative cursor-pointer select-none text-center"
        >
          <div className="flex aspect-square items-center justify-center rounded-full bg-white/50 p-3 shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#495363] p-2">
              <div className="h-5 w-5 text-center font-geist text-sm font-semibold text-white">
                {Math.ceil(Math.random() * 50)}
              </div>
            </div>
          </div>

          {/* <div className="bg-white drop-shadow-md">
              <div className="flex items-stretch justify-center gap-x-10">
                <div className="px-8 py-6">
                  <div className="whitespace-nowrap text-lg font-bold text-[#495363]">
                    {blockData.name}
                  </div>
                  <div className="font-medium text-[#495363]/60">{blockData.uses}</div>
                </div>
                <div className="flex items-center justify-center border-l border-[#495363]/30 px-8 py-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#495363]">
                    <ChevronRightIcon className="stroke-white" />
                  </div>
                </div>
              </div>
            </div> */}
        </motion.div>
      </Html>
    );
  }, []);

  return (
    <group
      position={[
        blockData.marker_position.x,
        blockData.marker_position.y - 10,
        blockData.marker_position.z,
      ]}
    >
      {isBlockNearCamera && renderedHtmlLabel}
    </group>
  );
});

export default GLBlockMarkerOverview;
