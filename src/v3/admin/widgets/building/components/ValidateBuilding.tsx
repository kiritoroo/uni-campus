import SelfBoundings from "./SelfBoundings";
import BlocksBounding from "./BlocksBounding";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import GroupMerge from "./GroupMerge";

const ValidateBuilding = () => {
  const buildingStore = useBuildingStore();
  const glBuildingObjects = buildingStore.use.glBuildingObjects();
  const canSetPublish = buildingStore.use.canSetPublish();

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      {!glBuildingObjects ? (
        <div className="flex items-center justify-center p-5">
          <SpinnerLoading width={25} height={25} />
        </div>
      ) : (
        <>
          <div className="border-b border-b-gray-300 bg-[#FAFAFA] px-5 py-3 text-[14px]">
            {!canSetPublish ? (
              <div className="font-medium">Building can't Publish</div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="font-medium">Building can be Publish</div>
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
