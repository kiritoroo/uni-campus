import { useEffect } from "react";
import { useBlockService } from "../hooks/useBlockServices";
import { useGlobalStore } from "../hooks/useGlobalStore";
import { useSpaceServices } from "../hooks/useSpaceServices";

const Content = () => {
  const globalStore = useGlobalStore();
  const globalStoreActions = globalStore.use.actions();

  const { listBlocks } = useBlockService();
  const { listSpaces } = useSpaceServices();

  const { data: fetchListBlocksData, isLoading: fetchingListBlocks } = listBlocks();
  const { data: fetchListSpacesData, isLoading: fetchingListSpaces } = listSpaces();

  useEffect(() => {
    if (fetchListBlocksData) {
      globalStoreActions.initBlocksData({ blocksData: fetchListBlocksData });
    }
  }, [fetchListBlocksData]);

  useEffect(() => {
    if (fetchListSpacesData) {
      globalStoreActions.initSpacesData({ spacesData: fetchListSpacesData });
    }
  }, [fetchListBlocksData]);

  return null;
};

export default Content;
