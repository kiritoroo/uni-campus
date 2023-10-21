import { useEffect } from "react";
import { BuildingStoreProvider } from "../contexts/BuildingStoreContext";
import { useBuildingStoreInContext } from "../hooks/useBuildingStoreInContext";

const Child = () => {
  const buildingStore = useBuildingStoreInContext();
  const buildingId = buildingStore.use.buildingUUID();
  // const setBuildingId = buildingStore.use.setBuildingUUID();

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
      <Child />
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
