import { TSpaceSchema } from "@v3/admin/schemas/space/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  spaceId: TSpaceSchema["id"] | null;
  spaceData: TSpaceSchema | null;
};

type TComputedState = {};

type TActions = {
  initSpaceData: ({
    spaceId,
    spaceData,
  }: {
    spaceId: TSpaceSchema["id"];
    spaceData: TSpaceSchema;
  }) => void;
};

export interface ISpaceStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  spaceId: null,
  spaceData: null,
};

export const SpaceStore = () => {
  return createStore<ISpaceStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initSpaceData: ({ spaceId, spaceData }) => {
            set({ spaceId, spaceData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
