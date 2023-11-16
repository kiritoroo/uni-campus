import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";

const ValidObject = ({
  message,
  isShow,
  toggleShow,
}: {
  message: string;
  isShow: boolean;
  toggleShow: () => void;
}) => {
  return (
    <div className="flex w-full items-stretch justify-start">
      <div className="flex grow items-center justify-start bg-green-100 px-3 py-2">
        <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
        <div className="text-green-700">{message}</div>
      </div>
      <button type="button" className="bg-slate-50 px-3" onClick={toggleShow}>
        {isShow ? <Eye className="stroke-slate-500" /> : <EyeOff className="stroke-slate-500" />}
      </button>
    </div>
  );
};

const UnValidObject = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-start bg-red-100 px-3 py-2">
      <AlertCircle className="mr-2 h-5 w-5 stroke-red-600" />
      <div className="text-red-700">{message}</div>
    </div>
  );
};

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
