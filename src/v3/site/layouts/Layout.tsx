import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Overview from "./widgets/overview/Overview";
import { OVerviewStoreProvider } from "./widgets/overview/contexts/OverviewStoreContext";
import Team from "./widgets/team/Team";
import Contact from "./widgets/contact/Contact";

const Layout = () => {
  return (
    <Provider>
      <main className={cn("relative bg-white font-lora text-gem-sapphire antialiased")}>
        <Header />
        <Outlet />
        <Footer />

        <Team />
        <Contact />

        <Sidebar />
        <Content />

        <OVerviewStoreProvider>
          <Overview />
        </OVerviewStoreProvider>
      </main>
    </Provider>
  );
};

export default Layout;
