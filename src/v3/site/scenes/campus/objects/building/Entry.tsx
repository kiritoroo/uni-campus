import { TBuildingSchema } from "@v3/site/schemas/building";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Center } from "@react-three/drei";
import GLBoundingBox from "./webgl/GLBoundingBox";
import GlBoundingEffect from "./webgl/GLBoundingEffect";
import GlBoundingAround from "./webgl/GLBoundingAround";
import GLBlock from "../block/GLBlock";
import GLBuildingMesh from "./webgl/GLBuildingMesh";
import { useCampusStore } from "../campus/hooks/useCampusStore";

const Entry = ({ buildingData }: { buildingData: TBuildingSchema }) => {
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();

  const buildingPointerEnterNearest = campusStore.use.buildingPointerEnterNearest();
  const buildingModelScene = buildingStore.use.buildingModelScene();
  const buildingActions = buildingStore.use.actions();
  const isPointerEnterBuildingNearest = buildingStore.use.isPointerEnterBuildingNearest();

  const objGroupMergeProperty = useMemo<{
    group: THREE.Group;
  } | null>(() => {
    if (!buildingModelScene) return null;
    const obj = buildingModelScene.getObjectByName("group-merge");
    if (!obj || !(obj instanceof THREE.Group)) return null;

    return {
      group: obj,
    };
  }, [buildingModelScene]);

  const objBoundingBoxProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!buildingModelScene) return null;
    const obj = buildingModelScene.getObjectByName("bounding-box");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, [buildingModelScene]);

  const objBoundingEffectProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!buildingModelScene) return null;
    const obj = buildingModelScene.getObjectByName("bounding-effect");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, [buildingModelScene]);

  const objBoundingAroundProperty = useMemo<{
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  } | null>(() => {
    if (!buildingModelScene) return null;
    const obj = buildingModelScene.getObjectByName("bounding-around");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    return {
      geometry: obj.geometry,
      position: obj.position,
    };
  }, [buildingModelScene]);

  useEffect(() => {
    buildingActions.initBuildingData({ buildingData: buildingData });
  }, []);

  useEffect(() => {
    if (buildingPointerEnterNearest) {
      if (buildingPointerEnterNearest.buildingId === buildingData.id) {
        buildingStore.setState({ isPointerEnterBuildingNearest: true });
      }

      if (
        buildingPointerEnterNearest.buildingId !== buildingData.id &&
        isPointerEnterBuildingNearest
      ) {
        buildingStore.setState({ isPointerEnterBuildingNearest: false });
      }
    }

    if (!buildingPointerEnterNearest) {
      if (isPointerEnterBuildingNearest) {
        buildingStore.setState({ isPointerEnterBuildingNearest: false });
      }
    }
  }, [buildingPointerEnterNearest]);

  return (
    <Center
      position={[buildingData.position.x, buildingData.position.y, buildingData.position.z]}
      rotation={[buildingData.rotation.x, buildingData.rotation.y, buildingData.rotation.z]}
      scale={[buildingData.scale.x, buildingData.scale.y, buildingData.scale.z]}
    >
      {objGroupMergeProperty && (
        <group
          position={objGroupMergeProperty.group.position}
          rotation={objGroupMergeProperty.group.rotation}
          scale={objGroupMergeProperty.group.scale}
        >
          {objGroupMergeProperty.group.children.map((obj) => {
            const objBuildingMeshProperty: {
              geometry: THREE.BufferGeometry;
              material: THREE.MeshStandardMaterial;
              position: THREE.Vector3;
            } | null = (() => {
              if (!obj || !(obj instanceof THREE.Mesh)) return null;

              return {
                geometry: obj.geometry,
                position: obj.position,
                material: obj.material,
              };
            })();

            return (
              <group key={obj.id}>
                {objBuildingMeshProperty && <GLBuildingMesh property={objBuildingMeshProperty} />}
              </group>
            );
          })}
        </group>
      )}
      {objBoundingBoxProperty && <GLBoundingBox property={objBoundingBoxProperty} />}
      {objBoundingEffectProperty && <GlBoundingEffect property={objBoundingEffectProperty} />}
      {objBoundingAroundProperty && <GlBoundingAround property={objBoundingAroundProperty} />}

      {buildingData.blocks
        .filter((item) => item.is_publish)
        .map((item) => (
          <GLBlock key={item.id} blockData={item} />
        ))}
    </Center>
  );
};

export default Entry;
