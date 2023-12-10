import { Html } from "@react-three/drei";
import { TBlockSchema } from "@v3/site/schemas/block";
import { memo, useMemo, useRef } from "react";
import { useBlockStore } from "../hooks/useBlockStore";
import { ChevronRightIcon } from "lucide-react";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@Utils/common.utils";
import { useBuildingStore } from "../../building/hooks/useBuildingStore";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import { useCampusStore } from "../../campus/hooks/useCampusStore";

const GLBlockMarkerOverview = memo(({ blockData }: { blockData: TBlockSchema }) => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();
  const blockStore = useBlockStore();

  const distanceFromCameraToOrigin = campusSceneStore.use.distanceFromCameraToOrigin();
  const buildingPicked = campusStore.use.buildingPicked();
  const buildingData = buildingStore.use.buildingData()!;
  const distanceFromCameraToBuilding = buildingStore.use.distanceFromCameraToBuilding();
  const blockPicked = buildingStore.use.blockPicked();
  const isBlockShowInfo = blockStore.use.isBlockShowInfo();
  const distanceFromCameraToBlock = blockStore.use.distanceFromCameraToBlock();
  const isBlockPointerEnterNearest = blockStore.use.isPointerEnterBlockNearest();
  const isBlockPicked = blockStore.use.isBlockPicked();

  const navigate = useNavigate();

  const groupRef = useRef<THREE.Group | null>(null);

  const isBlockNearCamera = useMemo(() => {
    if (
      distanceFromCameraToBuilding < distanceFromCameraToOrigin &&
      distanceFromCameraToBlock < distanceFromCameraToOrigin
    )
      return true;
    return false;
  }, [distanceFromCameraToOrigin, distanceFromCameraToBlock]);

  const handleOnClickDetail = () => {
    navigate(`${blockData.slug}`);

    campusStore.setState({ buildingPicked: { buildingId: buildingData.id } });
    buildingStore.setState({ isBuildingPicked: true });
    buildingStore.setState({ blockPicked: { blockId: blockData.id } });
    blockStore.setState({ isBlockPicked: true });
  };

  const renderedHtmlLabel = useMemo(() => {
    return (
      <Html
        distanceFactor={200}
        position={[0, 0, 0]}
        center
        className={cn("pointer-events-none")}
        zIndexRange={isBlockShowInfo ? [99999000, 99999999] : undefined}
      >
        <div className="-translate-y-[50%]">
          <div
            className={cn("mb-5 transition-all duration-500", {
              "pointer-events-none select-none opacity-0": !isBlockShowInfo,
              "select-uto pointer-events-auto opacity-100": isBlockShowInfo,
            })}
          >
            <div className="bg-white drop-shadow-md">
              <div className="flex items-stretch justify-center">
                <div className="px-8 py-6">
                  <div className="whitespace-nowrap text-lg font-bold text-[#495363]">
                    {blockData.name}
                  </div>
                  <div className="min-w-[200px] font-medium text-[#495363]/60">
                    {blockData.uses}
                  </div>
                </div>
                <div className="flex items-center justify-center border-l border-[#495363]/30 px-6 py-4">
                  <button
                    onClick={handleOnClickDetail}
                    className="flex items-center justify-center rounded-full bg-[#495363] p-3 transition-all duration-200 hover:scale-125"
                  >
                    <ChevronRightIcon className="h-8 w-8 stroke-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none relative flex cursor-pointer select-none items-center justify-center text-center"
          >
            <div
              className={cn(
                "flex h-fit w-fit items-center justify-center rounded-full bg-white/50 p-3 shadow-sm transition-all duration-200",
                { "scale-150 animate-[ripple_2s_infinite]": isBlockPointerEnterNearest },
                { "scale-110 animate-[ripple_2s_infinite]": isBlockShowInfo },
              )}
            >
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center rounded-full bg-[#495363] p-2 transition-all duration-200",
                  { "bg-[#96a5bc]": isBlockPointerEnterNearest },
                  { "bg-[#96a5bc]": isBlockShowInfo },
                )}
              >
                <div className="h-5 w-5 text-center font-geist text-sm font-semibold text-white">
                  {blockData.order}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Html>
    );
  }, [isBlockShowInfo, isBlockPointerEnterNearest]);

  return (
    <group
      ref={groupRef}
      position={[
        blockData.marker_position.x,
        blockData.marker_position.y - 10,
        blockData.marker_position.z,
      ]}
    >
      {(isBlockNearCamera || isBlockShowInfo) &&
        !blockPicked &&
        !buildingPicked &&
        renderedHtmlLabel}
    </group>
  );
});

export default GLBlockMarkerOverview;
