import { SoundFxProvider } from "../contexts/SoundFxContext";
import GLEntry from "../webgl/scenes/campus/GLEntry";

const CampusScreen = () => {
  return (
    <SoundFxProvider>
      <GLEntry />
    </SoundFxProvider>
  );
};

export default CampusScreen;
