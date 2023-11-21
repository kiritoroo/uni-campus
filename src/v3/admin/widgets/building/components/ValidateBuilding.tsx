import SelfBoundings from "./SelfBoundings";
import BlocksBounding from "./BlocksBounding";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import PublishForm from "./PublishForm";
import GroupMerge from "./GroupMerge";

const ValidateBuilding = () => {
  const buildingStore = useBuildingStore();
  const glBuildingObjects = buildingStore.use.glBuildingObjects();
  const canSetPublish = buildingStore.use.canSetPublish();

  return (
    <div className="border border-slate-300">
      {!glBuildingObjects ? (
        <div className="flex items-center justify-center p-5">
          <SpinnerLoading width={25} height={25} />
        </div>
      ) : (
        <>
          <div className="border-b border-b-slate-300 bg-gray-100 px-5 py-2 text-[14px]">
            {!canSetPublish ? (
              <div className="font-medium">Building can't Publish</div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="font-medium">Building can be Publish</div>
                <PublishForm />
              </div>
            )}
          </div>
          <div className="px-5 py-2">
            <GroupMerge />
            <SelfBoundings />
            <BlocksBounding />
          </div>
        </>
      )}
    </div>
  );
};

export default ValidateBuilding;
