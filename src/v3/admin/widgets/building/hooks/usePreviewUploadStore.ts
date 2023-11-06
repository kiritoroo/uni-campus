import { useContext } from "react";
import { PreviewUploadStoreContext } from "../contexts/PreviewUploadStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const usePreviewUploadStore = () => {
  const store = useContext(PreviewUploadStoreContext);
  if (!store) {
    throw new Error("Missing PreviewUploadStoreProvider");
  }
  return createSelectors(store);
};
