import DropPreview from "./DropPreview";
import { FormInput } from "@v3/admin/shared/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import GLViewModel from "../webgl/GLViewModel";
import DropModel from "./DropModel";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useBuildingsStore } from "../hooks/useBuildingsStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { TBuildingCreateSchema, buildingCreateSchema } from "@v3/admin/schemas/building/create";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import Button from "@v3/admin/shared/Button";

const CreateForm = () => {
  const commonStore = useCommonStore();
  const buildingsStore = useBuildingsStore();
  const modelUploadStore = useModelUploadStore();

  const actions = buildingsStore.use.actions();
  const scene = modelUploadStore.use.scene();

  const uniToast = useUniToastify();

  const formMethod = useForm<TBuildingCreateSchema>({
    resolver: zodResolver(buildingCreateSchema),
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
      order: 0,
    },
  });

  const { register, watch, handleSubmit } = formMethod;

  const { createBuilding } = useBuildingServices();

  const { mutate, isLoading } = createBuilding({
    onSuccess: (data) => {
      commonStore.setState({ showCreateModal: false });
      actions.addBuilding({ buildingData: data });
      uniToast.success({
        desc: "Create building success",
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: error.message,
      });
    },
  });

  const onSubmitForm = () => {
    mutate({ ...watch() });
  };

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="py-4">
        <div className="grid h-full w-full grid-cols-6 gap-8">
          <div className="col-span-3 space-y-2">
            <div className="aspect-[4/2.5] w-[320px]">
              <div className="flex h-full w-full flex-col">
                <p className="w-fit pb-2 text-sm font-semibold text-gem-onyx/80">
                  Building Preview
                </p>
                <DropPreview />
              </div>
            </div>
            <div className="w-full space-y-2">
              <FormInput
                {...register("name")}
                className="bg-[#FAFAFA]"
                label="Building Name"
                type="text"
                required
                autoComplete={"on"}
              />
            </div>
            <div className="py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Object Position
              </p>
              <div className="flex items-center justify-start gap-3">
                <FormInput
                  {...register("position.x", { valueAsNumber: true })}
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
                  {...register("position.y", { valueAsNumber: true })}
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
                  {...register("position.z", { valueAsNumber: true })}
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
            <div className="py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Object Rotation
              </p>
              <div className="flex items-center justify-start gap-3">
                <FormInput
                  {...register("rotation.x", { valueAsNumber: true })}
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
                  {...register("rotation.y", { valueAsNumber: true })}
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
                  {...register("rotation.z", { valueAsNumber: true })}
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
            <div className="py-1">
              <p className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-gem-onyx/80">
                Object Scale
              </p>
              <div className="flex items-center justify-start gap-3">
                <FormInput
                  {...register("scale.x", { valueAsNumber: true })}
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
                  {...register("scale.y", { valueAsNumber: true })}
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
                  {...register("scale.z", { valueAsNumber: true })}
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
            <div className="w-full space-y-2">
              <FormInput
                {...register("order")}
                className="bg-[#FAFAFA]"
                label="Building Order"
                type="number"
                required
                autoComplete={"on"}
              />
            </div>
          </div>
          <div className="col-span-3 h-full w-full grow">
            <div className="flex h-full w-full flex-col">
              <p className="w-fit pb-1 text-sm font-medium text-gray-600">Building 3D Model</p>
              {!scene ? <DropModel /> : <GLViewModel />}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <Button type="submit" loading={isLoading}>
            Create Building
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
