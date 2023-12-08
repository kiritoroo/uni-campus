import { useEffect } from "react";
import { useBlockService } from "../hooks/useBlockServices";
import { useGlobalStore } from "../hooks/useGlobalStore";

const Content = () => {
  const globalStore = useGlobalStore();
  const globalStoreActions = globalStore.use.actions();

  const { listBlocks } = useBlockService();
  const { data, isLoading } = listBlocks();

  useEffect(() => {
    if (data) {
      globalStoreActions.initBlocksData({ blocksData: data });
    }
  }, [data]);

  return null;
};

export default Content;
