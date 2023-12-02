import { TBuildingSchema } from "@v3/site/schemas/building";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useEffect } from "react";
import { randomRand } from "@Utils/math.utils";

const Entry = ({ buildingData }: { buildingData: TBuildingSchema }) => {
  const buildingStore = useBuildingStore();
  const buildingActions = buildingStore.use.actions();

  useEffect(() => {
    buildingActions.initBuildingData({ buildingData: buildingData });
  }, []);

  return (
    <group position={[randomRand(-100, 100), randomRand(-100, 100), randomRand(-100, 100)]}>
      <mesh scale={20}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default Entry;
