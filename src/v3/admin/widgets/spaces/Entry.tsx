import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useSpacesStore } from "./hooks/useSpacesStore";
import { useEffect } from "react";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import CreateButton from "./components/CreateButton";
import { useCommonStore } from "./hooks/useCommonStore";
import { IconUploadStoreProvider } from "./contexts/IconUploadStoreContext";
import CreateModal from "./components/CreateModal";

const Entry = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();

  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
  const spacesActions = spacesStore.use.actions();
  const showCreateModal = commonStore.use.showCreateModal();

  const { listSpaces } = useSpaceServices();
  const { data, isLoading } = listSpaces(spaceServiceVersion);

  useEffect(() => {
    if (data) {
      spacesActions.initSpacesData({
        spacesData: data,
      });
    }
  }, [data]);

  return (
    <section className="h-full w-full overflow-hidden">
      <CreateButton />
      <div className="h-full w-full p-5">
        {isLoading && <SpinnerLoading width={50} height={50} />}
        {data && (
          <div>
            {data.map((space) => (
              <div key={space.id}>{space.name}</div>
            ))}
          </div>
        )}
        {showCreateModal && (
          <IconUploadStoreProvider>
            <CreateModal />
          </IconUploadStoreProvider>
        )}
      </div>
    </section>
  );
};

export default Entry;
