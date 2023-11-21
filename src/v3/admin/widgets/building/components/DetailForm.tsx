import { Pencil, Save, X } from "lucide-react";
import { FormInput } from "@v3/admin/shared/FormInput";
import GLModelScene from "../webgl/GLModelScene";
import { useBuildingStore } from "../hooks/useBuildingStore";
import ImagePreview from "./ImagePreview";
import { useCommonStore } from "../hooks/useCommonStore";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { cn } from "@Utils/common.utils";
import { usePreviewUploadStore } from "../hooks/usePreviewUploadStore";
import { useForm, FormProvider } from "react-hook-form";
import { TBuildingUpdateSchema, buildingUpdateSchema } from "@v3/admin/schemas/building/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { v4 as uuidv4 } from "uuid";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import DetailField from "./DetailField";
import { FlexRow } from "@v3/admin/shared/Wrapper";

const DetailForm = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const modelUploadStore = useModelUploadStore();
  const previewUploadStore = usePreviewUploadStore();
  const buildingStore = useBuildingStore();

  const modelUploadActions = modelUploadStore.use.actions();
  const previewUploadActions = previewUploadStore.use.actions();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const buildingId = buildingStore.use.buildingId();
  const buildingData = buildingStore.use.buildingData();

  const uniToast = useUniToastify();

  const [updateKey, setUpdateKey] = useState<keyof TBuildingUpdateSchema | null>(null);

  const formMethod = useForm<TBuildingUpdateSchema>({
    resolver: zodResolver(buildingUpdateSchema),
    defaultValues: {
      name: "",
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  });

  const { register, setValue, watch } = formMethod;

  const { updateBuilding } = useBuildingServices();

  const { mutate, isLoading } = updateBuilding({
    onSuccess: (data) => {
      modelUploadActions.resetStore();
      previewUploadActions.resetStore();
      buildingStore.setState({ buildingData: data });
      globalStore.setState({ buildingServiceVersion: uuidv4() });
      uniToast.success({
        desc: `Update building success`,
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: Error(error).message,
      });
    },
    onSettled: () => {
      setUpdateKey(null);
    },
  });

  const onSubmitForm = (key: keyof TBuildingUpdateSchema) => {
    console.log(watch());
    setUpdateKey(key);
    mutate({ id: buildingId!, [key]: watch(key) });
  };
  useEffect(() => {
    if (buildingData && !enableEditDetail) {
      setValue("name", buildingData.name);
      setValue("position", buildingData.position);
      setValue("rotation", buildingData.rotation);
      setValue("scale", buildingData.scale);
    }
  }, [buildingData, enableEditDetail]);

  return (
    <FormProvider {...formMethod}>
      <form className="space-y-5 p-5">
        <DetailField
          type="string"
          defaultValue={buildingData?.id}
          disabled={true}
          label="Building ID"
          desc="The unique identifier assigned to the building, enabling precise identification within the system."
          editable={false}
        />
        <DetailField
          {...register("name")}
          type="string"
          required
          disabled={!enableEditDetail}
          label="Building Name"
          desc="The name field represents the unique identifier or label for a building. It serves as a concise and recognizable name for the building within the system."
          fieldKey={"name"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "name"}
        />
        <DetailField
          label="Object Position"
          desc="Specifies the spatial coordinates of the building within the 3D environment, determining its location."
          fieldKey={"position"}
          editDesc="Please enter valid position of building"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "position"}
          customInput={() => {
            return (
              <FlexRow className="w-2/3 items-center justify-around gap-x-5">
                <FormInput
                  {...register("position.x", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="x"
                />
                <FormInput
                  {...register("position.y", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="y"
                />
                <FormInput
                  {...register("position.z", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="z"
                />
              </FlexRow>
            );
          }}
        />
        <DetailField
          label="Object Rotation"
          desc="Describes the orientation or tilt of the building, indicating its alignment within the overall architectural layout."
          fieldKey={"rotation"}
          editDesc="Please enter valid rotation of building"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "rotation"}
          customInput={() => {
            return (
              <FlexRow className="w-2/3 items-center justify-around gap-x-5">
                <FormInput
                  {...register("rotation.x", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="x"
                />
                <FormInput
                  {...register("rotation.y", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="y"
                />
                <FormInput
                  {...register("rotation.z", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="z"
                />
              </FlexRow>
            );
          }}
        />
        <DetailField
          label="Object Scale"
          desc="Represents the scaling factor applied to the building, influencing its size or dimensions within the virtual space."
          fieldKey={"scale"}
          editDesc="Please enter valid scale of building"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "scale"}
          customInput={() => {
            return (
              <FlexRow className="w-2/3 items-center justify-around gap-x-5">
                <FormInput
                  {...register("scale.x", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="x"
                />
                <FormInput
                  {...register("scale.y", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="y"
                />
                <FormInput
                  {...register("scale.z", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="z"
                />
              </FlexRow>
            );
          }}
        />
      </form>
      <form
        className={cn(
          "relative my-12 flex h-full flex-col items-center justify-center border border-gray-300",
          {
            "border-blue-300": enableEditDetail,
          },
        )}
      >
        <div className="relative z-[1] w-full grow">
          {buildingData && <GLModelScene />}
          {enableEditDetail && (
            <div className="absolute bottom-20 right-5 z-[2]">
              <ImagePreview />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default DetailForm;
