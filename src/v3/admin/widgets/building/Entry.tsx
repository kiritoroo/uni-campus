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
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const blockServicesVersion = globalStore.use.blockServicesVersion();
  const buildingId = buildingStore.use.buildingId();
  const glBlocksBounding = buildingStore.use.glBlocksBounding();

  const actions = buildingStore.use.actions();

  const { detailBuilding } = useBuildingServices();
  const { listBlocks } = useBlockServices();

  const { data, isLoading } = detailBuilding(buildingServiceVersion, { id: id ?? "" });
  const { data: blocksData } = listBlocks(blockServicesVersion, { building_id: id! });

  useEffect(() => {
    if (data && id) {
      actions.initBuildingData({
        buildingId: id,
        buildingData: data,
      });
    }
  }, [data]);

  useEffect(() => {
    if (glBlocksBounding) {
      blocksData && actions.mapBlockSlots(blocksData);
    }
  }, [blocksData, glBlocksBounding]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <NotFound message="Building Not Found." />;
  }

  return (
    <WidgetSection>
      <ModelUploadStoreProvider>
        <PreviewUploadStoreProvider>
          <FlexRow className="mb-5 items-end justify-start">
            <WidgetTitle>Building Details</WidgetTitle>
            {buildingId && (
              <FlexRow className="ml-8">
                <div className="mr-2 text-base font-medium text-gem-onyx/80">{buildingId}</div>
                <Copied value={buildingId} />
              </FlexRow>
            )}
          </FlexRow>
          <div className="px-8">
            <DetailControl />
            {data && <DetailForm />}
          </div>
        </PreviewUploadStoreProvider>
      </ModelUploadStoreProvider>
    </WidgetSection>
  );
};

export default Entry;
