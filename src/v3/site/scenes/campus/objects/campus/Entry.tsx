import { memo } from "react";
import { useCampusSceneStore } from "../../hooks/useCampuseSceneStore";
import GLBuilding from "../building/GLBuilding";
import GLCampusCamera from "./webgl/GLCampusCamera";
import GLCampusCurve from "./webgl/GLCampusCurve";
import GLFloorLayer from "./webgl/GLFloorLayer";
import GLGrassLayer from "./webgl/GLGrassLayer";
import GLGroundLayer from "./webgl/GLGroundLayer";
import GLPlantLayer from "./webgl/GLPlantLayer";

const Entry = memo(() => {
  const campusSceneStore = useCampusSceneStore();

  const buildingsData = campusSceneStore.use.buildingsData();

  return (
    <group>
      <GLCampusCamera />
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
});

export default Entry;
