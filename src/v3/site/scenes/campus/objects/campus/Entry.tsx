import GLCampusCamera from "./webgl/GLCampusCamera";
import GLCampusControls from "./webgl/GLCampusControls";
import GLCampusCurve from "./webgl/GLCampusCurve";
import GLFloorLayer from "./webgl/GLFloorLayer";
import GLGrassLayer from "./webgl/GLGrassLayer";
import GLGroundLayer from "./webgl/GLGroundLayer";
import GLPlaneLayer from "./webgl/GLPlaneLayer";

const Entry = () => {
  return (
    <group>
      <GLCampusCamera />
      <GLCampusControls />
      <GLCampusCurve />

      <GLPlaneLayer />
      <GLGrassLayer />
      <GLGroundLayer />
      <GLFloorLayer />
    </group>
  );
};

export default Entry;
