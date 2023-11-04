import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { BlockStoreContext } from "../contexts/BlockStoreContext";

export const useBlockStoreInContext = () => {
  const store = useContext(BlockStoreContext);
  if (!store) {
    throw new Error("Missing BlockStoreProvider");
  }
  return createSelectors(store);
};
