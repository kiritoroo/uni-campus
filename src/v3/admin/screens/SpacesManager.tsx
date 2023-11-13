import Entry from "../widgets/spaces/Entry";
import { CommonStoreProvider } from "../widgets/spaces/contexts/CommonStoreContext";
import { SpacesStoreProvider } from "../widgets/spaces/contexts/SpacesStoreContext";

const SpacesManager = () => {
  return (
    <CommonStoreProvider>
      <SpacesStoreProvider>
        <Entry />
      </SpacesStoreProvider>
    </CommonStoreProvider>
  );
};

export default SpacesManager;
