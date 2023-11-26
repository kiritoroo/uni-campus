import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useBlocksStore } from "../hooks/useBlocksStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TBlockCreateSchema, blockCreateSchema } from "@v3/admin/schemas/block/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { FormInput } from "@v3/admin/shared/FormInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { FormSelect } from "@v3/admin/shared/FormSelect";
import DropGallery from "./DropGallery";
import Button from "@v3/admin/shared/Button";

const CreateForm = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const blocksStore = useBlocksStore();

  const [searchParams, _] = useSearchParams();
  const spObjName = searchParams.get("obj-name") ?? "";
  const spBuildingId = searchParams.get("building-id") ?? "";
  const spBuildingName = searchParams.get("building-name") ?? "";

  const spaceServiceVersion = globalStore.use.spaceServicesVersion();
  const actions = blocksStore.use.actions();

  const uniToast = useUniToastify();

  const { listSpaces } = useSpaceServices();
  const { data: spacesData, isLoading: isFetchSpace } = listSpaces(spaceServiceVersion);

  const formMethod = useForm<TBlockCreateSchema>({
    resolver: zodResolver(blockCreateSchema),
    defaultValues: {
      name: "",
      obj_name: "",
      building_id: "",
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
    },
  });

  const { control, register, watch, handleSubmit, setValue } = formMethod;

  const { createBlock } = useBlockServices();

  const { mutate, isLoading } = createBlock({
    onSuccess: (data) => {
      commonStore.setState({ showCreateModal: false });
      actions.addBlock({ blockData: data });
      uniToast.success({
        desc: "Create block success",
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: Error(error).message,
      });
    },
  });

  const onSubmitForm = () => {
    mutate({ ...watch() });
  };

  useEffect(() => {
    setValue("obj_name", spObjName);
    setValue("building_id", spBuildingId);
  }, []);

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="py-4">
        <div className="grid h-full w-full grid-cols-5 gap-8">
          <div className="col-span-2 space-y-2">
            <FormInput
              defaultValue={spObjName}
              className="bg-[#FAFAFA]/20"
              label="Object Name"
              type="text"
              required
              autoComplete={"on"}
              disabled
            />
            <FormInput
              defaultValue={spBuildingName}
              className="bg-[#FAFAFA]/20"
              label="Building"
              type="text"
              required
              autoComplete={"on"}
              disabled
            />
            <FormInput
              {...register("name")}
              className="bg-[#FAFAFA]"
              label="Block Name"
              type="text"
              required
              autoComplete={"on"}
            />
            <Controller
              control={control}
              name="space_id"
              render={({ field: { onChange } }) => (
                <FormSelect
                  options={
                    spacesData
                      ? spacesData.map((space) => ({ key: space.id, value: space.name }))
                      : []
                  }
                  className="bg-[#FAFAFA]"
                  label="Space"
                  required
                  onChange={onChange}
                />
              )}
            />
            <FormInput
              {...register("uses")}
              className="bg-[#FAFAFA]"
              label="Block Uses"
              type="text"
              required
              autoComplete={"on"}
            />
            <FormInput
              {...register("direction_url")}
              className="bg-[#FAFAFA]"
              label="Map Direction"
              type="text"
              required
              autoComplete={"on"}
            />
          </div>
          <div className="col-span-3 space-y-2">
            <div className="py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Map Coordinate
              </p>
              <div className="flex items-center justify-start gap-3">
                <FormInput
                  {...register("coordinate.latitude", { valueAsNumber: true })}
                  className="bg-[#FAFAFA]"
                  dir="hoz"
                  child
                  label="lat"
                  type="number"
                  step={0.00001}
                  required
                  autoComplete={"on"}
                />
                <FormInput
                  {...register("coordinate.longitude", { valueAsNumber: true })}
                  className="bg-[#FAFAFA]"
                  dir="hoz"
                  child
                  label="long"
                  type="number"
                  step={0.00001}
                  required
                  autoComplete={"on"}
                />
              </div>
            </div>
            <div className="py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Marker Position
              </p>
              <div className="flex items-center justify-start gap-3">
                <FormInput
                  {...register("marker_position.x", { valueAsNumber: true })}
                  className="bg-[#FAFAFA]"
                  dir="hoz"
                  child
                  label="x"
                  type="number"
                  step={0.00001}
                  required
                  autoComplete={"on"}
                />
                <FormInput
                  {...register("marker_position.y", { valueAsNumber: true })}
                  className="bg-[#FAFAFA]"
                  dir="hoz"
                  child
                  label="y"
                  type="number"
                  step={0.00001}
                  required
                  autoComplete={"on"}
                />
                <FormInput
                  {...register("marker_position.z", { valueAsNumber: true })}
                  className="bg-[#FAFAFA]"
                  dir="hoz"
                  child
                  label="z"
                  type="number"
                  step={0.00001}
                  required
                  autoComplete={"on"}
                />
              </div>
            </div>
            <div className="flex h-[calc(100%-140px)] flex-col items-start justify-center py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Gallery
              </p>
              <DropGallery />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <Button type="submit" loading={isLoading}>
            Create Block
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
