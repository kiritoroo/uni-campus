import { CampusSceneStoreProvider } from "../webgl/scenes/campus/contexts/CampusSceneStoreContext";
import Entry from "../webgl/scenes/campus/Entry";

const CampusScreen = () => {
  return (
    <CampusSceneStoreProvider>
      <Entry />
    </CampusSceneStoreProvider>
  );
};

export default CampusScreen;
