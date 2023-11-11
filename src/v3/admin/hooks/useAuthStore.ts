import { useContext } from "react";
import { AuthStoreContext } from "../contexts/AuthStoreContext";
import { createSelectors } from "@Utils/zustand.utils";

export const useAuthStore = () => {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error("Missing AuthStoreProvider");
  }
  return createSelectors(store);
};
