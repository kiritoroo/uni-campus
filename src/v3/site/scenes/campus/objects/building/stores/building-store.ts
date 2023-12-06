import { initializeGLTFLoader } from "@Utils/three.utils";
import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingData: TBuildingSchema | null;
  buildingScene: THREE.Group | null;
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
  buildingScene: null,
};

const gltfLoader = initializeGLTFLoader();

export const BuildingStore = () => {
  return createStore<IBuildingStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingData: ({ buildingData }) => {
            set({ buildingData });

            gltfLoader?.load(
              `${process.env.UNI_CAMPUS_API_URL}/${buildingData.model_3d.url}`,
              (gltf) => {
                const scene = gltf.scene;
                set({ buildingScene: scene });
              },
            );
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
