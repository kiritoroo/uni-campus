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
import Button from "@v3/admin/shared/Button";
import { Pencil } from "lucide-react";

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
            <div className="mr-2 text-base font-medium text-gem-onyx/80">{buildingId}</div>
            <Copied value={buildingId} />
          </FlexRow>
        )}
      </FlexRow>
      <FlexRow>
        <Button>
          <FlexRow>
            <Pencil className="h-4 w-4" />
            <div className="ml-2">Edit</div>
          </FlexRow>
        </Button>
      </FlexRow>
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
