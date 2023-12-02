import GLEntry from "../webgl/scenes/campus/GLEntry";
import { CampusSceneStoreProvider } from "../webgl/scenes/campus/contexts/CampusSceneStoreContext";

const CampusScreen = () => {
  return (
    <CampusSceneStoreProvider>
      <GLEntry />
    </CampusSceneStoreProvider>
  );
};

export default CampusScreen;
