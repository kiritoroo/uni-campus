import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingData: TBuildingSchema | null;
};

type TComputedState = {};

type TActions = {
  initBuildingData: ({ buildingData }: { buildingData: TBuildingSchema }) => void;
};

export interface IBuildingStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingData: null,
};

export const BuildingStore = () => {
  return createStore<IBuildingStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingData: ({ buildingData }) => {
            set({ buildingData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
