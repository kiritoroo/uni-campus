import { proxy } from "valtio";
import { IBlockStoreProxy } from "../types";

export const BlockStoreProxy = () => {
  return proxy<IBlockStoreProxy>({
    isPointerEnter: false,
    isPicked: false,
  });
};
