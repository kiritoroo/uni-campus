import { createStore } from "zustand";

export interface ICommonStore {
  showCreateModal: boolean;
  searchValue: string;
}

export const CommonStore = () => {
  return createStore<ICommonStore>((set, get) => ({
    showCreateModal: false,
    searchValue: "",
  }));
};
