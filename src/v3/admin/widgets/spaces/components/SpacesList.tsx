import { TSpaceSchema } from "@v3/admin/schemas/space/base";
import { useCommonStore } from "../hooks/useCommonStore";
import { useSpacesStore } from "../hooks/useSpacesStore";
import SpaceCard from "./SpaceCard";
import { useMemo } from "react";
import NoResult from "@v3/admin/shared/NoResult";
import EmptyData from "@v3/admin/shared/EmptyData";

const SpacesList = () => {
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();

  const searchValue = commonStore.use.searchValue();
  const spacesData = spacesStore.use.spacesData();

  const searchDataComputed = useMemo<TSpaceSchema[] | null>(() => {
    if (searchValue.length === 0 || !spacesData) return null;

    const regex = new RegExp(`^${searchValue.toLowerCase()}.*$`);
    return spacesData?.filter(
      (data) => data.id.toLowerCase().match(regex) || data.name.toLowerCase().match(regex),
    );
  }, [searchValue]);

  if (searchDataComputed && searchDataComputed.length === 0) {
    return <NoResult searchValue={searchValue} />;
  }

  if (!searchDataComputed && spacesData?.length === 0) {
    return <EmptyData dataName="Building" />;
  }

  return (
    <div className="grid grid-cols-6">
      <ul className="col-span-6 mb-20 mr-5 mt-5 space-y-3">
        {spacesData?.map((space) => (
          <li key={space.id}>
            <SpaceCard {...space} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpacesList;
