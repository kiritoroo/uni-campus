import { useContext } from "react";
import { BuildingsStoreContext } from "../contexts/BuildingsStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useBuildingsStore = () => {
  const store = useContext(BuildingsStoreContext);
  if (!store) {
    throw new Error("Missing BuildingsStoreProvider");
  }
  return createSelectors(store);
};
