import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingId: TBuildingSchema["id"] | null;
  buildingData: TBuildingSchema | null;
};

type TComputedState = {};

type TActions = {
  initBuildingData: ({
    buildingId,
    buildingData,
  }: {
    buildingId: TBuildingSchema["id"];
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
