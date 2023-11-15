import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useBuildingStore } from "../hooks/useBuildingStore";

const SelfBoundings = () => {
  const buildingStore = useBuildingStore();
  const glSelfBoundings = buildingStore.use.glSelfBoundings();

  return (
    <div className="relative space-y-2">
      <div className="text-sm font-normal">
        {glSelfBoundings.effect ? (
          <div className="flex items-center justify-start bg-green-100 px-3 py-2">
            <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
            <div className="text-green-700">Building Object has 'bounding-effect'</div>
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
          <div className="flex items-center justify-start bg-green-100 px-3 py-2">
            <CheckCircle2 className="mr-2 h-5 w-5 stroke-green-600" />
            <div className="text-green-700">Building Object has 'bounding-arround'</div>
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
