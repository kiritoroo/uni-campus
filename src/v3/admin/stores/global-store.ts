import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface IGlobalStore {
  buildingServiceVersion: string;
  spaceServicesVersion: string;
}

export const GlobalStore = () => {
  return createStore<IGlobalStore>((set, get) => ({
    buildingServiceVersion: uuidv4(),
    spaceServicesVersion: uuidv4(),
  }));
};
