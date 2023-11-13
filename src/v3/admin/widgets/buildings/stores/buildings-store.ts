import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingsData: TBuildingSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initBuildingsData: ({ buildingsData }: { buildingsData: TBuildingSchema[] }) => void;
  addBuilding: ({ buildingData }: { buildingData: TBuildingSchema }) => void;
  removeBuilding: ({ buildingId }: { buildingId: TBuildingSchema["id"] }) => void;
};

export interface IBuildingsStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingsData: null,
};

export const BuildingsStore = () => {
  return createStore<IBuildingsStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingsData: ({ buildingsData }) => {
            set({ buildingsData });
          },
          addBuilding: ({ buildingData }) => {
            const draft = get().buildingsData;
            if (!draft) {
              set({ buildingsData: [buildingData] });
            } else {
              draft.push(buildingData);
            }
          },
          removeBuilding: ({ buildingId }) => {
            const draft = get().buildingsData;
            if (!draft) return;
            set({ buildingsData: draft.filter((item) => item.id !== buildingId) });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
