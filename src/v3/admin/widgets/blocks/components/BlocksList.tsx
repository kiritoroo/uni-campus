import { TBlockSchema } from "@v3/admin/schemas/block/base";
import { useBlocksStore } from "../hooks/useBlocksStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useMemo } from "react";
import NoResult from "@v3/admin/shared/NoResult";
import EmptyData from "@v3/admin/shared/EmptyData";
import BlockCard from "./BlockCard";

const BlocksList = () => {
  const commonStore = useCommonStore();
  const blocksStore = useBlocksStore();

  const searchValue = commonStore.use.searchValue();
  const blocksData = blocksStore.use.blocksData();

  const searchDataComputed = useMemo<TBlockSchema[] | null>(() => {
    if (searchValue.length === 0 || !blocksData) return null;

    const regex = new RegExp(`^${searchValue.toLowerCase()}.*$`);
    return blocksData?.filter(
      (data) =>
        data.id.toLowerCase().match(regex) ||
        data.name.toLowerCase().match(regex) ||
        data.building_id.toLowerCase().match(regex),
    );
  }, [searchValue]);

  if (searchDataComputed && searchDataComputed.length === 0) {
    return <NoResult searchValue={searchValue} />;
  }

  if (!searchDataComputed && blocksData?.length === 0) {
    return <EmptyData dataName="Building" />;
  }

  return (
    <ul className="grid h-auto w-auto grid-cols-8 gap-x-5 gap-y-10">
      {(searchDataComputed ? searchDataComputed : blocksData)?.map((block) => (
        <li key={block.id} className="col-span-4">
          <BlockCard {...block} />
        </li>
      ))}
    </ul>
  );
};

export default BlocksList;
