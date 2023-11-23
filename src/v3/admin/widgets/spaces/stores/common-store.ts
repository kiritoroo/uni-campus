import { TSpaceSchema } from "@v3/admin/schemas/space/base";
import { createStore } from "zustand";

export interface ICommonStore {
  showCreateModal: boolean;
  pickedSpaceId: TSpaceSchema["id"] | null;
  searchValue: string;
}

export const CommonStore = () => {
  return createStore<ICommonStore>((set, get) => ({
    showCreateModal: false,
    pickedSpaceId: null,
    searchValue: "",
  }));
};
