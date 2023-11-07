import Entry from "../widgets/buildings/Entry";
import { CommonStoreProvider } from "../widgets/buildings/contexts/CommonStoreContext";

const BuildingsManager = () => {
  return (
    <CommonStoreProvider>
      <Entry />
    </CommonStoreProvider>
  );
};

export default BuildingsManager;
