import { minOfArray } from "@Utils/math.utils";
import { initializeGLTFLoader } from "@Utils/three.utils";
import { produce } from "immer";
import { createStore } from "zustand";
import { computed } from "zustand-computed";
import * as THREE from "three";
import { TBuildingSchema } from "@v3/site/schemas/building";
import { TBlockSchema } from "@v3/site/schemas/block";

type TState = {
  buildingData: TBuildingSchema | null;
  buildingObject: THREE.Group | null;
  buildingModelScene: THREE.Group | null;
  isPointerEnterBuildingNearest: boolean;
  isBuildingPicked: boolean;
  isBuildingShowInfo: boolean;
  distanceFromCameraToBuilding: number;
  blocksPointerEnter: {
    blockId: string;
    distance: number;
  }[];
  blockPicked: {
    blockId: string;
    blockData: TBlockSchema;
  } | null;
  blockShowInfo: {
    blockId: string;
  } | null;
};

type TComputedState = {
  blockPointerEnterNearest: {
    blockId: string;
  } | null;
  focusPostion: THREE.Vector3;
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
  buildingObject: null,
  buildingModelScene: null,
  isPointerEnterBuildingNearest: false,
  isBuildingPicked: false,
  isBuildingShowInfo: false,
  blocksPointerEnter: [],
  blockPointerEnterNearest: null,
  blockPicked: null,
  blockShowInfo: null,
  focusPostion: new THREE.Vector3(0, 0, 0),
  distanceFromCameraToBuilding: 0,
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
        const buildingData = state.buildingData;

        const blockPointerEnterNearest = (() => {
          if (blocksPointerEnter.length > 0) {
            const nearest = minOfArray(blocksPointerEnter, (data) => data.distance);

            return {
              blockId: nearest.blockId,
            };
          }
          return null;
        })();

        const focusPosition = (() => {
          const v3 = new THREE.Vector3(0, 0, 0);
          if (buildingData) {
            const avgXMarker =
              buildingData.blocks.reduce((sum, block) => sum + block.marker_position.x, 0) /
              buildingData.blocks.length;
            const avgZMarker =
              buildingData.blocks.reduce((sum, block) => sum + block.marker_position.z, 0) /
              buildingData.blocks.length;
            const maxYMarker = Math.max(
              ...buildingData.blocks.map((block) => block.marker_position.y),
            );

            v3.set(
              avgXMarker + buildingData.position.x,
              maxYMarker + buildingData.position.y,
              avgZMarker + buildingData.position.z,
            );
          }
          return v3;
        })();

        return {
          blockPointerEnterNearest: blockPointerEnterNearest,
          focusPostion: focusPosition,
        };
      },
    ),
  );
};
