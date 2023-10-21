import { StoreApi } from "zustand";

export interface IBuildingStore {
  buildingUUID: string;
  buildingObject: THREE.Object3D | null;
  setBuildingUUID: (id: string) => void;
  setBuildingObject: (obj: THREE.Object3D) => void;
}

export interface IBuildingStoreProxy {
  isPointerEnter: boolean;
  isPicked: boolean;
}

export type IBuildingStoreContext = StoreApi<IBuildingStore>;

export type IBuildingStoreProxyContext = IBuildingStoreProxy;
