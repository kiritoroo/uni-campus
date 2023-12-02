import { TBuildingSchema } from "@v3/site/schemas/building";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingsData: TBuildingSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initBuildingsData: ({ buildingsData }: { buildingsData: TBuildingSchema[] }) => void;
};

export interface ICampusSceneStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingsData: null,
};

export const CampusSceneStore = () => {
  return createStore<ICampusSceneStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingsData: ({ buildingsData }) => {
            set({ buildingsData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
