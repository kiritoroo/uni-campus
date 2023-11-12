import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import Navigate from "./Navigate";

const Header = () => {
  const authStore = useAuthStore();
  const authenticated = authStore.use.authenticated();

  return (
    <header className="w-full border-b border-gray-200 px-[50px] py-[10px]">
      <div className="flex items-center justify-between">
        <Link to={"/x"} className="font-medium">
          UNI Campus X
        </Link>
        {authenticated && <Navigate />}
      </div>
    </header>
  );
};

export default Header;
