import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { CampusStoreContext } from "../contexts/CampusStoreContext";

export const useCampusStore = () => {
  const store = useContext(CampusStoreContext);
  if (!store) {
    throw new Error("Missing CampusStoreProvider");
  }
  return createSelectors(store);
};
