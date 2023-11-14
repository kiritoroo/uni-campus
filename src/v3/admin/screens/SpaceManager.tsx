import Entry from "../widgets/space/Entry";
import { SpaceStoreProvider } from "../widgets/space/contexts/SpaceStoreContext";

const SpaceManager = () => {
  return (
    <SpaceStoreProvider>
      <Entry />
    </SpaceStoreProvider>
  );
};

export default SpaceManager;
