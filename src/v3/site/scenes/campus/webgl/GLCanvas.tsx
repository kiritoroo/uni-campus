import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import GLOrbitControls from "./GLOrbitControls";
import GLEnvironment from "./GLEnvironment";
import { GLLights } from "./GLLights";
import { GLFog } from "./GLFog";
import { GLSkydom } from "./GLSkydom";
import GLCampus from "../objects/campus/GLCampus";
import { GLCamera } from "./GLCamera";

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
      <GLCampus />

      <GLSkydom />
      <GLFog />
      <GLLights />
      <GLEnvironment />

      <GLCamera />
      <GLOrbitControls />
    </Canvas>
  );
};

export default GLCanvas;
