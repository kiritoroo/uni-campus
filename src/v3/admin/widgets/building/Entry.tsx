import { useEffect } from "react";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useParams } from "react-router-dom";
import useBuildingServices from "@v3/admin/hooks/useBuildingServices";

import DetailForm from "./components/DetailForm";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";

const Entry = () => {
  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const actions = buildingStore.use.actions();

  const { id } = useParams();
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

  return (
    <section className="h-full w-full overflow-hidden">
      <div className="grid h-full w-full grid-cols-12 gap-5">
        <div className="col-span-7"></div>
        <div className="col-span-5">
          {isLoading && <SpinnerLoading width={50} height={50} />}
          {data && (
            <ModelUploadStoreProvider>
              <PreviewUploadStoreProvider>
                <DetailForm />
              </PreviewUploadStoreProvider>
            </ModelUploadStoreProvider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Entry;
