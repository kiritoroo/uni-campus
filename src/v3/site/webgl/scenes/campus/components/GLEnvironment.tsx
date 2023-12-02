import { Environment } from "@react-three/drei";
import { TEXTURE_ASSETS } from "@v3/site/assets/textures";

const GLEnvironment = () => {
  return <Environment files={TEXTURE_ASSETS.rooitouPark} blur={0.5} />;
};

export default GLEnvironment;
