import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Overview from "./widgets/overview/Overview";

const Layout = () => {
  return (
    <Provider>
      <main className={cn("text-gem-sapphire font-lora relative bg-white antialiased")}>
        <Header />
        <Outlet />
        <Footer />

        <Sidebar />
        <Content />
        <Overview />
      </main>
    </Provider>
  );
};

export default Layout;
