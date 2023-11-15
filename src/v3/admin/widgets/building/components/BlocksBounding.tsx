import { useBuildingStore } from "../hooks/useBuildingStore";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const BlocksBounding = () => {
  const buildingStore = useBuildingStore();
  const glBlocksBounding = buildingStore.use.glBlocksBounding();

  return (
    <div className="relative my-2">
      <div className="text-sm font-normal">
        {(glBlocksBounding ?? []).length > 0 ? (
          <div className="flex items-center justify-start bg-blue-100 px-3 py-2">
            <CheckCircle2 className="mr-2 h-5 w-5 stroke-blue-600" />
            <div className="text-blue-700">
              Building Object contains {glBlocksBounding?.length} blocks
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-start bg-orange-100 px-3 py-2">
            <AlertTriangle className="mr-2 h-5 w-5 stroke-orange-600" />
            <div className="text-orange-700">Building Object does not contain any blocks</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlocksBounding;
