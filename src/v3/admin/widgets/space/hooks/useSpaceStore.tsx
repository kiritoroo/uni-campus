import { useContext } from "react";
import { SpaceStoreContext } from "../contexts/SpaceStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useSpaceStore = () => {
  const store = useContext(SpaceStoreContext);
  if (!store) {
    throw new Error("Missing SpaceStoreProvider");
  }
  return createSelectors(store);
};
