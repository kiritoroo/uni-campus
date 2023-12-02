import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import GLOrbitControls from "./components/GLOrbitControls";
import GLEnvironment from "./components/GLEnvironment";

const GLEntry = () => {
  return (
    <div className="relative h-screen w-screen">
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
    </div>
  );
};

export default GLEntry;
