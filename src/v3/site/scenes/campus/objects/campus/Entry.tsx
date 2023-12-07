import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import GLBuilding from "../building/GLBuilding";
import GLCampusCamera from "./webgl/GLCampusCamera";
import GLCampusControls from "./webgl/GLCampusControls";
import GLCampusCurve from "./webgl/GLCampusCurve";
import GLFloorLayer from "./webgl/GLFloorLayer";
import GLGrassLayer from "./webgl/GLGrassLayer";
import GLGroundLayer from "./webgl/GLGroundLayer";
import GLPlantLayer from "./webgl/GLPlantLayer";

const Entry = () => {
  const campusSceneStore = useCampusSceneStore();

  const buildingsData = campusSceneStore.use.buildingsData();

  return (
    <group>
      <GLCampusCamera />
      <GLCampusControls />
      <GLCampusCurve />

      <GLPlantLayer />
      <GLGrassLayer />
      <GLGroundLayer />
      <GLFloorLayer />

      {buildingsData
        ?.filter((item) => item.is_publish)
        .map((item) => <GLBuilding key={item.id} buildingData={item} />)}
    </group>
  );
};

export default Entry;
