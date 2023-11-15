import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";
import * as THREE from "three";
import { produce } from "immer";

type TState = {
  buildingId: TBuildingSchema["id"] | null;
  buildingData: TBuildingSchema | null;
  glBuildingObjects: THREE.Mesh[] | null;
};

type TComputedState = {
  glSelfBoundings: {
    arround: THREE.Mesh | null;
    effect: THREE.Mesh | null;
  };
  glBlocksBounding: THREE.Mesh[] | null;
};

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
  glBuildingObjects: null,
  glSelfBoundings: {
    arround: null,
    effect: null,
  },
  glBlocksBounding: null,
};

export const BuildingStore = () => {
  return createStore<IBuildingStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initBuildingData: ({ buildingId, buildingData }) => {
            set({ buildingId, buildingData });
          },
        },
      }),
      (state) => {
        function getBoundingArround() {
          return state.glBuildingObjects?.find((obj) => obj.name === "bounding-around") ?? null;
        }

        function getBoundingEffect() {
          return state.glBuildingObjects?.find((obj) => obj.name === "bounding-effect") ?? null;
        }

        function getBlocksBounding() {
          if (state.glBuildingObjects) {
            return (
              state.glBuildingObjects?.filter((obj) => obj.name.includes("_bounding-box")) ?? []
            );
          } else {
            return null;
          }
        }

        return {
          glBlocksBounding: getBlocksBounding(),
          glSelfBoundings: {
            arround: getBoundingArround(),
            effect: getBoundingEffect(),
          },
        };
      },
    ),
  );
};
