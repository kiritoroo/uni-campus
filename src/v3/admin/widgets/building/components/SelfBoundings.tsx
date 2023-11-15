import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";

const SelfBoundings = () => {
  const buildingStore = useBuildingStore();
  const glSelfBoundings = buildingStore.use.glSelfBoundings();
  const glShowSelfBoundingEffect = buildingStore.use.glShowSelfBoundingEffect();
  const glShowSelfBoundingArround = buildingStore.use.glShowSelfBoundingArround();

  return (
    <div className="relative space-y-2">
      <div className="text-sm font-normal">
        {glSelfBoundings.effect ? (
          <div className="flex w-full items-stretch justify-start">
            <div className="flex grow items-center justify-start bg-green-100 px-3 py-2">
              <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
              <div className="text-green-700">Building Object has 'bounding-effect'</div>
            </div>
            <button
              type="button"
              className="bg-slate-50 px-3"
              onClick={() => {
                buildingStore.setState({ glShowSelfBoundingEffect: !glShowSelfBoundingEffect });
              }}
            >
              {glShowSelfBoundingEffect ? (
                <Eye className="stroke-slate-500" />
              ) : (
                <EyeOff className="stroke-slate-500" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-start bg-red-100 px-3 py-2">
            <AlertCircle className="mr-2 h-5 w-5 stroke-red-600" />
            <div className="text-red-700">Building Object missing 'bounding-effect'</div>
          </div>
        )}
      </div>
      <div className="text-sm font-normal">
        {glSelfBoundings.arround ? (
          <div className="flex w-full items-stretch justify-start">
            <div className="flex grow items-center justify-start bg-green-100 px-3 py-2">
              <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
              <div className="text-green-700">Building Object has 'bounding-arround'</div>
            </div>
            <button
              type="button"
              className="bg-slate-50 px-3"
              onClick={() => {
                buildingStore.setState({ glShowSelfBoundingArround: !glShowSelfBoundingArround });
              }}
            >
              {glShowSelfBoundingArround ? (
                <Eye className="stroke-slate-500" />
              ) : (
                <EyeOff className="stroke-slate-500" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-start bg-red-100 px-3 py-2">
            <AlertCircle className="mr-2 h-5 w-5 stroke-red-600" />
            <div className="text-red-700">Building Object missing 'bounding-arround'</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfBoundings;
