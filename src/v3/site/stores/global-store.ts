import { createStore } from "zustand";
import { computed } from "zustand-computed";
import { TBlockSchema } from "../schemas/block";

type TState = {
  showSidebar: boolean;
  blocksData: TBlockSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initBlocksData: ({ blocksData }: { blocksData: TBlockSchema[] }) => void;
};

export interface IGlobalStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  showSidebar: false,
  blocksData: null,
};

export const GlobalStore = () => {
  return createStore<IGlobalStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBlocksData({ blocksData }) {
            set({ blocksData: blocksData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
