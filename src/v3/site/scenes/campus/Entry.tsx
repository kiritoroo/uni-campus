import { useBuildingServices } from "@v3/site/hooks/useBuildingServices";
import GLCanvas from "./webgl/GLCanvas";
import { useCampusSceneStore } from "./hooks/useCampuseSceneStore";
import { memo, useEffect } from "react";
import ThemeAudio from "./components/ThemeAudio";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import LoadingScreen from "./components/LoadingScreen";
import { useSpacesStore } from "@v3/site/layouts/widgets/spaces/hooks/useSpacesStore";

const Entry = memo(() => {
  const globalStore = useGlobalStore();
  const spaceStore = useSpacesStore();
  const campusSceneStore = useCampusSceneStore();

  const startExploring = globalStore.use.startExploring();
  const spacePicked = spaceStore.use.spacePicked();
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

  useEffect(() => {
    if (spacePicked) {
      campusSceneStore.setState({ blockMode: false });
      campusSceneStore.setState({ spaceMode: true });
    }

    if (!spacePicked) {
      campusSceneStore.setState({ blockMode: true });
      campusSceneStore.setState({ spaceMode: false });
    }
  }, [spacePicked]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="relative h-screen w-screen bg-[#e9e9e9]">
      {!startExploring && <LoadingScreen />}
      <GLCanvas />
      <ThemeAudio />
    </div>
  );
});

export default Entry;
