import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  showSidebar: boolean;
};

type TComputedState = {};

type TActions = {};

export interface IGlobalStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  showSidebar: false,
};

export const GlobalStore = () => {
  return createStore<IGlobalStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {},
      }),
      (state) => ({}),
    ),
  );
};
