import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useParams } from "react-router-dom";
import { useSpaceStore } from "./hooks/useSpaceStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useEffect } from "react";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import SpacePreview from "./components/SpacePreview";
import { IconUploadStoreProvider } from "./contexts/IconUploadStoreContext";
import DetailForm from "./components/DetailForm";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const spaceStore = useSpaceStore();

  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
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

  return (
    <section className="h-full w-full overflow-hidden">
      {isLoading && <SpinnerLoading width={50} height={50} />}
      {data && (
        <IconUploadStoreProvider>
          <div className="h-fit w-full border border-gray-200 px-2 py-5">
            <SpacePreview />
            <DetailForm />
          </div>
        </IconUploadStoreProvider>
      )}
    </section>
  );
};

export default Entry;
