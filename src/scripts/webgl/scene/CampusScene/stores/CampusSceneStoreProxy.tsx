import { proxy } from "valtio";
import { ICampusSceneStoreProxy } from "../types";

export const CampusSceneStoreProxy = () => {
  return proxy<ICampusSceneStoreProxy>({
    mouseState: {
      isMouseMove: false,
      isMouseSwipe: false,
    },
    swipeData: {
      velocity: 0,
      dir: "Left",
    },
  });
};
