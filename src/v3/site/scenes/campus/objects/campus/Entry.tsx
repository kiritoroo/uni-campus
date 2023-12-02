import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import GLBuilding from "../building/GLBuilding";
import GLCampusCamera from "./webgl/GLCampusCamera";
import GLCampusControls from "./webgl/GLCampusControls";
import GLCampusCurve from "./webgl/GLCampusCurve";
import GLFloorLayer from "./webgl/GLFloorLayer";
import GLGrassLayer from "./webgl/GLGrassLayer";
import GLGroundLayer from "./webgl/GLGroundLayer";
import GLPlaneLayer from "./webgl/GLPlaneLayer";

const Entry = () => {
  const campusSceneStore = useCampusSceneStore();

  const buildingsData = campusSceneStore.use.buildingsData();

  return (
    <group>
      <GLCampusCamera />
      <GLCampusControls />
      <GLCampusCurve />

      <GLPlaneLayer />
      <GLGrassLayer />
      <GLGroundLayer />
      <GLFloorLayer />

      {buildingsData?.map((item) => <GLBuilding key={item.id} buildingData={item} />)}
    </group>
  );
};

export default Entry;
