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

  const uniToast = useUniToastify();

  useEffect(() => {
    setTimeout(() => {
      uniToast.deleteToastify(id);
    }, 2500);
  }, []);

  return (
    <div id={id} className="border border-slate-200 bg-white shadow-sm">
      <div className="flex items-stretch justify-start">
        <div className="flex items-center justify-center py-3 pl-8 pr-5">
          <Icon className="h-8 w-8" style={{ stroke: color }} />
        </div>
        <div className="py-3 pl-2 pr-8">
          <div className="text-lg font-semibold">{title ? title : defaultTitle}</div>
          <div className="w-[250px] text-base text-slate-500">
            <TextTruncate line={2} element="div" truncateText="..." text={desc} />
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center border-l border-slate-200 px-5 py-3 hover:bg-slate-200"
          onClick={() => {
            uniToast.deleteToastify(id);
          }}
        >
          <div className="text-base font-semibold uppercase">OK</div>
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
        <div className="absolute left-1/2 right-0 top-[20px] z-[99999] w-fit -translate-x-1/2">
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
