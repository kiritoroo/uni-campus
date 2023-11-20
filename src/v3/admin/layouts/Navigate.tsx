import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { SpinnerLoading } from "../shared/SpinnerLoading";
import { MouseEvent } from "react";
import { LogOut } from "lucide-react";

const DropdownItem = ({
  children,
  href,
  action,
}: {
  children: React.ReactNode;
  href?: string;
  action?: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div className="group h-full w-full">
      {href ? (
        <Link
          to={href}
          className="block h-full w-full rounded-sm bg-white px-5 py-1 group-hover:bg-gray-100"
          onClick={(e) => {
            action && action(e);
          }}
        >
          <div className=" flex items-center justify-between gap-10 whitespace-nowrap text-left text-sm font-medium">
            {children}
          </div>
        </Link>
      ) : (
        <button
          type="button"
          className="block h-full w-full rounded-sm bg-white px-5 py-1 group-hover:bg-gray-100"
          onClick={(e) => {
            action && action(e);
          }}
        >
          <div className=" flex items-center justify-between gap-10 whitespace-nowrap text-left text-sm font-medium">
            {children}
          </div>
        </button>
      )}
    </div>
  );
};

const DropdownContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute -right-1/2 top-[100%] z-[99999] h-fit w-fit ">
      <div className="h-full w-full bg-transparent pt-2">
        <div className="flex w-fit flex-col items-center justify-center space-y-1 rounded-md border border-gray-200 bg-white p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const Navigate = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();
  const claims = authStore.use.claims();
  const authStoreAction = authStore.use.actions();

  return (
    <div className="flex items-center justify-center">
      {authenticated === undefined && (
        <div>
          <SpinnerLoading width={15} height={15} />
        </div>
      )}
      {authenticated && (
        <div className="group/nav relative">
          <div className="flex cursor-pointer items-center justify-center gap-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-300">
              <span className="text-[12px] font-medium text-slate-500">{claims?.nickname[0]}</span>
            </div>
            <div className="text-sm font-medium">{claims?.nickname}</div>
          </div>
          <div className="pointer-events-none relative h-auto w-auto opacity-0 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
            <DropdownContainer>
              <DropdownItem
                action={() => {
                  authStoreAction.clear();
                }}
              >
                Logout <LogOut className="h-4 w-4 stroke-slate-500" />
              </DropdownItem>
            </DropdownContainer>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navigate;
