import { FormInput } from "@v3/admin/shared/FormInput";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
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
import ImagePreview from "./ImagePreview";
import DropPreview from "./DropPreview";
import GLModelScene from "../webgl/GLModelScene";
import ValidateBuilding from "./ValidateBuilding";

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
      <form className="space-y-5 py-5">
        <DetailField
          type="string"
          defaultValue={buildingData?.id}
          disabled={true}
          label="Building ID"
          desc="The unique identifier assigned to the building, enabling precise identification within the system."
          editable={false}
        />
        <DetailField
          label="Building Model"
          desc="This 3D model is a digital representation that allows for a more immersive and detailed exploration of the building's design."
          fieldKey={"model_file"}
          customInput={() => (
            <FlexRow className="relative my-2">
              <div className="relative mr-5 aspect-[4/2] h-auto w-1/2 overflow-hidden rounded-md  border border-gray-300">
                <GLModelScene />
              </div>
              <div className="relative w-1/2">
                <ValidateBuilding />
              </div>
            </FlexRow>
          )}
          editDesc="Supported 3d model format .gltf, glb"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "model_file"}
        />
        <DetailField
          label="Building Preview"
          desc="This image typically serves as a quick reference or overview, giving users a glimpse of the building's appearance."
          fieldKey={"preview_file"}
          customInput={() => (
            <div className="my-2 aspect-[4/2] h-auto w-2/4 overflow-hidden rounded-md border border-gray-300">
              {enableEditDetail ? <DropPreview /> : <ImagePreview />}
            </div>
          )}
          editDesc="Supported image format .webp"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "preview_file"}
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
    </FormProvider>
  );
};

export default DetailForm;
