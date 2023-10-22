import { useContext } from "react";
import { CampusSceneStoreProxyContext } from "../contexts/CampusSceneStoreProxyContext";

export const useCampusSceneStoreProxyInContext = () => {
  const storeProxy = useContext(CampusSceneStoreProxyContext);
  if (!storeProxy) {
    throw new Error("Missing CampusSceneStoreProxyProvider");
  }
  return storeProxy;
};
