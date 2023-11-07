import { useEffect } from "react";
import ModelScene from "./ModelScene";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { useParams } from "react-router-dom";
import useBuildingServices from "@v3/admin/hooks/useBuildingServices";

const Entry = () => {
  const buildingStore = useBuildingStore();
  const actions = buildingStore.use.actions();

  const { id } = useParams();
  const { detailBuilding } = useBuildingServices();

  const { data } = detailBuilding({ id: id ?? "" });

  useEffect(() => {
    if (data && id) {
      actions.initBuildingData({
        buildingId: id,
        buildingData: data,
      });
    }
  }, [data]);

  return (
    <section className="h-full w-full overflow-hidden">
      <ModelScene />
    </section>
  );
};

export default Entry;
