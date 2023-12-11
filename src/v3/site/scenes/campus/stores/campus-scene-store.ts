import { TBuildingSchema } from "@v3/site/schemas/building";
import { produce } from "immer";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  campusMode: "dev" | "prod";
  loadingBuildingsProgress:
    | {
        id: string;
        loaded: boolean;
      }[]
    | null;
  buildingsData: TBuildingSchema[] | null;
  campusCamera: THREE.PerspectiveCamera | null;
  distanceFromCameraToOrigin: number;
};

type TComputedState = {};

type TActions = {
  initBuildingsData: ({ buildingsData }: { buildingsData: TBuildingSchema[] }) => void;
  addLoadingBuildingProgress: ({ id, loaded }: { id: string; loaded: boolean }) => void;
  updateLoadingBuildingProgress: ({ id, loaded }: { id: string; loaded: boolean }) => void;
};

export interface ICampusSceneStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  campusMode: "prod",
  buildingsData: null,
  campusCamera: null,
  distanceFromCameraToOrigin: 0,
  loadingBuildingsProgress: null,
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
          addLoadingBuildingProgress: ({ id, loaded }) => {
            set((state) =>
              produce(state, (draft) => {
                if (draft.loadingBuildingsProgress === null) {
                  draft.loadingBuildingsProgress = [{ id: id, loaded: loaded }];
                } else {
                  // if (draft.loadingBuildingsProgress?.find((item) => item.id === id) !== null)
                  //   return;
                  draft.loadingBuildingsProgress.push({
                    id: id,
                    loaded: loaded,
                  });
                }
              }),
            );
          },
          updateLoadingBuildingProgress: ({ id, loaded }) => {
            set((state) =>
              produce(state, (draft) => {
                const updateProgress = draft.loadingBuildingsProgress?.find(
                  (item) => item.id === id,
                );

                if (updateProgress) {
                  updateProgress.loaded = loaded;
                }
              }),
            );
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
