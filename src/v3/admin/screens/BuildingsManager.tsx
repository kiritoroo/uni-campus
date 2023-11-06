import Manager from "../widgets/building/Manager";
import { CommonStoreProvider } from "../widgets/building/contexts/CommonStoreContext";

const BuildingsManager = () => {
  return (
    <CommonStoreProvider>
      <Manager />
    </CommonStoreProvider>
  );
};

export default BuildingsManager;
