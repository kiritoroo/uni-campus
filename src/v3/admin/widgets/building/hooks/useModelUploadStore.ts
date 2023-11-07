import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { ModelUploadStoreContext } from "../contexts/ModelUploadStoreContext";

export const useModelUploadStore = () => {
  const store = useContext(ModelUploadStoreContext);
  if (!store) {
    throw new Error("Missing ModelUploadStoreProvider");
  }
  return createSelectors(store);
};
