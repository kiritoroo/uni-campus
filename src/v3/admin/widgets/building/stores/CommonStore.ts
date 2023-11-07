import { createStore } from "zustand";

export interface ICommonStore {
  tmp: boolean;
}

export const CommonStore = () => {
  return createStore<ICommonStore>((set, get) => ({
    tmp: false,
  }));
};
