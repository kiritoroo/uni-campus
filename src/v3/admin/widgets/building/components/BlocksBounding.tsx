import { useBuildingStore } from "../hooks/useBuildingStore";
import { AlertTriangle, CheckCircle2, Eye, EyeOff } from "lucide-react";

const BlocksBounding = () => {
  const buildingStore = useBuildingStore();
  const glBlocksBounding = buildingStore.use.glBlocksBounding();
  const glShowBlocksBoundings = buildingStore.use.glShowBlocksBoundings();

  return (
    <div className="relative my-2">
      <div className="text-sm font-normal">
        {(glBlocksBounding ?? []).length > 0 ? (
          <div className="flex w-full items-stretch justify-start">
            <div className="flex grow items-center justify-start bg-blue-100 px-3 py-2">
              <CheckCircle2 className="mr-2 h-5 w-5 stroke-blue-600" />
              <div className="text-blue-700">
                Building Object contains <strong>{glBlocksBounding?.length}</strong>{" "}
                'bounding-block'
              </div>
            </div>
            <button
              type="button"
              className="bg-slate-50 px-3"
              onClick={() => {
                buildingStore.setState({ glShowBlocksBoundings: !glShowBlocksBoundings });
              }}
            >
              {glShowBlocksBoundings ? (
                <Eye className="stroke-slate-500" />
              ) : (
                <EyeOff className="stroke-slate-500" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-start bg-orange-100 px-3 py-2">
            <AlertTriangle className="mr-2 h-5 w-5 stroke-orange-600" />
            <div className="text-orange-700">
              Building Object does not contain any 'bounding-block'
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlocksBounding;
