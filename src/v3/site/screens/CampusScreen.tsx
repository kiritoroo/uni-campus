import { memo } from "react";
import { CampusSceneStoreProvider } from "../scenes/campus/contexts/CampusSceneStoreContext";
import Entry from "../scenes/campus/Entry";

const CampusScreen = memo(() => {
  return (
    <CampusSceneStoreProvider mode="prod">
      <Entry />
    </CampusSceneStoreProvider>
  );
});

export default CampusScreen;
