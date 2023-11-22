import { useBuildingStore } from "../hooks/useBuildingStore";
import UnValidObject from "./UnValidObject";
import ValidObject from "./ValidObject";

const GroupMerge = () => {
  const buildingStore = useBuildingStore();
  const glGroupMerge = buildingStore.use.glGroupMerge();
  const glShowGroupMerge = buildingStore.use.glShowGroupMerge();

  return (
    <div className="relative my-2">
      <div className="text-sm font-normal">
        {glGroupMerge ? (
          <ValidObject
            message="building Object has group-merge"
            isShow={glShowGroupMerge}
            toggleShow={() => {
              buildingStore.setState({ glShowGroupMerge: !glShowGroupMerge });
            }}
          />
        ) : (
          <UnValidObject message="Building Object missing group-merge" />
        )}
      </div>
    </div>
  );
};

export default GroupMerge;
