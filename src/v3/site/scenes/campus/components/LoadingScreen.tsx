import { useMemo } from "react";
import { useCampusSceneStore } from "../hooks/useCampuseSceneStore";
import { cn } from "@Utils/common.utils";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";

const LoadingScreen = () => {
  const globalStore = useGlobalStore();
  const campusSceneStore = useCampusSceneStore();

  const loadingBuildingProgress = campusSceneStore.use.loadingBuildingsProgress();

  const totalLoadingBuildingProgess = useMemo(() => {
    return loadingBuildingProgress?.length ?? 0;
  }, [loadingBuildingProgress]);

  const totalLoadedBuildingProgress = useMemo(() => {
    return loadingBuildingProgress?.filter((item) => item.loaded === true).length ?? 0;
  }, [loadingBuildingProgress]);

  const loadingSucess = useMemo(() => {
    if (totalLoadingBuildingProgess === 0 || totalLoadedBuildingProgress === 0) return false;
    return totalLoadedBuildingProgress === totalLoadingBuildingProgess;
  }, [totalLoadedBuildingProgress, totalLoadedBuildingProgress]);

  const handleOnClickStart = () => {
    globalStore.setState({ startExploring: true, isInteractive: true });
  };

  return (
    <div className="relative z-[9] h-screen w-screen select-none bg-[#e7e7e7]">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="pb-12">
          <div className="pb-2 text-center font-geist text-5xl font-bold">HCMUTE</div>
        </div>

        <div className="py-1 font-geist text-lg font-bold uppercase">UTE Campus Map</div>

        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="relative h-1 w-[300px] bg-gray-300 sm:w-[500px]">
            <div
              className="absolute inset-0 w-0 bg-gem-sapphire transition-all duration-500"
              style={{
                width: `${(totalLoadedBuildingProgress / totalLoadingBuildingProgess) * 100}%`,
              }}
            />
          </div>

          <div
            className={cn(
              "select-none py-1 text-base font-normal opacity-100 transition-all delay-200 duration-500",
              {
                "opacity-0": loadingSucess,
              },
            )}
          >
            Loading your experience
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none my-5 opacity-0 transition-all delay-500 duration-500",
            {
              "pointer-events-auto opacity-100 ": loadingSucess,
            },
          )}
        >
          <button
            className={cn(
              "group bg-gem-sapphire px-8 py-4 shadow-sm transition-colors duration-100 hover:bg-gem-sapphire/80",
            )}
            onClick={handleOnClickStart}
          >
            <div className="text-lg font-medium text-white transition-colors duration-100">
              Start Exploring
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
