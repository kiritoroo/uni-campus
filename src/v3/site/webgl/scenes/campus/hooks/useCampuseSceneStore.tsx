import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { CampusSceneStoreContext } from "../contexts/CampusSceneStoreContext";

export const useCampusSceneStore = () => {
  const store = useContext(CampusSceneStoreContext);
  if (!store) {
    throw new Error("Missing CampusSceneStoreProvider");
  }
  return createSelectors(store);
};
