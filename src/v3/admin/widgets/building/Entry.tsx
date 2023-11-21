import { useEffect } from "react";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useParams } from "react-router-dom";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import DetailForm from "./components/DetailForm";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import Copied from "@v3/admin/shared/Copied";
import DetailControl from "./components/DetailControl";
import NotFound from "@v3/admin/shared/NotFound";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const buildingId = buildingStore.use.buildingId();
  const actions = buildingStore.use.actions();

  const { detailBuilding } = useBuildingServices();

  const { data, isLoading } = detailBuilding(buildingServiceVersion, { id: id ?? "" });

  useEffect(() => {
    if (data && id) {
      actions.initBuildingData({
        buildingId: id,
        buildingData: data,
      });
    }
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <NotFound message="Building Not Found." />;
  }

  return (
    <WidgetSection>
      <FlexRow className="mb-5 items-end justify-start">
        <WidgetTitle>Building Details</WidgetTitle>
        {buildingId && (
          <FlexRow className="ml-8">
            <div className="mr-2 text-base font-medium text-gem-onyx/80">{buildingId}</div>
            <Copied value={buildingId} />
          </FlexRow>
        )}
      </FlexRow>
      <DetailControl />
      {data && (
        <div>
          <ModelUploadStoreProvider>
            <PreviewUploadStoreProvider>
              <DetailForm />
            </PreviewUploadStoreProvider>
          </ModelUploadStoreProvider>
        </div>
      )}
    </WidgetSection>
  );
};

export default Entry;
