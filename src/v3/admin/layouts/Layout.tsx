import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@v3/admin/layouts/Navbar";
import Header from "@v3/admin/layouts/Header";
import Footer from "@v3/admin/layouts/Footer";
import { UniDialogContainer } from "../shared/UniDialog";
import { useAuthStore } from "../hooks/useAuthStore";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
import { SpinnerLoading } from "../shared/SpinnerLoading";
import { UniToastifyContainer } from "../shared/UniToastify";
import Provider from "./Provider";
import Sidebar from "./Sidebar";

const GuardOutlet = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();

  const location = useLocation();

  if (authenticated === undefined) {
    return <SpinnerLoading width={50} height={50} />;
  }

  if (authenticated === false) {
    return (
      <>
        <Navigate to="login" replace={true} />
        <Outlet />
      </>
    );
  }

  if (authenticated) {
    if (location.pathname === "/x/login") {
      return <Navigate to="/x" replace={true} />;
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Sidebar />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <Provider>
      <main className="font-lato text-gem-onyx bg-white antialiased">
        <UniToastifyContainer />
        <UniDialogContainer />

        <GuardOutlet />
      </main>
    </Provider>
  );
};

export default Layout;
