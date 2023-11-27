import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import { useCommonStore } from "./hooks/useCommonStore";
import { useBlocksStore } from "./hooks/useBlocksStore";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import { useEffect } from "react";
import Search from "@v3/admin/shared/Search";
import BlocksList from "./components/BlocksList";
import CreateModal from "./components/CreateModal";
import { useSearchParams } from "react-router-dom";
import { GalleryUploadStoreProvider } from "./contexts/GalleryUploadStoreContext";

const Entry = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const blocksStore = useBlocksStore();

  const [searchParams, _] = useSearchParams();

  const blockServicesVersion = globalStore.use.blockServicesVersion();
  const searchValue = commonStore.use.searchValue();
  const blocksActions = blocksStore.use.actions();
  const showCreateModal = commonStore.use.showCreateModal();

  const { listBlocks } = useBlockServices();
  const { data, isLoading } = listBlocks(blockServicesVersion);

  useEffect(() => {
    if (data) {
      blocksActions.initBlocksData({
        blocksData: data,
      });
    }
  }, [data]);

  useEffect(() => {
    if (
      searchParams.get("create") &&
      searchParams.get("obj-name") &&
      searchParams.get("building-id")
    ) {
      commonStore.setState({ showCreateModal: true });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const search = searchParams.get("search");
      search && commonStore.setState({ searchValue: search });
    }
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <WidgetSection>
      <FlexRow className="mb-5 justify-between pr-20">
        <WidgetTitle>All Blocks</WidgetTitle>
      </FlexRow>
      <div className="px-8 pt-5">
        <FlexRow className="mb-10 gap-10">
          <Search
            searchValue={searchValue}
            onChangeSearchValue={(v) => {
              commonStore.setState({ searchValue: v });
            }}
          />
        </FlexRow>
        {data && <BlocksList />}
      </div>

      {showCreateModal && (
        <GalleryUploadStoreProvider>
          <CreateModal />
        </GalleryUploadStoreProvider>
      )}
    </WidgetSection>
  );
};

export default Entry;
