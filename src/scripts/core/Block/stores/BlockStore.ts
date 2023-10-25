import { createStore } from "zustand";
import { IBlockStore } from "../types";
import { v4 as uuidv4 } from "uuid";

export const BlockStore = () => {
  return createStore<IBlockStore>((set) => ({
    blockUUID: uuidv4(),
  }));
};
