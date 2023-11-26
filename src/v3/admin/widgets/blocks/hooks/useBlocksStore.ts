import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { BlocksStoreContext } from "../contexts/BlocksStoreContext";

export const useBlocksStore = () => {
  const store = useContext(BlocksStoreContext);
  if (!store) {
    throw new Error("Missing BlocksStoreProvider");
  }
  return createSelectors(store);
};
