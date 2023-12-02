import { SoundFxProvider } from "../contexts/SoundFxContext";
import GLCampusScene from "../webgl/scenes/GLCampusScene";

const CampusScreen = () => {
  return (
    <SoundFxProvider>
      <GLCampusScene />
    </SoundFxProvider>
  );
};

export default CampusScreen;
