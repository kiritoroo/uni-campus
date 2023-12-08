import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Provider>
      <main className={cn("text-gem-sapphire relative bg-white font-geist antialiased")}>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </Provider>
  );
};

export default Layout;
