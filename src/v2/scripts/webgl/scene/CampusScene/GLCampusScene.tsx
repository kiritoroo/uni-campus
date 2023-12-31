import { GLCampus } from "@Scripts/core/Campus/components/GLCampus";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Lights } from "@Scripts/webgl/common/Lights";
import { Fog } from "@Scripts/webgl/common/Fog";
import { Skydom } from "@Scripts/webgl/common/Skydom";
import { Camera } from "@Scripts/webgl/common/Camera";
import { Perf } from "r3f-perf";
import { CampusStoreProxyProvider } from "@Scripts/core/Campus/contexts/CampusStoreProxyContext";
import { CampusStoreProvider } from "@Scripts/core/Campus/contexts/CampusStoreContext";
import { memo } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { useCampusSceneStoreProxyInContext } from "./hooks/useCampusSceneStoreProxyInContext";
import { useControls } from "leva";
import { assets } from "@Assets/assets";

export const GLCampusScene = memo(() => {
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();

  const swipeHandlers = useSwipeable({
    onSwiping: (e: SwipeEventData) => {
      campusSceneStoreProxy.swipeData = {
        velocity: e.dir === "Right" ? e.velocity : -e.velocity,
        dir: e.dir as "Left" | "Right",
      };
    },
    onTouchStartOrOnMouseDown: () => {},
    onSwiped: () => {},
    ...{
      delta: 5,
      preventScrollOnSwipe: true,
      trackMouse: true,
      trackTouch: true,
      swipeDuration: Infinity,
    },
  });

  const config = useControls({
    "perf-monitor": false,
  });

  return (
    <Canvas
      {...swipeHandlers}
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
      {config["perf-monitor"] && <Perf position="top-left" />}
      <Lights />
      {/* <Skydom /> */}
      {/* <Fog /> */}
      <Camera />
      <OrbitControls
        makeDefault
        enableDamping
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
      <Environment files={assets.images.ROOITOU_PARK_HDR_PATH} blur={0.5} />

      {/* <CampusStoreProvider>
        <CampusStoreProxyProvider> */}
      <GLCampus />
      {/* </CampusStoreProxyProvider>
      </CampusStoreProvider> */}
    </Canvas>
  );
});
