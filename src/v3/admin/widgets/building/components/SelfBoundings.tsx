import { useBuildingStore } from "../hooks/useBuildingStore";
import UnValidObject from "./UnValidObject";
import ValidObject from "./ValidObject";

const SelfBoundings = () => {
  const buildingStore = useBuildingStore();
  const glSelfBoundings = buildingStore.use.glSelfBoundings();
  const glShowSelfBoundingBox = buildingStore.use.glShowSelfBoundingBox();
  const glShowSelfBoundingEffect = buildingStore.use.glShowSelfBoundingEffect();
  const glShowSelfBoundingArround = buildingStore.use.glShowSelfBoundingArround();

  return (
    <div className="relative space-y-2">
      <div className="text-sm font-normal">
        {glSelfBoundings.box ? (
          <ValidObject
            message="Building Object has 'bounding-box'"
            isShow={glShowSelfBoundingBox}
            toggleShow={() => {
              buildingStore.setState({ glShowSelfBoundingBox: !glShowSelfBoundingBox });
            }}
          />
        ) : (
          <UnValidObject message="Building Object missing 'bounding-box'" />
        )}
      </div>
      <div className="text-sm font-normal">
        {glSelfBoundings.effect ? (
          <ValidObject
            message="Building Object has 'bounding-effect'"
            isShow={glShowSelfBoundingEffect}
            toggleShow={() => {
              buildingStore.setState({ glShowSelfBoundingEffect: !glShowSelfBoundingEffect });
            }}
          />
        ) : (
          <UnValidObject message="Building Object missing 'bounding-effect'" />
        )}
      </div>
      <div className="text-sm font-normal">
        {glSelfBoundings.arround ? (
          <ValidObject
            message="Building Object has 'bounding-arround'"
            isShow={glShowSelfBoundingArround}
            toggleShow={() => {
              buildingStore.setState({ glShowSelfBoundingArround: !glShowSelfBoundingArround });
            }}
          />
        ) : (
          <UnValidObject message="Building Object missing 'bounding-arround'" />
        )}
      </div>
    </div>
  );
};

export default SelfBoundings;
