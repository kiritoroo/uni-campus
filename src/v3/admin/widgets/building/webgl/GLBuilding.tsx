import { TGLTFReference } from "@Types/three.type";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { memo, useEffect, useMemo } from "react";
import * as THREE from "three";
import { GLBoundingAround } from "./GLBoundingArround";
import { GLBoundingBox } from "./GLBoundingBox";
import { GLBoundingEffect } from "./GLBoundingEffect";
import { GLBlockBounding } from "./GLBlockBounding";

const GLBuilding = memo(() => {
  const buildingStore = useBuildingStore();
  const buildingData = buildingStore.use.buildingData();
  const glGroupMerge = buildingStore.use.glGroupMerge();
  const glSelfBoundings = buildingStore.use.glSelfBoundings();
  const glBlocksBounding = buildingStore.use.glBlocksBounding();

  const glShowGroupMerge = buildingStore.use.glShowGroupMerge();
  const glShowSelfBoundingBox = buildingStore.use.glShowSelfBoundingBox();
  const glShowSelfBoundingArround = buildingStore.use.glShowSelfBoundingArround();
  const glShowSelfBoundingEffect = buildingStore.use.glShowSelfBoundingEffect();
  const glShowBlocksBounding = buildingStore.use.glShowBlocksBounding();

  const model: TGLTFReference = useLoader(
    GLTFLoader,
    `${process.env.UNI_CAMPUS_API_URL}/${buildingData?.model_3d.url!}`,
  );
  const scene = useMemo(() => (model ? model.scenes[0] : null), [model]);

  const objBoundingBoxProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!glSelfBoundings.box) return null;
    return {
      geometry: glSelfBoundings.box.geometry,
      position: glSelfBoundings.box.position,
    };
  }, [glSelfBoundings.arround]);

  const objBoundingArroundProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!glSelfBoundings.arround) return null;
    return {
      geometry: glSelfBoundings.arround.geometry,
      position: glSelfBoundings.arround.position,
    };
  }, [glSelfBoundings.arround]);

  const objBoundingEffectProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!glSelfBoundings.effect) return null;
    return {
      geometry: glSelfBoundings.effect.geometry,
      position: glSelfBoundings.effect.position,
    };
  }, [glSelfBoundings.effect]);

  useEffect(() => {
    if (scene) {
      buildingStore.setState({
        glBuildingObjects: scene.clone().children,
      });
    }
  }, [scene]);

  return (
    <group>
      {glGroupMerge && (
        <group visible={glShowGroupMerge}>
          <primitive object={glGroupMerge} />
        </group>
      )}
      {objBoundingBoxProperty && (
        <GLBoundingBox
          geometry={objBoundingBoxProperty.geometry}
          position={objBoundingBoxProperty.position}
          visible={glShowSelfBoundingBox}
        />
      )}
      {objBoundingArroundProperty && (
        <GLBoundingAround
          geometry={objBoundingArroundProperty.geometry}
          position={objBoundingArroundProperty.position}
          visible={glShowSelfBoundingArround}
        />
      )}
      {objBoundingEffectProperty && (
        <GLBoundingEffect
          geometry={objBoundingEffectProperty.geometry}
          position={objBoundingEffectProperty.position}
          visible={glShowSelfBoundingEffect}
        />
      )}
      {glBlocksBounding &&
        glBlocksBounding.map((item, idx) => {
          const objBlockBoundingProperty: {
            geometry: THREE.BufferGeometry;
            position: THREE.Vector3;
          } = (() => {
            return {
              geometry: item.geometry,
              position: item.position,
            };
          })();

          return (
            <GLBlockBounding
              key={idx}
              geometry={objBlockBoundingProperty.geometry}
              position={objBlockBoundingProperty.position}
              visible={glShowBlocksBounding}
            />
          );
        })}
    </group>
  );
});

export default GLBuilding;
