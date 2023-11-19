import BuildingCard from "./BuildingCard";
import { useBuildingsStore } from "../hooks/useBuildingsStore";

const BuildingsList = () => {
  const buildingsStore = useBuildingsStore();
  const buildingsData = buildingsStore.use.buildingsData();

  return (
    <ul className="my-5 grid h-auto w-auto grid-cols-12 gap-x-5 gap-y-10 bg-white">
      {buildingsData?.map((building) => (
        <li key={building.id} className="col-span-4">
          <BuildingCard {...building} />
        </li>
      ))}
    </ul>
  );
};

export default BuildingsList;
