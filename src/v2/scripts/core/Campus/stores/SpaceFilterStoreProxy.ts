import { proxy } from "valtio";
import { ISpaceFilterStoreProxy } from "../types";

export const SpaceFilterStoreProxy = () => {
  return proxy<ISpaceFilterStoreProxy>({
    spacePicked: null,
  });
};
