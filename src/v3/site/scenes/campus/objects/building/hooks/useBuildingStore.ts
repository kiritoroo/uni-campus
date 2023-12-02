import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { BuildingStoreContext } from "../contexts/BuildingStoreContext";

export const useBuildingStore = () => {
  const store = useContext(BuildingStoreContext);
  if (!store) {
    throw new Error("Missing BuildingStoreProvider");
  }
  return createSelectors(store);
};
