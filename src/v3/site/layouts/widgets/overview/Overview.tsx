import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import _, { over } from "lodash";
import { useEffect, useMemo } from "react";
import { useOverviewStore } from "./hooks/useOverviewStore";
import { cn } from "@Utils/common.utils";

const Overview = () => {
  const globalStore = useGlobalStore();
  const overviewStore = useOverviewStore();

  const blocksData = globalStore.use.blocksData();
  const spacesData = globalStore.use.spacesData();
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
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999999999] overflow-hidden bg-white/50 pl-[350px] backdrop-blur-[5px]">
      <div className="px-12 py-20">
        <div className="flex items-center justify-start">
          {spacesData?.map((space) => {
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
              <div key={groupIndex} className="flex flex-col items-start justify-center gap-y-12">
                {group.map((block, blockIndex) => (
                  <div key={blockIndex} className="flex items-center justify-start gap-x-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gem-sapphire bg-gem-crystal p-2">
                      <div className="text-base font-semibold text-gem-sapphire">
                        {Math.ceil(Math.random() * 50)}
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
  );
};

export default Overview;
