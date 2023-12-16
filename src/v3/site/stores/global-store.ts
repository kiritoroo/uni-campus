import { createStore } from "zustand";
import { computed } from "zustand-computed";
import { TBlockSchema } from "../schemas/block";
import { TSpaceSchema } from "../schemas/space";

type TState = {
  blocksData: TBlockSchema[] | null;
  spacesData: TSpaceSchema[] | null;
  showHeader: boolean;
  showSidebar: boolean;
  showOverview: boolean;
  showSpaces: boolean;
  isInteractive: boolean;
  startExploring: boolean;
  enableSound: boolean;
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
  showHeader: true,
  blocksData: null,
  spacesData: null,
  showSidebar: false,
  showOverview: false,
  showSpaces: false,
  isInteractive: false,
  startExploring: false,
  enableSound: true,
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
