import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useSpacesStore } from "./hooks/useSpacesStore";
import { useEffect } from "react";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import CreateButton from "./components/CreateButton";
import { useCommonStore } from "./hooks/useCommonStore";
import { IconUploadStoreProvider } from "./contexts/IconUploadStoreContext";
import CreateModal from "./components/CreateModal";
import SpacesList from "./components/SpacesList";
import { Outlet, useParams } from "react-router-dom";

const Entry = () => {
  const { id } = useParams();

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

  useEffect(() => {
    id && commonStore.setState({ pickedSpaceId: id });
  }, [id]);

  return (
    <section className="h-full w-full overflow-hidden">
      <CreateButton />
      <div className="h-full w-full p-5">
        {isLoading && <SpinnerLoading width={50} height={50} />}
        {data && (
          <div className="grid h-full w-full grid-cols-12 gap-x-10">
            <div className="col-span-7 h-full w-full overflow-auto">
              <SpacesList />
            </div>
            <div className="col-span-5">
              <Outlet key={id ?? ""} />
            </div>
          </div>
        )}
      </div>
      {showCreateModal && (
        <IconUploadStoreProvider>
          <CreateModal />
        </IconUploadStoreProvider>
      )}
    </section>
  );
};

export default Entry;
