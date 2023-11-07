import { Pencil, Save, X } from "lucide-react";
import { FormInput } from "@v3/admin/shared/FormInput";
import ModelScene from "./webgl/ModelScene";
import { useBuildingStore } from "./hooks/useBuildingStore";
import ImagePreview from "./ImagePreview";
import { useCommonStore } from "./hooks/useCommonStore";

const DetailForm = () => {
  const commonStore = useCommonStore();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const buildingStore = useBuildingStore();
  const buildingData = buildingStore.use.buildingData();

  return (
    <div className="relative flex h-full flex-col items-center justify-center border border-gray-300">
      <div className="absolute left-5 top-5 z-[2]">
        {!enableEditDetail ? (
          <button
            className=" bg-gray-100 p-3"
            onClick={() => {
              commonStore.setState({ enableEditDetail: true });
            }}
          >
            <Pencil className="h-4 w-4 stroke-gray-600" />
          </button>
        ) : (
          <div className="flex items-center justify-start gap-4">
            <button
              className=" flex items-center justify-around gap-3 bg-gray-100 px-3 py-2"
              onClick={() => {
                commonStore.setState({ enableEditDetail: false });
              }}
            >
              <X className="h-4 w-4 stroke-gray-600" />{" "}
              <p className="text-sm font-medium">Cancel</p>
            </button>
            <button
              className=" flex items-center justify-around gap-3 bg-gray-100 px-3 py-2"
              onClick={() => {}}
            >
              <Save className="h-4 w-4 stroke-gray-600" />{" "}
              <p className="text-sm font-medium">Save</p>
            </button>
          </div>
        )}
      </div>
      <div className="relative z-[1] w-full grow">
        {buildingData && <ModelScene />}
        {enableEditDetail && (
          <div className="absolute bottom-20 right-5 z-[2]">
            <ImagePreview />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-2 border-t border-gray-300 bg-gray-50 px-8 py-4">
        <div className="flex flex-row items-stretch justify-start gap-x-8">
          <div className="flex h-full flex-col items-start justify-between py-1">
            <p className="text-sm">Name </p>
            <p className="text-sm">Space </p>
            <p className="text-sm">Uses </p>
            <p className="text-sm">Position </p>
            <p className="text-sm">Scale </p>
          </div>
          <div className="space-y-3">
            <FormInput dir="hoz" disabled={!enableEditDetail} value={buildingData?.name} />
            <FormInput dir="hoz" disabled={!enableEditDetail} value={buildingData?.space_id} />
            <FormInput dir="hoz" disabled={!enableEditDetail} value={buildingData?.uses} />
            <div className="flex items-center justify-start gap-2">
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="x"
                value={buildingData?.position.x}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="y"
                value={buildingData?.position.y}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="z"
                value={buildingData?.position.z}
              />
            </div>
            <div className="flex items-center justify-start gap-2">
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="x"
                value={buildingData?.rotation.x}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="y"
                value={buildingData?.rotation.y}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="z"
                value={buildingData?.rotation.z}
              />
            </div>
            <div className="flex items-center justify-start gap-2">
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="x"
                value={buildingData?.scale.x}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="y"
                value={buildingData?.scale.y}
              />
              <FormInput
                dir="hoz"
                disabled={!enableEditDetail}
                label="z"
                value={buildingData?.scale.z}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
