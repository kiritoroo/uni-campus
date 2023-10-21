import { createStore } from "zustand";
import { ICampusStore } from "../types";

export const CampusStore = () => {
  return createStore<ICampusStore>((set) => ({
    campusCamera: null,
    setCampusCamera: (camera) => set(() => ({ campusCamera: camera })),
  }));
};
