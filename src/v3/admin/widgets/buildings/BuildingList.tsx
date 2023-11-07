import useBuildingServices from "@v3/admin/hooks/useBuildingServices";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import BuildingCard from "./BuildingCard";
import { TBuildingSchema } from "@v3/admin/schemas/building-schema";

const BuildingsList = () => {
  const { listBuildings } = useBuildingServices();
  const { data, isLoading, isError } = listBuildings();

  const [displayData, setDisplayData] = useState<TBuildingSchema[]>([]);

  const handleOnDeletedBuilding = ({ id }: Pick<TBuildingSchema, "id">) => {
    setDisplayData((before) =>
      produce(before, (draft) => {
        if (draft) {
          const indexToRemove = draft.findIndex((building) => building.id === id);
          if (indexToRemove !== -1) {
            draft.splice(indexToRemove, 1);
          }
        }
      }),
    );
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setDisplayData(data);
    }
  }, [isLoading, isError, data]);

  return (
    <div className="h-full w-full overflow-auto">
      {isLoading && <SpinnerLoading width={50} height={50} />}
      {data && (
        <ul className="mb-20 grid h-auto w-auto grid-cols-12 gap-x-5 gap-y-10 bg-white">
          {displayData.map((building) => (
            <li key={building.id} className="col-span-3">
              <BuildingCard {...building} onDeletedBuilding={handleOnDeletedBuilding} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuildingsList;
