import { TBlockSchema } from "@v3/site/schemas/block";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  blockData: TBlockSchema | null;
  isPointerEnterBlockNearest: boolean;
  isBlockPicked: boolean;
  isBlockShowInfo: boolean;
  distanceFromCameraToBlock: number;
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
  isPointerEnterBlockNearest: false,
  isBlockPicked: false,
  isBlockShowInfo: false,
  distanceFromCameraToBlock: 0,
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
