import BuildingCard from "./BuildingCard";
import { useBuildingsStore } from "../hooks/useBuildingsStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useMemo } from "react";
import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import NoResult from "./NoResult";

const BuildingsList = () => {
  const commonStore = useCommonStore();
  const buildingsStore = useBuildingsStore();

  const searchValue = commonStore.use.searchValue();
  const buildingsData = buildingsStore.use.buildingsData();

  const searchData = useMemo<TBuildingSchema[] | null>(() => {
    if (searchValue.length === 0 || !buildingsData) return null;

    const regex = new RegExp(`^${searchValue.toLowerCase()}.*$`);
    return buildingsData?.filter(
      (data) => data.id.toLowerCase().match(regex) || data.name.toLowerCase().match(regex),
    );
  }, [searchValue]);

  if (searchData && searchData.length === 0) {
    return <NoResult searchValue={searchValue} />;
  }

  return (
    <ul className="grid h-auto w-auto grid-cols-12 gap-x-5 gap-y-10 bg-white">
      {(searchData ? searchData : buildingsData)?.map((building) => (
        <li key={building.id} className="col-span-4">
          <BuildingCard {...building} />
        </li>
      ))}
    </ul>
  );
};

export default BuildingsList;
