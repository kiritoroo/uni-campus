import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { OverviewStoreContext } from "../contexts/OverviewStoreContext";

export const useOverviewStore = () => {
  const store = useContext(OverviewStoreContext);
  if (!store) {
    throw new Error("Missing OverviewStoreContext");
  }
  return createSelectors(store);
};
