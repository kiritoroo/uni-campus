import { cn } from "@Utils/common.utils";
import { Html } from "@react-three/drei";
import { TBlockSchema } from "@v3/site/schemas/block";

const GLBlockMarker = ({ blockData }: { blockData: TBlockSchema }) => {
  return (
    <group
      position={[
        blockData.marker_position.x,
        blockData.marker_position.y,
        blockData.marker_position.z,
      ]}
    >
      <Html distanceFactor={200} position={[0, 0, 0]} center className="pointer-events-none">
        <div className="pointer-events-none relative cursor-pointer select-none text-center drop-shadow-lg">
          <div
            className={cn(
              "relative z-[2] w-max  max-w-[400px] bg-[#454545] px-8 py-3 text-[#FFFFFF]",
            )}
          >
            <div className="text-[14px] font-bold uppercase">{blockData.name}</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default GLBlockMarker;
