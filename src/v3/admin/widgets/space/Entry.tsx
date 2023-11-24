import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useParams } from "react-router-dom";
import { useSpaceStore } from "./hooks/useSpaceStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useEffect } from "react";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import SpacePreview from "./components/SpacePreview";
import { IconUploadStoreProvider } from "./contexts/IconUploadStoreContext";
import DetailForm from "./components/DetailForm";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import Copied from "@v3/admin/shared/Copied";
import DetailControl from "./components/DetailControl";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const spaceStore = useSpaceStore();

  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
  const spaceId = spaceStore.use.spaceId();
  const actions = spaceStore.use.actions();

  const { detailSpace } = useSpaceServices();

  const { data, isLoading } = detailSpace(spaceServiceVersion, { id: id ?? "" });

  useEffect(() => {
    if (data && id) {
      actions.initSpaceData({
        spaceId: id,
        spaceData: data,
      });
    }
  }, [data]);

  if (isLoading) {
    return <SpinnerLoading width={50} height={50} />;
  }

  return (
    <WidgetSection className="rounded-md border border-gray-300">
      {data && (
        <IconUploadStoreProvider>
          <FlexRow className="mb-5 items-end justify-start">
            <WidgetTitle>Building Details</WidgetTitle>
            {spaceId && (
              <FlexRow className="ml-8">
                <div className="mr-2 text-base font-medium text-gem-onyx/80">{spaceId}</div>
                <Copied value={spaceId} />
              </FlexRow>
            )}
          </FlexRow>
          <div className="px-8">
            <DetailControl />
            {data && <DetailForm />}
          </div>
        </IconUploadStoreProvider>
      )}
    </WidgetSection>
  );
};

export default Entry;
