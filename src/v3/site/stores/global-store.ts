import { createStore } from "zustand";
import { computed } from "zustand-computed";
import { TBlockSchema } from "../schemas/block";
import { TSpaceSchema } from "../schemas/space";

type TState = {
  showSidebar: boolean;
  blocksData: TBlockSchema[] | null;
  spacesData: TSpaceSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initBlocksData: ({ blocksData }: { blocksData: TBlockSchema[] }) => void;
  initSpacesData: ({ spacesData }: { spacesData: TSpaceSchema[] }) => void;
};

export interface IGlobalStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  showSidebar: false,
  blocksData: null,
  spacesData: null,
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
          initSpacesData({ spacesData }) {
            set({ spacesData: spacesData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
