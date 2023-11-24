import { useBuildingStore } from "../hooks/useBuildingStore";
import ValidObject from "./ValidObject";
import UnValidObject from "./UnValidObject";

const BlocksBounding = () => {
  const buildingStore = useBuildingStore();
  const glBlocksBounding = buildingStore.use.glBlocksBounding();
  const glShowBlocksBounding = buildingStore.use.glShowBlocksBounding();

  return (
    <div className="relative my-2">
      <div className="text-sm font-normal">
        {(glBlocksBounding ?? []).length > 0 ? (
          <ValidObject
            message={`Building Object contains ${glBlocksBounding?.length} bounding-block`}
            isShow={glShowBlocksBounding}
            toggleShow={() => {
              buildingStore.setState({ glShowBlocksBounding: !glShowBlocksBounding });
            }}
          />
        ) : (
          <UnValidObject message="Building Object does not contain any bounding-block" />
        )}
      </div>
    </div>
  );
};

export default BlocksBounding;
