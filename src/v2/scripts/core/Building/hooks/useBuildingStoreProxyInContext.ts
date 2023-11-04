import { useContext } from "react";
import { BuildingStoreProxyContext } from "../contexts/buildingStoreProxyContext";

export const useBuildingStoreProxyInContext = () => {
  const storeProxy = useContext(BuildingStoreProxyContext);
  if (!storeProxy) {
    throw new Error("Missing BuildingStoreProxyProvider");
  }
  return storeProxy;
};
