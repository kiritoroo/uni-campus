import Manager from "../building/Manager";
import { CommonStoreProvider } from "../building/contexts/CommonStoreContext";

const BuildingsManager = () => {
  return (
    <CommonStoreProvider>
      <Manager />
    </CommonStoreProvider>
  );
};

export default BuildingsManager;
