import { TBlockSchema } from "@v3/site/schemas/block";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  blockData: TBlockSchema | null;
};

type TComputedState = {};

type TActions = {
  initBlockData: ({ blockData }: { blockData: TBlockSchema }) => void;
};

export interface IBlockStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  blockData: null,
};

export const BlockStore = () => {
  return createStore<IBlockStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBlockData({ blockData }) {
            set({ blockData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};