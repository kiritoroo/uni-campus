import { proxy } from "valtio";
import { IBuildingStoreProxy } from "../types";

export const BuildingStoreProxy = () => {
  return proxy<IBuildingStoreProxy>({
    isPointerEnter: false,
    isPicked: false,
    blocksPointerEnter: [],
    blockPointerEnterNearest: null,
    blockPicked: null,
  });
};
