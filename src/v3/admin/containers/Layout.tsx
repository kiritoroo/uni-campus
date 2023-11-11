import { Outlet } from "react-router-dom";
import Navbar from "@v3/admin/containers/Navbar";
import Header from "@v3/admin/containers/Header";
import Footer from "@v3/admin/containers/Footer";
import { UniDialogContainer, UniDialogProvider } from "../shared/UniDialog";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";
import { useAuthStore } from "../hooks/useAuthStore";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";

const GuardOutlet = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();
  const claims = authStore.use.claims();

  if (!authenticated) {
    console.log(`[🔒] Unauthorized`);
    return (
      <Fragment>
        <Navigate to="login" replace={true} />
        <Outlet />
      </Fragment>
    );
  } else {
    console.log(`[🔓] Authenticated\n`, claims);
  }

  return <Outlet />;
};

const Layout = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();

  return (
    <GlobalStoreProvider>
      <UniDialogProvider>
        <main className="max-w-screen flex h-screen max-h-screen w-screen flex-col flex-nowrap items-center justify-between text-slate-600">
          <Header />
          {authenticated ? (
            <div className="relative w-full flex-1 overflow-hidden bg-[#F2F2F2] px-10 py-5">
              <div className="flex h-full w-full items-center justify-start gap-5">
                <div className="h-full w-auto bg-[#ffffff] p-5">
                  <Navbar />
                </div>
                <div className="relative h-full flex-1 bg-[#ffffff] p-5">
                  <GuardOutlet />
                  <UniDialogContainer />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex-1 overflow-hidden bg-[#F2F2F2] px-10 py-5">
              <div className="h-full w-full bg-[#ffffff] p-5">
                <GuardOutlet />
              </div>
            </div>
          )}
          <Footer />
        </main>
      </UniDialogProvider>
    </GlobalStoreProvider>
  );
};

export default Layout;
