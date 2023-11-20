import { cn } from "@Utils/common.utils";
import {
  ArrowUpRight,
  Box,
  Building2,
  Github,
  Globe,
  LandPlot,
  LayoutDashboard,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

const NavItem = ({
  Icon,
  title,
  href,
  picked,
}: {
  Icon: LucideIcon;
  title: string;
  href: string;
  picked: boolean;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-start rounded-lg py-2 pl-3 pr-20 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80",
        { "bg-[#E6E6E2]": picked },
      )}
    >
      <Icon className="stroke-gem-onyx mr-3 h-4 w-4" />
      <div className="text-sm font-medium">{title}</div>
    </Link>
  );
};

const NavItem2 = ({ Icon, title, href }: { Icon: LucideIcon; title: string; href: string }) => {
  return (
    <Link
      to={href}
      className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80"
    >
      <div className="flex items-center justify-start">
        <Icon className="stroke-gem-onyx mr-3 h-4 w-4" />
        <div className="text-gem-onyx text-sm font-medium">{title}</div>
      </div>
      <ArrowUpRight className="stroke-gem-onyx h-4 w-4" />
    </Link>
  );
};

const Sidebar = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();
  const authStoreAction = authStore.use.actions();
  const claims = authStore.use.claims();

  const location = useLocation();

  return (
    <nav className="h-full w-auto border-r border-gray-100 bg-[#F5F5F5] p-5">
      <div className="flex h-full flex-col items-center justify-between">
        <div className="w-full">
          <div className="mb-5">
            <div className="flex w-full items-center justify-center pb-3">
              <div className="bg-gem-onyx h-fit w-fit rounded-full p-2">
                <Box className="block stroke-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <NavItem
              href="/x"
              Icon={LayoutDashboard}
              title={"Overview"}
              picked={location.pathname === "/x"}
            />
            <NavItem
              href="buildings"
              Icon={Building2}
              title={"Buildings"}
              picked={location.pathname === "/x/buildings"}
            />
            <NavItem
              href="spaces"
              Icon={LandPlot}
              title={"Spaces"}
              picked={location.pathname === "/x/spaces"}
            />
            <NavItem
              href="blocks"
              Icon={Box}
              title={"Blocks"}
              picked={location.pathname === "/x/blocks"}
            />
          </div>
        </div>
        <div className="w-full">
          <NavItem2 href="/" Icon={Globe} title={"View site"} />
          <NavItem2 href="https://github.com/kiritoroo" Icon={Github} title={"Repository"} />

          <div className="my-3 w-full border-t border-gray-300" />

          <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80">
            <div>
              <div className="flex items-center justify-center gap-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                  <span className="text-gem-onyx text-[12px] font-medium">
                    {claims?.nickname[0]}
                  </span>
                </div>
                <div className="text-sm font-medium">{claims?.nickname}</div>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  authStoreAction.clear();
                }}
              >
                <LogOut className="stroke-gem-onyx h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
