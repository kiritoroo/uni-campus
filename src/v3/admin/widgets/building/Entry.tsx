import { useEffect } from "react";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useParams } from "react-router-dom";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import DetailForm from "./components/DetailForm";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import ValidateBuilding from "./components/ValidateBuilding";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import Copied from "@v3/admin/shared/Copied";
import DetailField from "./components/DetailField";

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

  return (
    <WidgetSection>
      <FlexRow className="mb-5 items-end justify-start">
        <WidgetTitle>Building Details</WidgetTitle>
        {buildingId && (
          <FlexRow className="ml-8">
            <div className="text-gem-onyx/80 mr-2 text-base font-medium">{buildingId}</div>
            <Copied value={buildingId} />
          </FlexRow>
        )}
      </FlexRow>
      {data && (
        <div>
          {/* <div className="col-span-7">
            <ValidateBuilding />
          </div> */}
          <DetailField />
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
