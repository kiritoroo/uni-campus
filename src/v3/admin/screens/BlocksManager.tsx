import Entry from "../widgets/blocks/Entry";
import { BlocksStoreProvider } from "../widgets/blocks/contexts/BlocksStoreContext";
import { CommonStoreProvider } from "../widgets/blocks/contexts/CommonStoreContext";

const BlocksManager = () => {
  return (
    <CommonStoreProvider>
      <BlocksStoreProvider>
        <Entry />
      </BlocksStoreProvider>
    </CommonStoreProvider>
  );
};

export default BlocksManager;
