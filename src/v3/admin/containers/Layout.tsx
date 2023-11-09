import { Outlet } from "react-router-dom";
import Navbar from "@v3/admin/containers/Navbar";
import Header from "@v3/admin/containers/Header";
import Footer from "@v3/admin/containers/Footer";
import { UniDialogContainer, UniDialogProvider } from "../shared/UniDialog";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";

const Layout = () => {
  return (
    <GlobalStoreProvider>
      <UniDialogProvider>
        <main className="max-w-screen flex h-screen max-h-screen w-screen flex-col flex-nowrap items-center justify-between">
          <Header />
          <div className="relative w-full flex-1 overflow-hidden bg-[#F2F2F2] px-10 py-5">
            <div className="flex h-full w-full items-center justify-start gap-5">
              <div className="h-full w-auto bg-[#ffffff] p-5">
                <Navbar />
              </div>
              <div className="relative h-full flex-1 bg-[#ffffff] p-5">
                <Outlet />
                <UniDialogContainer />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </UniDialogProvider>
    </GlobalStoreProvider>
  );
};

export default Layout;
