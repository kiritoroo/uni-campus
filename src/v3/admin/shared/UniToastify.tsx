import { StoreApi, createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useEffect, useRef } from "react";
import { createSelectors } from "@Utils/zustand.utils";
import { Info, CheckCircle, LucideProps, AlertTriangle, XCircle } from "lucide-react";
import TextTruncate from "react-text-truncate";

export type TToastifyType = "info" | "success" | "warning" | "error";

type TUniToastifyProps = {
  type: TToastifyType;
  id: string;
  desc?: string;
  title?: string;
};

type TUniToastifyStore = {
  toasts: TUniToastifyProps[];
  info: (props: Pick<TUniToastifyProps, "title" | "desc">) => void;
  success: (props: Pick<TUniToastifyProps, "title" | "desc">) => void;
  warning: (props: Pick<TUniToastifyProps, "title" | "desc">) => void;
  error: (props: Pick<TUniToastifyProps, "title" | "desc">) => void;
  deleteToastify: (id: TUniToastifyProps["id"]) => void;
  clearToastify: () => void;
};

const createUniToastifyStore = () => {
  return createStore<TUniToastifyStore>((set, get) => ({
    toasts: [],
    info: ({ title, desc }) => {
      const id = uuidv4();
      set((state) => ({ toasts: [...state.toasts, { type: "info", id, title, desc }] }));
    },
    success: ({ title, desc }) => {
      const id = uuidv4();
      set((state) => ({ toasts: [...state.toasts, { type: "success", id, title, desc }] }));
    },
    warning: ({ title, desc }) => {
      const id = uuidv4();
      set((state) => ({ toasts: [...state.toasts, { type: "warning", id, title, desc }] }));
    },
    error: ({ title, desc }) => {
      const id = uuidv4();
      set((state) => ({ toasts: [...state.toasts, { type: "error", id, title, desc }] }));
    },
    deleteToastify: (id) => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    },
    clearToastify: () => {
      set({ toasts: [] });
    },
  }));
};

export const UniToastifyContext = createContext<TUniToastifyStore | undefined>(undefined);

export const UniToastifyProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<TUniToastifyStore>>();
  if (!storeRef.current) {
    storeRef.current = createUniToastifyStore();
  }
  const selectors = createSelectors(storeRef.current);

  return (
    <UniToastifyContext.Provider
      value={{
        toasts: selectors.use.toasts(),
        info: selectors.use.info(),
        success: selectors.use.success(),
        warning: selectors.use.warning(),
        error: selectors.use.error(),
        deleteToastify: selectors.use.deleteToastify(),
        clearToastify: selectors.use.clearToastify(),
      }}
    >
      {children}
    </UniToastifyContext.Provider>
  );
};

export const useUniToastify = () => {
  const context = useContext(UniToastifyContext);
  if (!context) {
    throw new Error("UniToastify must be used within a UniToastifyProvider");
  }
  return context;
};

export const ToastifyVariants: {
  [key in TToastifyType]: {
    Icon: (props: LucideProps) => JSX.Element;
    defaultTitle: string;
    color: string;
  };
} = {
  info: {
    Icon: (props) => <Info {...props} />,
    defaultTitle: "Info",
    color: "#0ea5e9",
  },
  success: {
    Icon: (props) => <CheckCircle {...props} />,
    defaultTitle: "Success",
    color: "#10b981",
  },
  warning: {
    Icon: (props) => <AlertTriangle {...props} />,
    defaultTitle: "Warning",
    color: "#f59e0b",
  },
  error: {
    Icon: (props) => <XCircle {...props} />,
    defaultTitle: "Error",
    color: "#ef4444",
  },
};

export const UniToastify = ({ id, type, title, desc }: TUniToastifyProps) => {
  const toastVariant = ToastifyVariants[type];
  const { Icon, color, defaultTitle } = toastVariant;
  const timeoutId = useRef<any>();

  const uniToast = useUniToastify();

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      uniToast.deleteToastify(id);
    }, 2500);
  }, []);

  return (
    <div
      id={id}
      className="animate-[fadein_200ms_linear] overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md"
      onMouseEnter={() => {
        clearTimeout(timeoutId.current);
      }}
      onMouseLeave={() => {
        timeoutId.current = setTimeout(() => {
          uniToast.deleteToastify(id);
        }, 2500);
      }}
    >
      <div className="flex items-stretch justify-start">
        <div className="flex items-center justify-center py-3 pl-8 pr-5">
          <Icon className="h-8 w-8" style={{ stroke: color }} />
        </div>
        <div className="py-3 pl-2 pr-8">
          <div className="text-gem-onyx text-base font-semibold">
            {title ? title : defaultTitle}
          </div>
          <div className="text-gem-onyx/80 w-[200px] text-sm">
            <TextTruncate line={2} element="div" truncateText="..." text={desc} />
          </div>
        </div>
        <button
          type="button"
          className="hover:bg-gem-onyx flex items-center justify-center border-l border-gray-300 px-5 py-3 transition-colors duration-200 hover:text-white"
          onClick={() => {
            uniToast.deleteToastify(id);
          }}
        >
          <div className="text-sm font-semibold uppercase">OK</div>
        </button>
      </div>
    </div>
  );
};

export const UniToastifyContainer = () => {
  const { toasts } = useUniToastify();

  return (
    <div>
      {toasts.length > 0 && (
        <div className="absolute bottom-[50px] left-[95%] right-0 z-[99999] w-fit -translate-x-[100%]">
          <div className="flex flex-col items-center justify-center space-y-4">
            {toasts.map((toast) => (
              <UniToastify key={toast.id} {...toast} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
