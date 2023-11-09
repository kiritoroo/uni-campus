import Entry from "../widgets/buildings/Entry";
import { BuildingsStoreProvider } from "../widgets/buildings/contexts/BuildingsStoreContext";
import { CommonStoreProvider } from "../widgets/buildings/contexts/CommonStoreContext";

const BuildingsManager = () => {
  return (
    <CommonStoreProvider>
      <BuildingsStoreProvider>
        <Entry />
      </BuildingsStoreProvider>
    </CommonStoreProvider>
  );
};

export default BuildingsManager;
