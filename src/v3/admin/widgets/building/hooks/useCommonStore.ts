import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { CommonStoreContext } from "../contexts/CommonStoreContext";

export const useCommonStore = () => {
  const store = useContext(CommonStoreContext);
  if (!store) {
    throw new Error("Missing CommonStoreProvider");
  }
  return createSelectors(store);
};
