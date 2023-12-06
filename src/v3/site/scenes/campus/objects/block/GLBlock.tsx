import { TBlockSchema } from "@v3/site/schemas/block";
import { BlockStoreProvider } from "./contexts/BlockStoreContext";
import Entry from "./Entry";

const GLBlock = ({ blockData }: { blockData: TBlockSchema }) => {
  return (
    <BlockStoreProvider>
      <Entry blockData={blockData} />
    </BlockStoreProvider>
  );
};

export default GLBlock;
