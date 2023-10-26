import { useContext } from "react";
import { SpaceFilterStoreProxyContext } from "../contexts/SpaceFilterStoreProxyContext";

export const useSpaceFilterStoreProxyInContext = () => {
  const storeProxy = useContext(SpaceFilterStoreProxyContext);
  if (!storeProxy) {
    throw new Error("Missing SpaceFilterStoreProxyProvider");
  }
  return storeProxy;
};
