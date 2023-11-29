import { TBlockSchema } from "@v3/admin/schemas/block/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  blockId: TBlockSchema["id"] | null;
  blockData: TBlockSchema | null;
};

type TComputedState = {
  canSetPublish: undefined | boolean;
};

type TActions = {
  initBlockData: ({
    blockId,
    blockData,
  }: {
    blockId: TBlockSchema["id"];
    blockData: TBlockSchema;
  }) => void;
};

export interface IBlockStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  blockId: null,
  blockData: null,
  canSetPublish: undefined,
};

export const BlockStore = () => {
  return createStore<IBlockStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBlockData: ({ blockId, blockData }) => {
            set({ blockId, blockData });
          },
        },
      }),
      (state) => ({
        canSetPublish: true,
      }),
    ),
  );
};
