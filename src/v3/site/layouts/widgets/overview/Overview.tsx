import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import _ from "lodash";

const Overview = () => {
  const globalStore = useGlobalStore();
  const blocksData = globalStore.use.blocksData();

  const groupedBlocks = _.chunk(blocksData || [], 6);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999999999] overflow-hidden bg-white/50 pl-[350px] backdrop-blur-[5px]">
      <div className="h-full w-full overflow-hidden">
        <div className="flex items-start justify-start gap-x-32">
          {groupedBlocks.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col items-start justify-center">
              {group.map((block, blockIndex) => (
                <div key={blockIndex}>
                  <div className="whitespace-nowrap text-lg font-medium">{block.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
