import Entry from "../widgets/space/Entry";
import { CommonStoreProvider } from "../widgets/space/contexts/CommonStoreContext";
import { SpaceStoreProvider } from "../widgets/space/contexts/SpaceStoreContext";

const SpaceManager = () => {
  return (
    <CommonStoreProvider>
      <SpaceStoreProvider>
        <Entry />
      </SpaceStoreProvider>
    </CommonStoreProvider>
  );
};

export default SpaceManager;
