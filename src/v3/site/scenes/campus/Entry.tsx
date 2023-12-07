import { useBuildingServices } from "@v3/site/hooks/useBuildingServices";
import GLCanvas from "./webgl/GLCanvas";
import { useCampusSceneStore } from "./hooks/useCampuseSceneStore";
import { useEffect } from "react";

const Entry = () => {
  const campusSceneStore = useCampusSceneStore();
  const campusSceneActions = campusSceneStore.use.actions();

  const { listBuildings } = useBuildingServices();
  const { data, isLoading } = listBuildings();

  useEffect(() => {
    if (data) {
      campusSceneActions.initBuildingsData({
        buildingsData: data,
      });
    }
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="relative h-screen w-screen bg-[#e9e9e9]">
      <GLCanvas />
    </div>
  );
};

export default Entry;
