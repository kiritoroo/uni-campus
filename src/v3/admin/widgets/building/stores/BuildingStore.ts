import { TBuildingSchema } from "@v3/admin/schemas/building-schema";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingId: string | null;
  buildingData: TBuildingSchema | null;
};

type TComputedState = {};

type TActions = {
  initBuildingData: ({
    buildingId,
    buildingData,
  }: {
    buildingId: string;
    buildingData: TBuildingSchema;
  }) => void;
};

export interface IBuildingStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingId: null,
  buildingData: null,
};

export const BuildingStore = () => {
  return createStore<IBuildingStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingData: ({ buildingId, buildingData }) => {
            set({ buildingId });
            set({ buildingData });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
