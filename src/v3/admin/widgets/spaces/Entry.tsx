import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useSpacesStore } from "./hooks/useSpacesStore";
import { useEffect } from "react";
import { useCommonStore } from "./hooks/useCommonStore";
import { IconUploadStoreProvider } from "./contexts/IconUploadStoreContext";
import CreateModal from "./components/CreateModal";
import SpacesList from "./components/SpacesList";
import { Outlet, useParams } from "react-router-dom";
import EmptyOutlet from "./components/EmptyOutlet";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import Search from "@v3/admin/shared/Search";
import Button from "@v3/admin/shared/Button";

const Entry = () => {
  const { id } = useParams();

  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();

  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
  const searchValue = commonStore.use.searchValue();
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <WidgetSection>
      <FlexRow className="mb-5 justify-between pr-20">
        <WidgetTitle>All Spaces</WidgetTitle>
      </FlexRow>
      <div className="h-full w-full px-8 pt-5">
        {data && (
          <div className="grid h-full w-full grid-cols-12 gap-x-10">
            <div className="col-span-5 h-full w-full">
              <FlexRow className="mb-10 gap-10">
                <Search
                  searchValue={searchValue}
                  onChangeSearchValue={(v) => {
                    commonStore.setState({ searchValue: v });
                  }}
                />
                <Button
                  onClick={() => {
                    commonStore.setState({ showCreateModal: true });
                  }}
                  className="whitespace-nowrap"
                >
                  New Space
                </Button>
              </FlexRow>
              <div className="h-full w-full overflow-auto">
                <SpacesList />
              </div>
            </div>
            <div className="col-span-7">
              <Outlet key={id ?? ""} />
              {!id && <EmptyOutlet />}
            </div>
          </div>
        )}
      </div>
      {showCreateModal && (
        <IconUploadStoreProvider>
          <CreateModal />
        </IconUploadStoreProvider>
      )}
    </WidgetSection>
  );
};

export default Entry;
