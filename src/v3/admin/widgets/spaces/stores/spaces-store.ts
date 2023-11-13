import { TSpaceSchema } from "@v3/admin/schemas/space/base";
import { createStore } from "zustand";
import { computed } from "zustand-computed";

type TState = {
  spacesData: TSpaceSchema[] | null;
};

type TComputedState = {};

type TActions = {
  initSpacesData: ({ spacesData }: { spacesData: TSpaceSchema[] }) => void;
  addSpace: ({ spaceData }: { spaceData: TSpaceSchema }) => void;
  removeSpace: ({ spaceId }: { spaceId: TSpaceSchema["id"] }) => void;
};

export interface ISpacesStore extends TState, TComputedState {
  actions: TActions;
}

const initStore: TState & TComputedState = {
  spacesData: null,
};

export const SpacesStore = () => {
  return createStore<ISpacesStore, [["chrisvander/zustand-computed", TComputedState]]>(
    computed(
      (set, get) => ({
        ...initStore,
        actions: {
          initSpacesData: ({ spacesData }) => {
            set({ spacesData });
          },
          addSpace: ({ spaceData }) => {
            const draft = get().spacesData;
            if (!draft) {
              set({ spacesData: [spaceData] });
            } else {
              draft.push(spaceData);
            }
          },
          removeSpace: ({ spaceId }) => {
            const draft = get().spacesData;
            if (!draft) return;
            set({ spacesData: draft.filter((item) => item.id !== spaceId) });
          },
        },
      }),
      (state) => ({}),
    ),
  );
};
