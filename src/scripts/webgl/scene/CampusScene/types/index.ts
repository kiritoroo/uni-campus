export interface ICampusSceneStoreProxy {
  cameraState: {
    isFocusBuilding: boolean;
    isFlyAroundcampus: boolean;
  };
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
