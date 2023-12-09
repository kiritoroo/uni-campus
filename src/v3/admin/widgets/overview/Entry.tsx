import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import StatsCard from "@v3/admin/shared/StatsCard";
import { FlexRow, WidgetSection, WidgetTitle } from "@v3/admin/shared/Wrapper";
import { Box, Building2, Diamond } from "lucide-react";
import { useMemo } from "react";

const Entry = () => {
  const globalStore = useGlobalStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const spaceServiceVersion = globalStore.use.spaceServicesVersion();

  const { listBuildings } = useBuildingServices();
  const { listBlocks } = useBlockServices();
  const { listSpaces } = useSpaceServices();

  const { data: buildingsData, isLoading: isFetchBuildings } =
    listBuildings(buildingServiceVersion);
  const { data: blocksData, isLoading: isFetchBlocks } = listBlocks(spaceServiceVersion);
  const { data: spacesData, isLoading: isFetchSpaces } = listSpaces(spaceServiceVersion);

  const buildingsCount = useMemo<number>(() => {
    return buildingsData?.length ?? 0;
  }, [buildingsData]);
  const blocksCount = useMemo<number>(() => {
    return blocksData?.length ?? 0;
  }, [blocksData]);
  const spacesCount = useMemo<number>(() => {
    return spacesData?.length ?? 0;
  }, [spacesData]);

  return (
    <WidgetSection>
      <FlexRow className="mb-5 justify-between pr-20">
        <WidgetTitle>Campus Overview</WidgetTitle>
      </FlexRow>
      <div className="px-8 pt-5">
        <div className="grid grid-cols-6 gap-x-8 gap-y-12">
          <StatsCard
            className="col-span-2"
            value={buildingsCount.toString()}
            title="Total Buildings"
            Icon={Building2}
            isLoading={isFetchBuildings}
          />
          <StatsCard
            className="col-span-2"
            value={blocksCount.toString()}
            title="Total Blocks"
            Icon={Box}
            isLoading={isFetchBlocks}
          />
          <StatsCard
            className="col-span-2"
            value={spacesCount.toString()}
            title="Total Spaces"
            Icon={Diamond}
            isLoading={isFetchSpaces}
          />
        </div>
      </div>
    </WidgetSection>
  );
};

export default Entry;
