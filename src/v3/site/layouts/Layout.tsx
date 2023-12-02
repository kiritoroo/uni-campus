import Provider from "./Provider";
import { cn } from "@Utils/common.utils";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Provider>
      <main className={cn("bg-white font-geist text-gem-onyx antialiased")}>
        <Outlet />
      </main>
    </Provider>
  );
};

export default Layout;
