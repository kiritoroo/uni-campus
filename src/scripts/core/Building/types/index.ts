import { StoreApi } from "zustand";

export interface IBuildingStore {
  buildingUUID: string;
  setBuildingUUID: (id: string) => void;
}

export interface IBuildingStoreProxy {
  isPointerEnter: boolean;
  isPicked: boolean;
}

export type IBuildingStoreContext = StoreApi<IBuildingStore>;

export type IBuildingStoreProxyContext = IBuildingStoreProxy;
