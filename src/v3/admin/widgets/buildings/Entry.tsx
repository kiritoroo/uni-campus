import { cn } from "@Utils/common.utils";
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

const Entry = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const buildingsStore = useBuildingsStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const actions = buildingsStore.use.actions();
  const showCreateModal = commonStore.use.showCreateModal();

  const { listBuildings } = useBuildingServices();
  const { data, isLoading } = listBuildings(buildingServiceVersion);

  useEffect(() => {
    if (data) {
      actions.initBuildingsData({
        buildingsData: data,
      });
    }
  }, [data]);

  return (
    <section className="h-full w-full overflow-hidden">
      <button
        type="button"
        className={cn("w-fit bg-[#e2e2e2] p-3", {
          "opacity-0": showCreateModal,
        })}
        onClick={() => {
          commonStore.setState({ showCreateModal: true });
        }}
      >
        <p className="text-sm font-medium text-[#2C2B31]">New Building</p>
      </button>
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
