import { cn } from "@Utils/common.utils";
import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSpacesStore } from "./hooks/useSpacesStore";
import { sortArray } from "@Utils/math.utils";
import { X } from "lucide-react";

const Spaces = () => {
  const globalStore = useGlobalStore();
  const spaceStore = useSpacesStore();

  const startExploring = globalStore.use.startExploring();
  const spacesData = globalStore.use.spacesData();
  const showSpaces = globalStore.use.showSpaces();
  const spacePicked = spaceStore.use.spacePicked();

  const navigate = useNavigate();
  const params = useParams();

  const handleOnClose = () => {
    globalStore.setState({ showSpaces: false });
    spaceStore.setState({ spacePicked: null });
    navigate("/");
  };

  useEffect(() => {
    if (!startExploring) return;

    if (params["*"]?.includes("space")) {
      globalStore.setState({ showSidebar: false });
      globalStore.setState({ showOverview: false });
      globalStore.setState({ showSpaces: true });
    } else {
      globalStore.setState({ showSpaces: false });
    }
  }, [startExploring, params]);

  useEffect(() => {
    if (!startExploring) return;

    if (!params["*"]?.includes("space")) {
      spaceStore.setState({ spacePicked: null });
      return;
    }

    const spaceSlug = params["*"];
    const spaceDataBySlug = spacesData?.find((item) => item.slug === `/${spaceSlug}`);

    if (!spaceDataBySlug) {
      spaceStore.setState({ spacePicked: null });
      return;
    }

    spaceStore.setState({ spacePicked: { spaceId: spaceDataBySlug.id } });
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
          <div className="absolute right-5 top-5">
            <button className="rounded-full bg-gem-sapphire p-2" onClick={handleOnClose}>
              <X className="h-4 w-4 stroke-white stroke-[2px]" />
            </button>
          </div>

          <div className="py-5 pb-8 text-center font-geist text-3xl font-bold uppercase">
            Spaces
          </div>

          <div className="flex flex-col items-start justify-center gap-y-3">
            {sortArray(spacesData ?? [], (item) => item.order, "asc").map((space) => (
              <Link
                key={space.id}
                to={space.slug}
                className="group flex w-full cursor-pointer items-stretch justify-start bg-white transition-colors duration-100"
              >
                <div className="flex items-center justify-center border-r border-r-gem-sapphire/50 px-3">
                  <img
                    className="aspect-square h-6 w-6"
                    src={`${process.env.UNI_CAMPUS_API_URL}/${space.icon.url}`}
                  />
                </div>
                <div
                  className={cn(
                    "grow px-4 py-3 pr-20 transition-colors duration-100 group-hover:bg-gem-sapphire group-hover:text-white",
                    { "bg-gem-sapphire text-white": spacePicked?.spaceId === space.id },
                  )}
                >
                  <div className="text-base font-semibold">{space.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
