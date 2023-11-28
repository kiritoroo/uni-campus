import { createStore } from "zustand";

export interface ICommonStore {
  enableEditDetail: boolean;
}

export const CommonStore = () => {
  return createStore<ICommonStore>((set, get) => ({
    enableEditDetail: false,
  }));
};
