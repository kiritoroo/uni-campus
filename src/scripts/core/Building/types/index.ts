import { StoreApi } from "zustand";

export interface IBuildingStore {
  building_uuid: string;
  set_building_uuid: (id: string) => void;
}

export interface IBuildingStoreProxy {
  isPointerEnter: boolean;
}

export type IBuildingStoreContext = StoreApi<IBuildingStore>;

export type IBuildingStoreProxyContext = IBuildingStoreProxy;
