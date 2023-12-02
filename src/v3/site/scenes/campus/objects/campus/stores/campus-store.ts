import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {};

type TComputedState = {};

type TActions = {};

export interface ICampusStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {};

export const CampusStore = () => {
  return createStore<ICampusStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {},
      }),
      (state) => ({}),
    ),
  );
};
