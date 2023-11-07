import Entry from "../widgets/building/Entry";
import { BuildingStoreProvider } from "../widgets/building/contexts/BuildingStoreContext";
import { CommonStoreProvider } from "../widgets/building/contexts/CommonStoreContext";

const BuildingManager = () => {
  return (
    <CommonStoreProvider>
      <BuildingStoreProvider>
        <Entry />
      </BuildingStoreProvider>
    </CommonStoreProvider>
  );
};

export default BuildingManager;
