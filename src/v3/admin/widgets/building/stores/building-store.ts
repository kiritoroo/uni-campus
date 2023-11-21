import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";
import * as THREE from "three";

type TState = {
  buildingId: TBuildingSchema["id"] | null;
  buildingData: TBuildingSchema | null;
  glBuildingObjects: (THREE.Object3D | THREE.Mesh)[] | null;
  glShowGroupMerge: boolean;
  glShowSelfBoundingBox: boolean;
  glShowSelfBoundingEffect: boolean;
  glShowSelfBoundingArround: boolean;
  glShowBlocksBoundings: boolean;
};

type TComputedState = {
  canSetPublish: undefined | boolean;
  glGroupMerge: THREE.Group | null;
  glSelfBoundings: {
    box: THREE.Mesh | null;
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
  canSetPublish: undefined,
  glBuildingObjects: null,
  glGroupMerge: null,
  glSelfBoundings: {
    box: null,
    arround: null,
    effect: null,
  },
  glBlocksBounding: null,
  glShowGroupMerge: true,
  glShowSelfBoundingBox: true,
  glShowSelfBoundingEffect: true,
  glShowSelfBoundingArround: true,
  glShowBlocksBoundings: true,
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
        const groupMerge = (function getGroupMerge() {
          return state.glBuildingObjects?.find((obj) => obj.name === "group-merge") ?? null;
        })() as THREE.Group;

        const boundingBox = (function getBoundingBox() {
          return state.glBuildingObjects?.find((obj) => obj.name === "bounding-box") ?? null;
        })() as THREE.Mesh;

        const boundingArround = (function getBoundingArround() {
          return state.glBuildingObjects?.find((obj) => obj.name === "bounding-around") ?? null;
        })() as THREE.Mesh;

        const boundingEffect = (function getBoundingEffect() {
          return state.glBuildingObjects?.find((obj) => obj.name === "bounding-effect") ?? null;
        })() as THREE.Mesh;

        const blocksBounding = (function getBlocksBounding() {
          if (state.glBuildingObjects) {
            return (
              state.glBuildingObjects?.filter((obj) => obj.name.includes("_bounding-box")) ?? []
            );
          } else {
            return null;
          }
        })() as THREE.Mesh[] | null;

        function getCanSetPublish() {
          return [
            state.glBuildingObjects && boundingArround && boundingEffect && blocksBounding,
          ].every((x) => x);
        }

        return {
          canSetPublish: getCanSetPublish(),
          glGroupMerge: groupMerge,
          glSelfBoundings: {
            box: boundingBox,
            arround: boundingArround,
            effect: boundingEffect,
          },
          glBlocksBounding: blocksBounding,
        };
      },
    ),
  );
};
