import { createContext, useContext, useRef } from "react";
import { StoreApi, createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createSelectors } from "@Utils/zustand.utils";
import { X } from "lucide-react";

type TUniDialogProps = {
  id: string;
  body: React.ReactElement;
  button: React.ReactElement;
};

type TUniDiaglogStore = {
  dialogs: TUniDialogProps[];
  addDialog: (props: { body: React.ReactElement; button: React.ReactElement }) => void;
  deleteDialog: (id: string) => void;
  clearDialog: () => void;
};

const createUniDialogStore = () => {
  return createStore<TUniDiaglogStore>((set, get) => ({
    dialogs: [],
    addDialog: ({ body, button }) => {
      const id = uuidv4();
      set((state) => ({ dialogs: [...state.dialogs, { id, body, button }] }));
    },
    deleteDialog: (id) => {
      set((state) => ({ dialogs: state.dialogs.filter((dialog) => dialog.id !== id) }));
    },
    clearDialog: () => {
      set({ dialogs: [] });
    },
  }));
};

export const UniDialogContext = createContext<TUniDiaglogStore | undefined>(undefined);

export const UniDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<TUniDiaglogStore>>();
  if (!storeRef.current) {
    storeRef.current = createUniDialogStore();
  }
  const selectors = createSelectors(storeRef.current);

  return (
    <UniDialogContext.Provider
      value={{
        dialogs: selectors.use.dialogs(),
        addDialog: selectors.use.addDialog(),
        deleteDialog: selectors.use.deleteDialog(),
        clearDialog: selectors.use.clearDialog(),
      }}
    >
      {children}
    </UniDialogContext.Provider>
  );
};

export const useUniDialog = () => {
  const context = useContext(UniDialogContext);
  if (!context) {
    throw new Error("UniDialog must be used within a UniDialogProvider");
  }
  return context;
};

export const UniDialog = ({ id, body, button }: TUniDialogProps) => {
  const { deleteDialog } = useUniDialog();

  return (
    <div
      id={id}
      className="min-w-[350px] overflow-hidden rounded-lg border border-gray-300 bg-white"
    >
      <div className="flex flex-col items-start justify-center">
        <div className="bg-white px-10 py-8">{body}</div>
        <div className="flex w-full items-center justify-between border-t border-t-gray-300 bg-[#FAFAFA] px-10 py-3">
          <button
            type="button"
            className="bg-gem-onyx border-gem-onyx hover:text-gem-onyx active:bg-gem-onyx/20 group flex items-center justify-around gap-2 rounded-lg border px-4 py-3 text-white transition-colors duration-200 hover:bg-white"
            onClick={() => {
              deleteDialog(id);
            }}
          >
            <div className="text-sm font-medium">Cancel</div>{" "}
            <X className="group-hover:stroke-gem-onyx h-4 w-4 stroke-white transition-colors duration-200" />
          </button>
          <div
            onClick={() => {
              deleteDialog(id);
            }}
          >
            {button}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniDialogContainer = () => {
  const { dialogs } = useUniDialog();

  return (
    <div>
      {dialogs.length > 0 && (
        <div className="absolute inset-0 z-[99999] flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
          {dialogs?.map((dialog) => <UniDialog key={dialog.id} {...dialog} />)}
        </div>
      )}
    </div>
  );
};
