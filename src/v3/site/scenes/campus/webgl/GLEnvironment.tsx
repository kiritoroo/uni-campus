import { Environment } from "@react-three/drei";
import { TEXTURE_ASSETS } from "@v3/site/assets/textures";
import { memo } from "react";

const GLEnvironment = memo(() => {
  return <Environment preset="sunset" blur={0.5} />;
});

export default GLEnvironment;
