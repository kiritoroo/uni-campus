import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  spacePicked: {
    spaceId: string;
  } | null;
};

type TComputedState = {};

type TActions = {};

export interface IOverviewStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  spacePicked: null,
};

export const OVerviewStore = () => {
  return createStore<IOverviewStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {},
      }),
      (state) => ({}),
    ),
  );
};
