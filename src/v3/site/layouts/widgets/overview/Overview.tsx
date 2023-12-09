import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import _, { over } from "lodash";
import { useEffect, useMemo } from "react";
import { useOverviewStore } from "./hooks/useOverviewStore";
import { cn } from "@Utils/common.utils";
import { sortArray } from "@Utils/math.utils";

const Overview = () => {
  const globalStore = useGlobalStore();
  const overviewStore = useOverviewStore();

  const blocksData = globalStore.use.blocksData();
  const spacesData = globalStore.use.spacesData();
  const showOverview = globalStore.use.showOverview();
  const spacePicked = overviewStore.use.spacePicked();

  const groupedBlocks = useMemo(() => {
    return _.chunk(
      blocksData?.filter((block) => block.space?.id === spacePicked?.spaceId) || [],
      6,
    );
  }, [spacePicked]);

  useEffect(() => {
    if (spacesData && spacesData.length > 0) {
      overviewStore.setState({ spacePicked: { spaceId: spacesData[0].id } });
    }
  }, [spacesData]);

  const handleClickSpace = (spaceId: string) => {
    overviewStore.setState({
      spacePicked: {
        spaceId: spaceId,
      },
    });
  };

  return (
    <div className="relative z-[999999999]">
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 top-0 overflow-hidden bg-white/50 pl-[350px] backdrop-blur-[5px]",
          { "pointer-events-none hidden select-none opacity-0": !showOverview },
          { "pointer-events-auto visible select-auto opacity-100": showOverview },
        )}
      >
        <div className="px-8 py-12">
          <div className="flex items-center justify-start">
            {sortArray(spacesData ?? [], (item) => item.order, "asc").map((space) => {
              return (
                <button
                  type="button"
                  key={space.id}
                  className={cn("border-b-[3px] border-b-transparent px-8 py-5", {
                    " border-gem-sapphire": spacePicked?.spaceId === space.id,
                  })}
                  onClick={() => handleClickSpace(space.id)}
                >
                  <div className={cn("text-2xl font-bold")}>{space.name}</div>
                </button>
              );
            })}
          </div>

          <div className="h-auto w-full overflow-hidden pt-20">
            <div className="flex items-start justify-start gap-x-32">
              {groupedBlocks.map((group, groupIndex) => (
                <div key={groupIndex} className="flex flex-col items-start justify-center gap-y-8">
                  {group.map((block, blockIndex) => (
                    <div key={blockIndex} className="flex items-center justify-start gap-x-5">
                      <div className="flex aspect-square items-center justify-center rounded-full bg-white/50 p-3 shadow-sm">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#495363] p-2">
                          <div className="h-5 w-5 text-center font-geist text-sm font-semibold text-white">
                            {block.order}
                          </div>
                        </div>
                      </div>
                      <div className="whitespace-nowrap text-lg font-medium">{block.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
