export interface ICampusSceneStoreProxy {
  mouseState: {
    isMouseSwipe: boolean;
    isMouseMove: boolean;
  };
  swipeData: {
    velocity: number;
    dir: "Left" | "Right";
  };
}

export type ICampusSceneStoreProxyContext = ICampusSceneStoreProxy;
