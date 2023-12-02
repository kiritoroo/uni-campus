import { TBuildingSchema } from "@v3/site/schemas/building";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingData: TBuildingSchema | null;
};

type TComputedState = {};

type TActions = {};

export interface ICampusSceneStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingData: null,
};

export const CampusSceneStore = () => {
  return createStore<ICampusSceneStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {},
      }),
      (state) => ({}),
    ),
  );
};
