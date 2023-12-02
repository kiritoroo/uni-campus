import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {};

type TComputedState = {};

type TActions = {};

export interface IBuildingStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {};

export const BuildingStore = () => {
  return createStore<IBuildingStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {},
      }),
      (state) => ({}),
    ),
  );
};
