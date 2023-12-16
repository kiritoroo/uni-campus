import { AlignJustify, Music } from "lucide-react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { cn } from "@Utils/common.utils";
import { Link, useParams } from "react-router-dom";
import AudioControl from "./AudioControl";

const Header = () => {
  const globalStore = useGlobalStore();

  const startExploring = globalStore.use.startExploring();
  const showSidebar = globalStore.use.showSidebar();
  const showOverview = globalStore.use.showOverview();

  const params = useParams();

  const handleCLickMenu = () => {
    globalStore.setState({ showSidebar: true });
    globalStore.setState({ showOverview: false });
    globalStore.setState({ showSpaces: false });
  };

  if (!startExploring) {
    return <></>;
  }

  return (
    <>
      <div
        className={cn(
          "fixed left-[100px] top-[40px] z-[999999999999999] flex w-fit items-center justify-center",
          { "pointer-events-auto select-auto opacity-100": !showOverview },
          { "pointer-events-none select-none opacity-0": showOverview || showSidebar },
        )}
      >
        <div
          className="group cursor-pointer bg-gem-crystal p-3 transition-colors duration-100 hover:bg-gem-sapphire"
          onClick={handleCLickMenu}
        >
          <AlignJustify className="h-5 w-5 stroke-gem-sapphire transition-all duration-200 group-hover:stroke-white" />
        </div>
      </div>

      <header
        className={cn(
          "fixed right-1/2 top-[30px] z-[999999999999999] flex w-fit translate-x-1/2 items-center justify-center",
          { "pointer-events-auto select-auto opacity-100": !showOverview },
          { "pointer-events-none select-none opacity-0": showOverview },
        )}
      >
        <div className="flex items-center justify-center bg-gem-crystal px-10 py-2 drop-shadow-sm">
          <div className="mr-20 whitespace-nowrap p-2 text-lg font-bold text-gem-sapphire">
            UTE Campus
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-transparent px-8 py-2 font-medium text-gem-sapphire transition-colors duration-100">
              <div className="cursor-pointer">Projects</div>
            </div>
            <div
              className={cn(
                "bg-transparent px-8 py-2 font-medium text-gem-sapphire transition-colors duration-200",
                { "bg-gem-sapphire text-white": params["*"] === "team" },
              )}
            >
              <Link to={"/team"} className="cursor-pointer">
                Team
              </Link>
            </div>
            <div
              className={cn(
                "bg-transparent px-8 py-2 font-medium text-gem-sapphire transition-colors duration-200",
                { "bg-gem-sapphire text-white": params["*"] === "contact" },
              )}
            >
              <Link to={"/contact"} className="cursor-pointer">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed right-[100px] top-[35px] z-[999999999999999] flex w-fit items-stretch justify-center space-x-5",
          { "pointer-events-auto select-auto opacity-100": !showOverview },
          { "pointer-events-none select-none opacity-0": showOverview },
        )}
      >
        <AudioControl />
        <div className="group cursor-pointer bg-transparent p-3 transition-colors duration-100 hover:bg-gem-sapphire">
          <div className="font-medium text-gem-sapphire transition-colors duration-200 group-hover:text-white">
            EN
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
