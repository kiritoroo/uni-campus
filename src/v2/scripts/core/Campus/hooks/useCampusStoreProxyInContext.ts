import { useContext } from "react";
import { CampusStoreProxyContext } from "../contexts/CampusStoreProxyContext";

export const useCampusStoreProxyInContext = () => {
  const storeProxy = useContext(CampusStoreProxyContext);
  if (!storeProxy) {
    throw new Error("Missing CampusStoreProxyProvider");
  }
  return storeProxy;
};
