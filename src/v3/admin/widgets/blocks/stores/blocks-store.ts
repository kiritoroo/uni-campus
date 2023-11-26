import { TBlockSchema } from "@v3/admin/schemas/block/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  blocksData: TBlockSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initBlocksData: ({ blocksData }: { blocksData: TBlockSchema[] }) => void;
  addBlock: ({ blockData }: { blockData: TBlockSchema }) => void;
  removeBlock: ({ blockId }: { blockId: TBlockSchema["id"] }) => void;
};

export interface IBlocksStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  blocksData: null,
};

export const blocksStore = () => {
  return createStore<IBlocksStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBlocksData: ({ blocksData }) => {
            set({ blocksData });
          },
          addBlock: ({ blockData }) => {
            const draft = get().blocksData;
            if (!draft) {
              set({ blocksData: [blockData] });
            } else {
              draft.push(blockData);
            }
          },
          removeBlock: ({ blockId }) => {
            const draft = get().blocksData;
            if (!draft) return;
            set({ blocksData: draft.filter((item) => item.id !== blockId) });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
