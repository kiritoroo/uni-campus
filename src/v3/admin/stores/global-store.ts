import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface IGlobalStore {
  buildingServiceVersion: string;
  spaceServicesVersion: string;
  blockServicesVersion: string;
  minimalSidebar: boolean;
}

export const GlobalStore = () => {
  return createStore<IGlobalStore>((set, get) => {
    const minimalSidebar = window.localStorage.getItem("UNI-CAMPUS-X:minimal-sidebar");

    return {
      buildingServiceVersion: uuidv4(),
      spaceServicesVersion: uuidv4(),
      blockServicesVersion: uuidv4(),
      minimalSidebar: minimalSidebar ? JSON.parse(minimalSidebar)?.value : false,
    };
  });
};
