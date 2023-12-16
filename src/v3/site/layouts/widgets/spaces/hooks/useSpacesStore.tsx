import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { SpacesStoreContext } from "../contexts/SpacesStoreContext";

export const useSpacesStore = () => {
  const store = useContext(SpacesStoreContext);
  if (!store) {
    throw new Error("Missing SpacesStoreContexts");
  }
  return createSelectors(store);
};
