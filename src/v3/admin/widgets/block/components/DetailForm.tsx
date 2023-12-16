import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useGalleryUploadStore } from "../stores/useGalleryUploadStore";
import { useBlockStore } from "../hooks/useBlockStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { TBlockUpdateSchema, blockUpdateSchema } from "@v3/admin/schemas/block/update";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { v4 as uuidv4 } from "uuid";
import DetailField from "../../building/components/DetailField";
import { FormSelect } from "@v3/admin/shared/FormSelect";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { FormInput } from "@v3/admin/shared/FormInput";
import DropGallery from "./DropGallery";
import GalleryPreview from "./GalleryPreview";

const DetailForm = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const galleryUploadStore = useGalleryUploadStore();
  const blockStore = useBlockStore();

  const buildingServiceVersion = globalStore.use.buildingServiceVersion();
  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
  const galleryUploadAction = galleryUploadStore.use.actions();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const blockId = blockStore.use.blockId()!;
  const blockData = blockStore.use.blockData()!;

  const uniToast = useUniToastify();

  const [updateKey, setUpdateKey] = useState<keyof TBlockUpdateSchema | null>(null);

  const formMethod = useForm<TBlockUpdateSchema>({
    resolver: zodResolver(blockUpdateSchema),
    defaultValues: {
      slug: "",
      name: "",
      space_id: "",
      uses: "",
      direction_url: "",
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      marker_position: {
        x: 0,
        y: 0,
        z: 0,
      },
      order: -1,
    },
  });

  const { control, register, setValue, watch } = formMethod;

  const { detailBuilding } = useBuildingServices();
  const { listSpaces } = useSpaceServices();

  const { data: buildingData } = detailBuilding(buildingServiceVersion, {
    id: blockData?.building_id,
  });
  const { data: spacesData } = listSpaces(spaceServiceVersion);

  const { updateBlock } = useBlockServices();

  const { mutate, isLoading } = updateBlock({
    onSuccess: (data) => {
      galleryUploadAction.resetStore();
      blockStore.setState({ blockData: data });
      globalStore.setState({ blockServicesVersion: uuidv4() });
      uniToast.success({
        desc: `Update block success`,
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: error.message,
      });
    },
    onSettled: () => {
      setUpdateKey(null);
    },
  });

  const onSubmitForm = (key: keyof TBlockUpdateSchema) => {
    setUpdateKey(key);
    mutate({ id: blockId!, [key]: watch(key) });
  };

  useEffect(() => {
    if (blockData && !enableEditDetail) {
      setValue("slug", blockData.slug);
      setValue("name", blockData.name);
      blockData.space_id && setValue("space_id", blockData.space_id);
      setValue("uses", blockData.uses);
      setValue("direction_url", blockData.direction_url);
      setValue("coordinate", blockData.coordinate);
      setValue("marker_position", blockData.marker_position);
      setValue("order", blockData.order);
    }
  }, [blockData, enableEditDetail]);

  return (
    <FormProvider {...formMethod}>
      <form className="space-y-5 py-5">
        <DetailField
          type="string"
          defaultValue={blockData?.id}
          disabled={true}
          label="Block ID"
          desc="A unique identifier for each block, serving to distinguish and identify it from other blocks."
          editable={false}
        />
        <DetailField
          {...register("slug")}
          required
          disabled={!enableEditDetail}
          label="Block Slug"
          desc="A slug of block, provides a concise and unique identifier, typically used for URLs."
          fieldKey={"slug"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "slug"}
        />
        <DetailField
          type="string"
          defaultValue={blockData?.obj_name}
          disabled={true}
          label="Object Name"
          desc="The name of the 3D object associated with the block, providing information about the visual representation or model."
          editable={false}
        />
        <DetailField
          type="string"
          defaultValue={buildingData?.name}
          disabled={true}
          label="Building"
          desc="Identifies the building to which the block belongs, establishing a connection between the block and its associated structure."
          editable={false}
        />
        <DetailField
          label="Gallery"
          desc=" An array containing images related to the building block. "
          fieldKey={"gallery"}
          customInput={() => (
            <div className="my-2 aspect-[4/1.5] h-auto w-2/4 overflow-hidden rounded-md border border-gray-300">
              {enableEditDetail ? <DropGallery /> : <GalleryPreview />}
            </div>
          )}
          editDesc="Supported image format .webp"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "gallery"}
        />
        <DetailField
          {...register("name")}
          required
          disabled={!enableEditDetail}
          label="Block Name"
          desc="A distinctive name for the block, typically a string describing its meaning or function."
          fieldKey={"name"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "name"}
        />
        <DetailField
          label="Space"
          desc="The identifier of the space to which the block belongs, interacting with spaces within the system."
          fieldKey={"space_id"}
          customInput={() => (
            <Controller
              control={control}
              name="space_id"
              render={({ field: { value, onChange } }) => (
                <FormSelect
                  required
                  initOption={
                    !enableEditDetail
                      ? {
                          key: blockId!,
                          value: spacesData?.find((space) => space.id === blockData?.space_id)
                            ?.name!,
                        }
                      : undefined
                  }
                  options={
                    spacesData
                      ? spacesData.map((space) => ({ key: space.id, value: space.name }))
                      : []
                  }
                  onChange={onChange}
                  disabled={!enableEditDetail}
                />
              )}
            />
          )}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "space_id"}
        />
        <DetailField
          {...register("uses")}
          required
          disabled={!enableEditDetail}
          label="Uses"
          desc="Describes the main purpose or use of the block, providing insights into its intended functionality."
          fieldKey={"uses"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "uses"}
        />
        <DetailField
          {...register("direction_url")}
          required
          disabled={!enableEditDetail}
          label="Direction URL"
          desc="Path or URL related to guidance or detailed information about the block."
          fieldKey={"direction_url"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "direction_url"}
        />
        <DetailField
          label="Map Coordinate"
          desc="Information about the spatial location of the block on a global scale, including values such as latitude, longitude, and altitude."
          fieldKey={"coordinate"}
          editDesc="Please enter valid coordinate"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "coordinate"}
          customInput={() => {
            return (
              <FlexRow className="w-2/3 items-center justify-around gap-x-5">
                <FormInput
                  {...register("coordinate.latitude", { valueAsNumber: true })}
                  dir="hoz"
                  child
                  label="lat"
                  type="number"
                  step={0.00001}
                  required
                  disabled={!enableEditDetail}
                  autoComplete={"on"}
                />
                <FormInput
                  {...register("coordinate.longitude", { valueAsNumber: true })}
                  dir="hoz"
                  child
                  label="long"
                  type="number"
                  step={0.00001}
                  required
                  disabled={!enableEditDetail}
                  autoComplete={"on"}
                />
              </FlexRow>
            );
          }}
        />
        <DetailField
          label="Marker Position"
          desc="The position of the marker relative to the block in the global space, often used to display a point on a map."
          fieldKey={"marker_position"}
          editDesc="Please enter valid position of building"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "marker_position"}
          customInput={() => {
            return (
              <FlexRow className="w-2/3 items-center justify-around gap-x-5">
                <FormInput
                  {...register("marker_position.x", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="x"
                />
                <FormInput
                  {...register("marker_position.y", { valueAsNumber: true })}
                  type="number"
                  step={0.00001}
                  required
                  dir="hoz"
                  disabled={!enableEditDetail}
                  label="y"
                />
                <FormInput
                  {...register("marker_position.z", { valueAsNumber: true })}
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
          {...register("order")}
          required
          disabled={!enableEditDetail}
          label="Block Order"
          desc="A order of block."
          fieldKey={"order"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "order"}
        />
      </form>
    </FormProvider>
  );
};

export default DetailForm;
