import { minOfArray } from "@Utils/math.utils";
import { initializeGLTFLoader } from "@Utils/three.utils";
import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { produce } from "immer";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingData: TBuildingSchema | null;
  buildingModelScene: THREE.Group | null;
  isPointerEnterBuildingNearest: boolean;
  isBuildingPicked: boolean;
  blocksPointerEnter: {
    blockId: string;
    distance: number;
  }[];
  blockPicked: {
    blockId: string;
  } | null;
};

type TComputedState = {
  blockPointerEnterNearest: {
    blockId: string;
  } | null;
};

type TActions = {
  initBuildingData: ({ buildingData }: { buildingData: TBuildingSchema }) => void;
  addBlockPointerEnter: ({ blockId, distance }: { blockId: string; distance: number }) => void;
  removeBlockPointerEnter: (blockId: string) => void;
};

export interface IBuildingStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingData: null,
  buildingModelScene: null,
  isPointerEnterBuildingNearest: false,
  isBuildingPicked: false,
  blocksPointerEnter: [],
  blockPointerEnterNearest: null,
  blockPicked: null,
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
                set({ buildingModelScene: scene });
              },
            );
          },
          addBlockPointerEnter({ blockId, distance }) {
            set((state) =>
              produce(state, (draft) => {
                draft.blocksPointerEnter.push({
                  blockId: blockId,
                  distance: distance,
                });
              }),
            );
          },
          removeBlockPointerEnter(blockId) {
            set((state) =>
              produce(state, (draft) => {
                draft.blocksPointerEnter = draft.blocksPointerEnter.filter(
                  (data) => data.blockId !== blockId,
                );
              }),
            );
          },
        },
      }),
      (state) => {
        const blocksPointerEnter = state.blocksPointerEnter;

        const blockPointerEnterNearest = (() => {
          if (blocksPointerEnter.length > 0) {
            const nearest = minOfArray(blocksPointerEnter, (data) => data.distance);

            return {
              blockId: nearest.blockId,
            };
          }
          return null;
        })();
        return {
          blockPointerEnterNearest: blockPointerEnterNearest,
        };
      },
    ),
  );
};
