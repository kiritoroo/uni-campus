import DropPreview from "./DropPreview";
import { FormInput } from "../../shared/FormInput";
import ViewPreview from "./ViewPreview";
import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";
import { useForm, FormProvider } from "react-hook-form";
import GLViewModel from "./webgl/GLViewModel";
import DropModel from "./DropModel";
import { useModelUploadStore } from "./hooks/useModelUploadStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useBuildingServices from "@v3/admin/hooks/useBuildingServices";
import { useBuildingsStore } from "./hooks/useBuildingsStore";
import { useCommonStore } from "./hooks/useCommonStore";
import { TBuildingCreateSchema, buildingCreateSchema } from "@v3/admin/schemas/building/create";

const CreateForm = () => {
  const commonStore = useCommonStore();
  const buildingsStore = useBuildingsStore();
  const modelUploadStore = useModelUploadStore();
  const previewUploadStore = usePreviewUploadStore();

  const actions = buildingsStore.use.actions();
  const scene = modelUploadStore.use.scene();
  const base64 = previewUploadStore.use.base64();

  const formMethod = useForm<TBuildingCreateSchema>({
    resolver: zodResolver(buildingCreateSchema),
    defaultValues: {
      name: "",
      space_id: "",
      uses: "",
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

  const { register, handleSubmit } = formMethod;

  const { createBuilding } = useBuildingServices();

  const { mutate } = createBuilding(
    {
      ...formMethod.watch(),
    },
    {
      onSuccess: (data) => {
        commonStore.setState({ showCreateModal: false });
        actions.addBuilding({ buildingData: data });
        toast.success("Create building success", {
          theme: "light",
          autoClose: 2000,
        });
      },
      onError: (error: any) => {
        toast.error(Error(error).message, {
          theme: "light",
          autoClose: 2000,
        });
      },
    },
  );

  const onSubmitForm = () => {
    mutate();
  };

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-6 gap-8 py-4">
        <div className="col-span-3 space-y-2">
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-2">
              <div className="flex h-full w-full flex-col">
                <p className="w-fit pb-1 text-sm font-medium text-gray-600">
                  Preview <span className="text-red-400">*</span>
                </p>
                {base64 ? <ViewPreview /> : <DropPreview />}
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <FormInput
                {...register("name")}
                label="Name"
                type="text"
                required
                autoComplete={"on"}
              />
              <FormInput
                {...register("space_id")}
                label="Space"
                type="text"
                required
                autoComplete={"on"}
              />
              <FormInput
                {...register("uses")}
                label="Uses"
                type="text"
                required
                autoComplete={"on"}
              />
            </div>
          </div>
          <div className="py-1">
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Position
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput
                {...register("position.x", { valueAsNumber: true })}
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
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Rotation
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput
                {...register("rotation.x", { valueAsNumber: true })}
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
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Scale
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput
                {...register("scale.x", { valueAsNumber: true })}
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
          <div className="py-5">
            <button type="submit" className="w-fit bg-[#e2e2e2] p-3">
              <p className="text-sm font-medium text-[#2C2B31]">Create</p>
            </button>
          </div>
        </div>
        <div className="col-span-3 h-full w-full grow">
          <div className="flex h-full w-full flex-col">
            <p className="w-fit pb-1 text-sm font-medium text-gray-600">
              3D Model <span className="text-red-400">*</span>
            </p>
            {scene ? <GLViewModel /> : <DropModel />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
