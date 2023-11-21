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
import PuffLoader from "react-spinners/PuffLoader";
import { cn } from "@Utils/common.utils";

const GuardOutlet = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();

  const location = useLocation();

  if (authenticated === undefined) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PuffLoader size={100} loading={true} color="#323234" />
      </div>
    );
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
    <div className="flex h-screen w-screen items-start justify-start">
      <div className="h-full shrink-0 grow-0">
        <Sidebar />
      </div>
      <div className="relative h-screen grow">
        <UniDialogContainer />
        <div className="h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <Provider>
      <main className={cn("bg-white font-geist text-gem-onyx antialiased")}>
        <UniToastifyContainer />
        <GuardOutlet />
      </main>
    </Provider>
  );
};

export default Layout;
