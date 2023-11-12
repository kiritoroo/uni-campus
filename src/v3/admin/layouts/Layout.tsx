import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@v3/admin/layouts/Navbar";
import Header from "@v3/admin/layouts/Header";
import Footer from "@v3/admin/layouts/Footer";
import { UniDialogContainer, UniDialogProvider } from "../shared/UniDialog";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";
import { useAuthStore } from "../hooks/useAuthStore";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
import { SpinnerLoading } from "../shared/SpinnerLoading";
import { UniToastifyContainer } from "../shared/UniToastify";

const GuardOutlet = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();

  const location = useLocation();

  if (!authenticated) {
    return (
      <Fragment>
        <Navigate to="login" replace={true} />
        <Outlet />
      </Fragment>
    );
  } else {
    if (location.pathname === "/x/login") {
      return (
        <Fragment>
          <Navigate to="/x" replace={true} />
        </Fragment>
      );
    }
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
          <UniToastifyContainer />
          <Header />
          {authenticated === undefined && (
            <div className="w-full flex-1 overflow-hidden bg-[#F2F2F2] px-10 py-5">
              <div className="h-full w-full bg-[#ffffff] p-5">
                <SpinnerLoading width={50} height={50} />
              </div>
            </div>
          )}
          {authenticated && (
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
          )}
          {authenticated === false && (
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
