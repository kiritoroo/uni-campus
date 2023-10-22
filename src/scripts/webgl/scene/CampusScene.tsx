import { GLCampus } from "@Scripts/core/Campus/components/GLCampus";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Lights } from "@Scripts/webgl/common/Lights";
import { Fog } from "@Scripts/webgl/common/Fog";
import { Skydom } from "@Scripts/webgl/common/Skydom";
import { Camera } from "@Scripts/webgl/common/Camera";
import { Perf } from "r3f-perf";
import { CampusStoreProxyProvider } from "@Scripts/core/Campus/contexts/CampusStoreProxyContext";
import { CampusStoreProvider } from "@Scripts/core/Campus/contexts/CampusStoreContext";
import { memo } from "react";

export const CampusScene = memo(() => {
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
      }}
    >
      <Perf position="top-left" />
      <Lights />
      <Skydom />
      <Fog />
      <Camera />
      <OrbitControls makeDefault enableDamping />
      <Environment files="/assets/rooitou_park.hdr" blur={0.5} />

      <CampusStoreProvider>
        <CampusStoreProxyProvider>
          <GLCampus />
        </CampusStoreProxyProvider>
      </CampusStoreProvider>
    </Canvas>
  );
});
