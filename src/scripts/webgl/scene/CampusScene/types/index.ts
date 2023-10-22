export interface ICampusSceneStoreProxy {
  swipeData: {
    velocity: number;
    dir: "Left" | "Right";
  };
}

export type ICampusSceneStoreProxyContext = ICampusSceneStoreProxy;
