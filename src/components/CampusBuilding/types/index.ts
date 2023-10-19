import { StoreApi } from "zustand";

export interface IBuildingStore {
  building_uuid: string | null;
  set_building_uuid: (id: string) => void
}

export type IBuildingStoreContext = StoreApi<IBuildingStore>