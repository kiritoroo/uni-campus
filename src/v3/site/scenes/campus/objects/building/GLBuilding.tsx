import { TBuildingSchema } from "@v3/site/schemas/building";
import { BuildingStoreProvider } from "./contexts/BuildingStoreContext";
import Entry from "./Entry";

const GLBuilding = ({ buildingData }: { buildingData: TBuildingSchema }) => {
  return (
    <BuildingStoreProvider>
      <Entry buildingData={buildingData} />
    </BuildingStoreProvider>
  );
};

export default GLBuilding;
