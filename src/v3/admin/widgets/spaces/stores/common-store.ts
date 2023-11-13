import { createStore } from "zustand";

export interface ICommonStore {
  showCreateModal: boolean;
}

export const CommonStore = () => {
  return createStore<ICommonStore>((set, get) => ({
    showCreateModal: false,
  }));
};
