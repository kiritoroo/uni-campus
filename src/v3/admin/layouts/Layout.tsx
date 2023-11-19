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
      <>
        <Navigate to="login" replace={true} />
        <Outlet />
      </>
    );
  } else {
    if (location.pathname === "/x/login") {
      return <Navigate to="/x" replace={true} />;
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
        <main className="font-lato text-gem-onyx bg-white antialiased">
          <UniToastifyContainer />
          <UniDialogContainer />
          {authenticated === undefined && <SpinnerLoading width={50} height={50} />}
          {authenticated && <GuardOutlet />}
          {authenticated === false && <GuardOutlet />}
        </main>
      </UniDialogProvider>
    </GlobalStoreProvider>
  );
};

export default Layout;
