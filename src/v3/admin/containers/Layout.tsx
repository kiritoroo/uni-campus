import { Outlet } from "react-router-dom";
import Navbar from "@v3/admin/containers/Navbar";
import Header from "@v3/admin/containers/Header";
import Footer from "@v3/admin/containers/Footer";

const Layout = () => {
  return (
    <main className="max-w-screen flex h-screen max-h-screen w-screen flex-col flex-nowrap items-center justify-between">
      <Header />
      <div className="relative w-full flex-1 overflow-hidden bg-[#F2F2F2] px-10 py-5">
        <div className="flex h-full w-full items-center justify-start gap-5">
          <div className="h-full w-auto bg-[#ffffff] p-5">
            <Navbar />
          </div>
          <div className="h-full flex-1 bg-[#ffffff] p-5">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
