import { UniDialogProvider } from "../shared/UniDialog";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";
import { AuthStoreProvider } from "../contexts/AuthStoreContext";
import { UniToastifyProvider } from "../shared/UniToastify";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UniDialogProvider>
      <UniToastifyProvider>
        <GlobalStoreProvider>
          <AuthStoreProvider>{children}</AuthStoreProvider>
        </GlobalStoreProvider>
      </UniToastifyProvider>
    </UniDialogProvider>
  );
};

export default Provider;
