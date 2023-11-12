import { useAuthStore } from "../hooks/useAuthStore";
import { SpinnerLoading } from "../shared/SpinnerLoading";

const Header = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();
  const claims = authStore.use.claims();

  return (
    <header className="w-full border-b border-gray-200 px-[50px] py-[10px]">
      <div className="flex items-center justify-between">
        <div className="font-medium">UNI Campus X</div>
        <div className="flex items-center justify-center">
          {authenticated === undefined && (
            <div>
              <SpinnerLoading width={15} height={15} />
            </div>
          )}
          {authenticated && (
            <div className="flex items-center justify-center gap-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-blue-200">
                <span className="text-[12px] font-semibold text-slate-500">
                  {claims?.nickname[0]}
                </span>
              </div>
              <div className="text-sm font-medium">{claims?.nickname}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
