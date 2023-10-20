import { useEffect } from "react";
import { BuildingStoreProvider } from "../contexts/BuildingStoreContext";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";

const Child = ({ id }: { id: number }) => {
  const buildingStore = useBuildingStoreInContext();
  const buildingId = buildingStore.use.building_uuid();
  const setBuildingId = buildingStore.use.set_building_uuid();

  useEffect(() => {
    // setBuildingId(`test-building-id: ${id}`)
  }, []);

  return <div>Building uuid: {buildingId}</div>;
};

const Parent = () => {
  const id = Math.random();

  return (
    <BuildingStoreProvider>
      <div>TestBuildingStore {id}</div>
      <Child id={id} />
    </BuildingStoreProvider>
  );
};

export const DraftBuildingStore = () => {
  return (
    <>
      <Parent key={1} />
      <Parent key={2} />
    </>
  );
};
