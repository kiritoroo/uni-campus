import { Outlet } from "react-router-dom";
import Navbar from "@v3/admin/containers/Navbar";
import Header from "@v3/admin/containers/Header";
import Footer from "@v3/admin/containers/Footer";

const Layout = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Header />
      <div className="h-full w-full flex-1 bg-[#F2F2F2] p-10">
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
