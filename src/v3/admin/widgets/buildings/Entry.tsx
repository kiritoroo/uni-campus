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
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import Button from "@v3/admin/shared/Button";

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <WidgetSection>
      <FlexRow className="mb-5 justify-between pr-20">
        <WidgetTitle>All Buildings</WidgetTitle>
        <Button
          onClick={() => {
            commonStore.setState({ showCreateModal: true });
          }}
        >
          New Building
        </Button>
      </FlexRow>
      {data && <BuildingsList />}
      {showCreateModal && (
        <ModelUploadStoreProvider>
          <PreviewUploadStoreProvider>
            <CreateModal />
          </PreviewUploadStoreProvider>
        </ModelUploadStoreProvider>
      )}
    </WidgetSection>
  );
};

export default Entry;
