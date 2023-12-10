import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import GLOrbitControls from "./GLOrbitControls";
import GLEnvironment from "./GLEnvironment";
import { GLLights } from "./GLLights";
import { GLFog } from "./GLFog";
import { GLSkydom } from "./GLSkydom";
import GLCampus from "../objects/campus/GLCampus";
import { GLCamera } from "./GLCamera";
import { memo } from "react";
import { Perf } from "r3f-perf";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";

const GLCanvas = memo(() => {
  const campuSceneStore = useCampusSceneStore();
  const campusMode = campuSceneStore.use.campusMode();

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

      {campusMode === "dev" && <Perf position="bottom-right" />}

      <GLSkydom />
      <GLFog />
      <GLLights />
      <GLEnvironment />

      <GLCamera />
      <GLOrbitControls />
    </Canvas>
  );
});

export default GLCanvas;
