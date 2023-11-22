import { cn } from "@Utils/common.utils";
import {
  ArrowUpRight,
  Box,
  Building2,
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  Github,
  Globe,
  LandPlot,
  LayoutDashboard,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { useGlobalStore } from "../hooks/useGlobalStore";

const NavItem = ({
  Icon,
  title,
  href,
  picked,
  minimal,
}: {
  Icon: LucideIcon;
  title: string;
  href: string;
  picked: boolean;
  minimal: boolean;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-start rounded-lg py-2 pl-3 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80",
        { "bg-[#E6E6E2]": picked },
        { "pr-20": !minimal },
      )}
    >
      <Icon className={cn("h-4 w-4 stroke-gem-onyx", { "mr-3": !minimal })} />
      <div
        className={cn("text-sm font-medium", {
          "w-0 overflow-hidden whitespace-nowrap opacity-0": minimal,
        })}
      >
        {title}
      </div>
    </Link>
  );
};

const NavItem2 = ({
  Icon,
  title,
  href,
  minimal,
}: {
  Icon: LucideIcon;
  title: string;
  href: string;
  minimal: boolean;
}) => {
  return (
    <Link
      to={href}
      className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80"
    >
      <div className="flex items-center justify-start">
        <Icon className="mr-3 h-4 w-4 stroke-gem-onyx" />
        <div
          className={cn("text-sm font-medium text-gem-onyx", {
            "w-0 overflow-hidden whitespace-nowrap opacity-0": minimal,
          })}
        >
          {title}
        </div>
      </div>
      <ArrowUpRight
        className={cn("h-4 w-4 stroke-gem-onyx", {
          "w-0 overflow-hidden whitespace-nowrap opacity-0": minimal,
        })}
      />
    </Link>
  );
};

const Sidebar = () => {
  const globalStore = useGlobalStore();
  const authStore = useAuthStore();

  const minimalSidebar = globalStore.use.minimalSidebar();
  const authStoreAction = authStore.use.actions();
  const claims = authStore.use.claims();

  const location = useLocation();

  const handleToggleMinimalSidebar = () => {
    globalStore.setState({ minimalSidebar: !minimalSidebar });
    window.localStorage.setItem(
      "UNI-CAMPUS-X:minimal-sidebar",
      JSON.stringify({ value: !minimalSidebar }),
    );
  };

  return (
    <nav className="group/nav relative h-full w-auto border-r border-gray-100 bg-[#F5F5F5] p-5">
      {minimalSidebar ? (
        <button
          type="button"
          className="group absolute right-0 top-[8%] z-[5] flex h-7 w-7 translate-x-1/2 items-center justify-center rounded-full border border-white bg-gem-onyx p-1 opacity-0 transition-all duration-200 hover:border-gem-onyx hover:bg-white group-hover/nav:opacity-100"
          onClick={handleToggleMinimalSidebar}
        >
          <ChevronRight className="stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      ) : (
        <button
          type="button"
          className="group absolute right-0 top-[8%] z-[5] flex h-7 w-7 translate-x-1/2 items-center justify-center rounded-full border border-white bg-gem-onyx p-1 opacity-0 transition-all duration-200 hover:border-gem-onyx hover:bg-white group-hover/nav:opacity-100"
          onClick={handleToggleMinimalSidebar}
        >
          <ChevronLeft className=" stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      )}

      <div className="flex h-full flex-col items-center justify-between">
        <div className="w-full">
          {!minimalSidebar && (
            <div className="mb-5">
              <div className="flex w-full items-center justify-center pb-3">
                <div className="h-fit w-fit rounded-full bg-gem-onyx p-2">
                  <Box className="block stroke-white" />
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <NavItem
              href="/x"
              Icon={LayoutDashboard}
              title={"Overview"}
              picked={location.pathname === "/x"}
              minimal={minimalSidebar}
            />
            <NavItem
              href="buildings"
              Icon={Building2}
              title={"Buildings"}
              picked={location.pathname === "/x/buildings"}
              minimal={minimalSidebar}
            />
            <NavItem
              href="spaces"
              Icon={LandPlot}
              title={"Spaces"}
              picked={location.pathname === "/x/spaces"}
              minimal={minimalSidebar}
            />
            <NavItem
              href="blocks"
              Icon={Box}
              title={"Blocks"}
              picked={location.pathname === "/x/blocks"}
              minimal={minimalSidebar}
            />
          </div>
        </div>
        <div className="w-full">
          <NavItem2 href="/" Icon={Globe} title={"View site"} minimal={minimalSidebar} />
          <NavItem2
            href="https://github.com/kiritoroo"
            Icon={Github}
            title={"Repository"}
            minimal={minimalSidebar}
          />

          <div className="my-3 w-full border-t border-gray-300" />

          <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[#E6E6E2] active:bg-[#E6E6E2]/80">
            {!minimalSidebar && (
              <div>
                <div className="flex items-center justify-center gap-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                    <span className="text-[12px] font-medium text-gem-onyx">
                      {claims?.nickname[0]}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{claims?.nickname}</div>
                </div>
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  authStoreAction.clear();
                }}
              >
                <LogOut className="h-4 w-4 stroke-gem-onyx" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
