import { useContext } from "react";
import { GlobalStoreContext } from "../contexts/GlobalStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useGlobalStore = () => {
  const store = useContext(GlobalStoreContext);
  if (!store) {
    throw new Error("Missing GlobalStoreProvider");
  }
  return createSelectors(store);
};
