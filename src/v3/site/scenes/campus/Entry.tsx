import { useBuildingServices } from "@v3/site/hooks/useBuildingServices";
import GLCanvas from "./webgl/GLCanvas";
import { useCampusSceneStore } from "./hooks/useCampuseSceneStore";
import { memo, useEffect } from "react";
import ThemeAudio from "./components/ThemeAudio";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";

const Entry = memo(() => {
  const globalStore = useGlobalStore();

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
    <div
      className="relative h-screen w-screen bg-[#e9e9e9]"
      onClick={() => {
        setTimeout(() => {
          globalStore.setState({ isInteractive: true });
        }, 5000);
      }}
    >
      <GLCanvas />
      <ThemeAudio />
    </div>
  );
});

export default Entry;
