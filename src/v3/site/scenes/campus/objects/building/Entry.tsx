import { TBuildingSchema } from "@v3/site/schemas/building";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Center } from "@react-three/drei";
import GLBoundingBox from "./webgl/GLBoundingBox";
import GlBoundingEffect from "./webgl/GLBoundingEffect";
import GlBoundingAround from "./webgl/GLBoundingAround";
import GLBlock from "../block/GLBlock";
import GLBuildingMesh from "./webgl/GLBuildingMesh";
import { useCampusStore } from "../campus/hooks/useCampusStore";
import GLFocusCurve from "./webgl/GLFocusCurve";
import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import { useFrame } from "@react-three/fiber";
import GLBlockDetail from "./webgl/GLBlockDetail";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { AnimatePresence } from "framer-motion";

const Entry = memo(({ buildingData }: { buildingData: TBuildingSchema }) => {
  const globalStore = useGlobalStore();
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();

  const campusSceneActions = campusSceneStore.use.actions();
  const campusCamera = campusSceneStore.use.campusCamera();
  const buildingShowInfo = campusStore.use.buildingShowInfo();
  const buildingPicked = campusStore.use.buildingPicked();
  const buildingPointerEnterNearest = campusStore.use.buildingPointerEnterNearest();
  const buildingModelScene = buildingStore.use.buildingModelScene();
  const buildingActions = buildingStore.use.actions();
  const isBuildingPicked = buildingStore.use.isBuildingPicked();
  const isPointerEnterBuildingNearest = buildingStore.use.isPointerEnterBuildingNearest();
  const blockPicked = buildingStore.use.blockPicked();

  const buildingRef = useRef<THREE.Group | any>(null);

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

  useEffect(() => {
    if (buildingRef.current) {
      buildingStore.setState({ buildingObject: buildingRef.current });
    }
  }, [buildingRef]);

  useEffect(() => {
    campusSceneActions.addLoadingBuildingProgress({ id: buildingData.id, loaded: false });
  }, []);

  useEffect(() => {
    if (!buildingRef.current) return;

    setTimeout(() => {
      campusSceneActions.updateLoadingBuildingProgress({ id: buildingData.id, loaded: true });
    }, 200);
  }, [buildingRef.current]);

  useFrame(() => {
    if (!campusCamera) return;
    if (!buildingData) return;

    const cameraPosition = campusCamera.getWorldPosition(new THREE.Vector3());
    const distanceToBuilding = cameraPosition.distanceTo(
      new THREE.Vector3(
        buildingData?.position.x,
        buildingData?.position.y,
        buildingData?.position.z,
      ),
    );
    buildingStore.setState({ distanceFromCameraToBuilding: distanceToBuilding });
  });

  useEffect(() => {
    if (buildingShowInfo?.buildingId === buildingData.id) return;

    buildingStore.setState({ isBuildingShowInfo: false });
    buildingStore.setState({ blockShowInfo: null });
  }, [buildingShowInfo]);

  useEffect(() => {
    if (blockPicked) {
      globalStore.setState({ showSidebar: false });
      globalStore.setState({ showHeader: false });
    } else {
      globalStore.setState({ showHeader: true });
    }
  }, [blockPicked]);

  return (
    <>
      <Center
        ref={buildingRef}
        position={[buildingData.position.x, buildingData.position.y, buildingData.position.z]}
        rotation={[buildingData.rotation.x, buildingData.rotation.y, buildingData.rotation.z]}
        scale={[buildingData.scale.x, buildingData.scale.y, buildingData.scale.z]}
        visible={buildingPicked && !isBuildingPicked ? false : true}
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

        <GLFocusCurve />

        {buildingData.blocks
          .filter((item) => item.is_publish)
          .map((item) => (
            <GLBlock key={item.id} blockData={item} />
          ))}
      </Center>

      {isBuildingPicked && blockPicked && <GLBlockDetail />}
    </>
  );
});

export default Entry;
