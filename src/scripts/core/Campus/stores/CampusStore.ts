import { createStore } from "zustand";
import { ICampusStore } from "../types";

export const CampusStore = () => {
  return createStore<ICampusStore>((set) => ({
    campusCamera: null,
    campusControls: null,
    setCampusCamera: (camera) => set(() => ({ campusCamera: camera })),
    setCampusControls: (controls) => set(() => ({ campusControls: controls })),
  }));
};
