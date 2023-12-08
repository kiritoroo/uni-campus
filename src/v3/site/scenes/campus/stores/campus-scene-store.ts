import { TBuildingSchema } from "@v3/site/schemas/building";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  campusMode: "dev" | "prod";
  buildingsData: TBuildingSchema[] | null;
  campusCamera: THREE.PerspectiveCamera | null;
  distanceFromCameraToOrigin: number;
};

type TComputedState = {};

type TActions = {
  initBuildingsData: ({ buildingsData }: { buildingsData: TBuildingSchema[] }) => void;
};

export interface ICampusSceneStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  campusMode: "prod",
  buildingsData: null,
  campusCamera: null,
  distanceFromCameraToOrigin: 0,
};

export const CampusSceneStore = ({ mode }: { mode: "dev" | "prod" }) => {
  return createStore<ICampusSceneStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        campusMode: mode,
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
