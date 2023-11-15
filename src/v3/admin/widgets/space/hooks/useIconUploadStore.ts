import { useContext } from "react";
import { IconUploadStoreContext } from "../contexts/IconUploadStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useIconUploadStore = () => {
  const store = useContext(IconUploadStoreContext);
  if (!store) {
    throw new Error("Missing IconUploadStoreProvider");
  }
  return createSelectors(store);
};
