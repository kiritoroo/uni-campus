import { minOfArray } from "@Utils/math.utils";
import { produce } from "immer";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  buildingsPointerEnter: {
    buildingId: string;
    distance: number;
  }[];
  buildingPicked: {
    buildingId: string;
  } | null;
  buildingShowInfo: {
    buildingId: string;
  } | null;
};

type TComputedState = {
  buildingPointerEnterNearest: {
    buildingId: string;
  } | null;
};

type TActions = {
  addBuildingPointerEnter: ({
    buildingId,
    distance,
  }: {
    buildingId: string;
    distance: number;
  }) => void;
  removeBuildingPointerEnter: (buildingId: string) => void;
};

export interface ICampusStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  buildingsPointerEnter: [],
  buildingPointerEnterNearest: null,
  buildingPicked: null,
  buildingShowInfo: null,
};

export const CampusStore = () => {
  return createStore<ICampusStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          addBuildingPointerEnter({ buildingId, distance }) {
            set((state) =>
              produce(state, (draft) => {
                draft.buildingsPointerEnter.push({
                  buildingId: buildingId,
                  distance: distance,
                });
              }),
            );
          },
          removeBuildingPointerEnter(buildingId) {
            set((state) =>
              produce(state, (draft) => {
                draft.buildingsPointerEnter = draft.buildingsPointerEnter.filter(
                  (data) => data.buildingId !== buildingId,
                );
              }),
            );
          },
        },
      }),
      (state) => {
        const buildingsPointerEnter = state.buildingsPointerEnter;

        const buildingPointerEnterNearest = (() => {
          if (buildingsPointerEnter.length > 0) {
            const nearest = minOfArray(buildingsPointerEnter, (data) => data.distance);

            return {
              buildingId: nearest.buildingId,
            };
          }
          return null;
        })();
        return {
          buildingPointerEnterNearest: buildingPointerEnterNearest,
        };
      },
    ),
  );
};
