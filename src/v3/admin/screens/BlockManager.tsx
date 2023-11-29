import Entry from "../widgets/block/Entry";
import { BlockStoreProvider } from "../widgets/block/contexts/BlockStoreContext";
import { CommonStoreProvider } from "../widgets/block/contexts/CommonStoreContext";

const BlockManager = () => {
  return (
    <CommonStoreProvider>
      <BlockStoreProvider>
        <Entry />
      </BlockStoreProvider>
    </CommonStoreProvider>
  );
};

export default BlockManager;
