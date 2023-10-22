import { proxy } from "valtio";
import { ICampusSceneStoreProxy } from "../types";

export const CampusSceneStoreProxy = () => {
  return proxy<ICampusSceneStoreProxy>({
    swipeData: {
      velocity: 0,
      dir: "Left",
    },
  });
};
