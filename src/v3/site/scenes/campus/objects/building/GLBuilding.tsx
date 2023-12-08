import { TBuildingSchema } from "@v3/site/schemas/building";
import { BuildingStoreProvider } from "./contexts/BuildingStoreContext";
import Entry from "./Entry";
import { memo } from "react";

const GLBuilding = memo(({ buildingData }: { buildingData: TBuildingSchema }) => {
  return (
    <BuildingStoreProvider>
      <Entry buildingData={buildingData} />
    </BuildingStoreProvider>
  );
});

export default GLBuilding;
