import { UniDialogProvider } from "../shared/UniDialog";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";
import { AuthStoreProvider } from "../contexts/AuthStoreContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalStoreProvider>
      <AuthStoreProvider>
        <UniDialogProvider>{children}</UniDialogProvider>
      </AuthStoreProvider>
    </GlobalStoreProvider>
  );
};

export default Provider;
