import BuildingsList from "./components/BuildingList";
import CreateModal from "./components/CreateModal";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useCommonStore } from "./hooks/useCommonStore";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useBuildingsStore } from "./hooks/useBuildingsStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { useEffect } from "react";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import CreateButton from "./components/CreateButton";

const Entry = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const buildingsStore = useBuildingsStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const buildingsActions = buildingsStore.use.actions();
  const showCreateModal = commonStore.use.showCreateModal();

  const { listBuildings } = useBuildingServices();
  const { data, isLoading } = listBuildings(buildingServiceVersion);

  useEffect(() => {
    if (data) {
      buildingsActions.initBuildingsData({
        buildingsData: data,
      });
    }
  }, [data]);

  return (
    <section className="h-full w-full overflow-hidden">
      <CreateButton />
      <div className="h-full w-full p-5">
        {isLoading && <SpinnerLoading width={50} height={50} />}
        {data && <BuildingsList />}
      </div>
      {showCreateModal && (
        <ModelUploadStoreProvider>
          <PreviewUploadStoreProvider>
            <CreateModal />
          </PreviewUploadStoreProvider>
        </ModelUploadStoreProvider>
      )}
    </section>
  );
};

export default Entry;
