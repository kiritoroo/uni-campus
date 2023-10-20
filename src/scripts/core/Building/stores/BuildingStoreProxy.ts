import { proxy } from "valtio";
import { IBuildingStoreProxy } from "../types";

export const BuildingStoreProxy = () => {
  return proxy<IBuildingStoreProxy>({
    isPointerEnter: false,
  });
};
