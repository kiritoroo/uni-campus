import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Overview from "./widgets/overview/Overview";
import { OverviewStoreProvider } from "./widgets/overview/contexts/OverviewStoreContext";
import Team from "./widgets/team/Team";
import Contact from "./widgets/contact/Contact";
import Spaces from "./widgets/spaces/Spaces";

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

        <OverviewStoreProvider>
          <Overview />
        </OverviewStoreProvider>

        <Spaces />
      </main>
    </Provider>
  );
};

export default Layout;
