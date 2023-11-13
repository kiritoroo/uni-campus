import { useContext } from "react";
import { SpacesStoreContext } from "../contexts/SpacesStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useSpacesStore = () => {
  const store = useContext(SpacesStoreContext);
  if (!store) {
    throw new Error("Missing SpacesStoreProvider");
  }
  return createSelectors(store);
};
