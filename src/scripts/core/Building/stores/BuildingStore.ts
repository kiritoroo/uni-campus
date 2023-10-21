import { createStore } from "zustand";
import { IBuildingStore } from "../types";
import { v4 as uuidv4 } from "uuid";

export const BuildingStore = () => {
  return createStore<IBuildingStore>((set) => ({
    buildingUUID: uuidv4(),
    setBuildingUUID: (id) => set(() => ({ buildingUUID: id })),
  }));
};
