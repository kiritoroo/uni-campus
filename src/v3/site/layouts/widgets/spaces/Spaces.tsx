import { cn } from "@Utils/common.utils";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Spaces = () => {
  const globalStore = useGlobalStore();

  const startExploring = globalStore.use.startExploring();
  const spacesData = globalStore.use.spacesData();
  const showSpaces = globalStore.use.showSpaces();

  const params = useParams();

  useEffect(() => {
    if (!startExploring) return;

    if (params["*"]?.includes("space")) {
      globalStore.setState({ showSidebar: false });
      globalStore.setState({ showSpaces: true });
    }
  }, [startExploring, params]);

  return (
    <div
      className={cn(
        "relative z-[999999999]",
        { "pointer-events-none hidden select-none opacity-0": !showSpaces },
        { "pointer-events-auto visible select-auto opacity-100": showSpaces },
      )}
    >
      <div className="fixed -top-20 bottom-0 left-20 flex items-center justify-center">
        <div className="relative bg-white/60 px-8 py-5 backdrop-blur-[5px] md:px-16 md:py-12">
          <div className="py-5 pb-8 text-center font-geist text-3xl font-semibold uppercase">
            Spaces
          </div>

          <div className="flex flex-col items-start justify-center gap-y-3">
            {spacesData?.map((space) => (
              <div className="group flex w-full cursor-pointer items-stretch justify-start bg-white transition-colors duration-100">
                <div className="flex items-center justify-center border-r border-r-gem-sapphire/50 px-3">
                  <img
                    className="aspect-square h-6 w-6"
                    src={`${process.env.UNI_CAMPUS_API_URL}/${space.icon.url}`}
                  />
                </div>
                <div className="grow px-4 py-3 pr-20 transition-colors duration-100 group-hover:bg-gem-sapphire group-hover:text-white">
                  <div className="text-lg font-medium">{space.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
