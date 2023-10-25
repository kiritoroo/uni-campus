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
  blocksPointerEnter: {
    blockUUID: string;
    distance: number;
  }[];
  blockPointerEnterNearest: {
    blockUUID: string;
  } | null;
  blockPicked: {
    blockUUID: string;
  } | null;
}

export type IBuildingStoreContext = StoreApi<IBuildingStore>;

export type IBuildingStoreProxyContext = IBuildingStoreProxy;
