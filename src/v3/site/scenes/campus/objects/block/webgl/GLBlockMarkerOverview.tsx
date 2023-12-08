import { Html } from "@react-three/drei";
import { TBlockSchema } from "@v3/site/schemas/block";
import { memo } from "react";
import { useBlockStore } from "../hooks/useBlockStore";
import { ChevronRightIcon } from "lucide-react";

const GLBlockMarkerOverview = memo(({ blockData }: { blockData: TBlockSchema }) => {
  const blockStore = useBlockStore();

  // const isBlockPointerEnterNearest = blockStore.use.isPointerEnterBlockNearest();

  return (
    <group
      position={[
        blockData.marker_position.x,
        blockData.marker_position.y - 10,
        blockData.marker_position.z,
      ]}
    >
      <Html distanceFactor={200} position={[0, 0, 0]} center className="pointer-events-none">
        <div className="pointer-events-none relative cursor-pointer select-none text-center">
          <div className="flex aspect-square items-center justify-center rounded-full bg-white/50 p-3">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#495363] p-2">
              <div className="text-sm font-semibold text-white">
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
        </div>
      </Html>
    </group>
  );
});

export default GLBlockMarkerOverview;
