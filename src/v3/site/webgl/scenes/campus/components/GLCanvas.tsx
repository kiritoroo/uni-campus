import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import GLOrbitControls from "./GLOrbitControls";
import GLEnvironment from "./GLEnvironment";

const GLCanvas = () => {
  return (
    <Canvas
      shadows="soft"
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
        shadowMapType: THREE.PCFSoftShadowMap,
        pixelRatio: 1,
      }}
    >
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <GLEnvironment />
      <GLOrbitControls />
    </Canvas>
  );
};

export default GLCanvas;
