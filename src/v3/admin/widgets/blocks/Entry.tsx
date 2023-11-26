import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import { useCommonStore } from "./hooks/useCommonStore";
import { useBlocksStore } from "./hooks/useBlocksStore";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import LoadingScreen from "@v3/admin/shared/LoadingScreen";
import { useEffect } from "react";

const Entry = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const blocksStore = useBlocksStore();

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <WidgetSection>
      <FlexRow className="mb-5 justify-between pr-20">
        <WidgetTitle>All Blocks</WidgetTitle>
      </FlexRow>
    </WidgetSection>
  );
};

export default Entry;
