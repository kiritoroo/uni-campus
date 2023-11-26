import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";
import * as THREE from "three";
import { TBlockSchema } from "@v3/admin/schemas/block/base";

type TState = {
  buildingId: TBuildingSchema["id"] | null;
  buildingData: TBuildingSchema | null;
  glBuildingObjects: (THREE.Object3D | THREE.Mesh)[] | null;
  glShowGroupMerge: boolean;
  glShowSelfBoundingBox: boolean;
  glShowSelfBoundingEffect: boolean;
  glShowSelfBoundingArround: boolean;
  glShowBlocksBounding: boolean;
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
  glBLockSlots:
    | {
        objName: string;
        isEmpty: boolean;
        blockData: TBlockSchema | null;
      }[]
    | null;
};

type TActions = {
  initBuildingData: ({
    buildingId,
    buildingData,
  }: {
    buildingId: TBuildingSchema["id"];
    buildingData: TBuildingSchema;
  }) => void;
  mapBlockSlots: (blocks: TBlockSchema[]) => void;
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
  glShowBlocksBounding: true,
  glBLockSlots: null,
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
          mapBlockSlots: (blocks) => {
            const blocksBounding = get().glBlocksBounding;

            const blockSlots = (function getBlockSlots() {
              return blocksBounding
                ? blocksBounding.map((bounding) => ({
                    objName: bounding.name.split("_")[0],
                    isEmpty: true,
                    blockData: null,
                  }))
                : [];
            })() as TComputedState["glBLockSlots"];

            const updatedSlots = blockSlots?.map((slot) => {
              const matchingBlock = blocks.find((block) => block.obj_name === slot.objName);
              if (matchingBlock) {
                return {
                  ...slot,
                  isEmpty: false,
                  blockData: matchingBlock,
                };
              } else {
                return slot;
              }
            });
            set({ glBLockSlots: updatedSlots });
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

        const canSetPublic = (function getCanSetPublish() {
          return [
            state.glBuildingObjects && boundingArround && boundingEffect && blocksBounding,
          ].every((x) => x);
        })();

        return {
          canSetPublish: canSetPublic,
          glGroupMerge: groupMerge,
          glSelfBoundings: {
            box: boundingBox,
            arround: boundingArround,
            effect: boundingEffect,
          },
          glBlocksBounding: blocksBounding,
          glBLockSlots: null,
        };
      },
    ),
  );
};
