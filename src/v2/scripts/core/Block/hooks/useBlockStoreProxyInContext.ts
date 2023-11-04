import { useContext } from "react";
import { BlockStoreProxyContext } from "../contexts/BlockStoreProxyContext";

export const useBlockStoreProxyInContext = () => {
  const storeProxy = useContext(BlockStoreProxyContext);
  if (!storeProxy) {
    throw new Error("Missing BlockStoreProxyProvider");
  }
  return storeProxy;
};
