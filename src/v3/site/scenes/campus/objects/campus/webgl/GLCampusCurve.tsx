import { TGLTFReference } from "@Types/three.type";
import { Line } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { MODELS_ASSETS } from "@v3/site/assets/models";
import { RefObject, useRef } from "react";
import * as THREE from "three";
import { Line2 } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";

const GLCampusCurve = () => {
  const SCALE_FOLLOW_OFFSET = useRef<number>(1.5);
  const SCALE_LOOK_AT_OFFSET = useRef<number>(0.5);

  const campusSceneStore = useCampusSceneStore();

  const campusMode = campusSceneStore.use.campusMode();

  const gltf: TGLTFReference = useLoader(GLTFLoader, MODELS_ASSETS.campusCurve);
  const model = gltf.scenes[0];

  const objBoundingCurveProperty: {
    ref: RefObject<Line2 | any>;
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
    points: THREE.Vector3[];
    curve: THREE.CatmullRomCurve3;
    tubeGeometry: THREE.TubeGeometry;
  } | null = (() => {
    const obj = model.getObjectByName("campus-curve");
    if (!obj || !(obj instanceof THREE.Mesh)) return null;

    const positionAttribute = (obj.geometry as THREE.BufferGeometry).getAttribute("position");
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      const point = new THREE.Vector3();
      point.fromBufferAttribute(positionAttribute, i);
      point.setX(point.x + obj.position.x);
      point.setY(point.y + obj.position.y);
      point.setZ(point.z + obj.position.z);
      point.setY(100);
      points.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal" as THREE.CurveType);
    const tubeGeometry = new THREE.TubeGeometry(curve, 200, 1, 15, true);

    return {
      ref: useRef(null),
      geometry: obj.geometry,
      position: obj.position,
      points,
      curve,
      tubeGeometry,
    };
  })();

  return (
    <group>
      {objBoundingCurveProperty && (
        <Line
          ref={objBoundingCurveProperty.ref}
          points={objBoundingCurveProperty.curve.getPoints(200)}
          color="#F50359"
          visible={campusMode === "dev" ? true : false}
          linewidth={2}
        />
      )}

      {objBoundingCurveProperty && (
        <mesh
          scale={SCALE_FOLLOW_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
          visible={campusMode === "dev" ? true : false}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}

      {objBoundingCurveProperty && (
        <mesh
          scale={SCALE_LOOK_AT_OFFSET.current}
          geometry={objBoundingCurveProperty.tubeGeometry}
          visible={campusMode === "dev" ? true : false}
        >
          <meshBasicMaterial color="#54d184" />
        </mesh>
      )}
    </group>
  );
};

export default GLCampusCurve;
