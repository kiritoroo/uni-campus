import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface IGlobalStore {
  buildingServiceVersion: string;
  spaceServicesVersion: string;
  minimalSidebar: boolean;
}

export const GlobalStore = () => {
  return createStore<IGlobalStore>((set, get) => ({
    buildingServiceVersion: uuidv4(),
    spaceServicesVersion: uuidv4(),
    minimalSidebar:
      JSON.parse(window.localStorage.getItem("UNI-CAMPUS-X:minimal-sidebar") ?? "")?.value ?? false,
  }));
};
