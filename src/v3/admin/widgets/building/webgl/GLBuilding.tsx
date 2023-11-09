import { TGLTFReference } from "@Types/three.type";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { memo, useMemo } from "react";

const GLBuilding = memo(() => {
  const buildingStore = useBuildingStore();
  const buildingData = buildingStore.use.buildingData();

  const model: TGLTFReference = useLoader(
    GLTFLoader,
    `${process.env.UNI_CAMPUS_API_URL}/${buildingData?.model_3d.url!}`,
  );
  const scene = useMemo(() => (model ? model.scenes[0] : null), [model]);

  return <group>{scene && <primitive object={scene} />}</group>;
});

export default GLBuilding;
