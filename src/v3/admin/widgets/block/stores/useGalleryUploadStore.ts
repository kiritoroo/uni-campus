import { useContext } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { GalleryUploadStoreContext } from "../contexts/GalleryUploadStoreContext";

export const useGalleryUploadStore = () => {
  const store = useContext(GalleryUploadStoreContext);
  if (!store) {
    throw new Error("Missing GalleryUploadStoreProvider");
  }
  return createSelectors(store);
};
