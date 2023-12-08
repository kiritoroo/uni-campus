import { TBlockSchema } from "@v3/site/schemas/block";
import { BlockStoreProvider } from "./contexts/BlockStoreContext";
import Entry from "./Entry";
import { memo } from "react";

const GLBlock = memo(({ blockData }: { blockData: TBlockSchema }) => {
  return (
    <BlockStoreProvider>
      <Entry blockData={blockData} />
    </BlockStoreProvider>
  );
});

export default GLBlock;
