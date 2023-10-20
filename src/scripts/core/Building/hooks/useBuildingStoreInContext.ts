import { useContext } from "react";
import { BuildingStoreContext } from "../contexts/BuildingStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useBuildingStoreInContext = () => {
  const store = useContext(BuildingStoreContext);
  if (!store) {
    throw new Error("Missing BuildingStoreProvider");
  }
  return createSelectors(store);
};
