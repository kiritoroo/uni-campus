import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useParams } from "react-router-dom";
import { useBlockStore } from "./hooks/useBlockStore";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { useEffect } from "react";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import NotFound from "@v3/admin/shared/NotFound";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import { GalleryUploadStoreProvider } from "./contexts/GalleryUploadStoreContext";
import Copied from "@v3/admin/shared/Copied";
import DetailControl from "./components/DetailControl";
import DetailForm from "./components/DetailForm";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const blockStore = useBlockStore();

  const blockServiceVersion = globalStore.use.blockServicesVersion();
  const blockId = blockStore.use.blockId();

  const actions = blockStore.use.actions();

  const { detalBlock } = useBlockServices();

  const { data, isLoading } = detalBlock(blockServiceVersion, { id: id ?? "" });

  useEffect(() => {
    if (data && id) {
      actions.initBlockData({
        blockId: id,
        blockData: data,
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
      <GalleryUploadStoreProvider>
        <FlexRow className="mb-5 items-end justify-start">
          <WidgetTitle>Block Details</WidgetTitle>
          {blockId && (
            <FlexRow className="ml-8">
              <div className="mr-2 text-base font-medium text-gem-onyx/80">{blockId}</div>
              <Copied value={blockId} />
            </FlexRow>
          )}
        </FlexRow>
        <div className="px-8">
          <DetailControl />
          <DetailForm />
        </div>
      </GalleryUploadStoreProvider>
    </WidgetSection>
  );
};

export default Entry;
