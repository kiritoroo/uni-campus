import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <Provider>
      <main className={cn("relative bg-white font-geist text-gem-onyx antialiased")}>
        <Header />
        <Outlet />
      </main>
    </Provider>
  );
};

export default Layout;
