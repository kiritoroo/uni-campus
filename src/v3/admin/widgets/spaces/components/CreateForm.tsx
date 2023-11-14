import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useCommonStore } from "../hooks/useCommonStore";
import { useSpacesStore } from "../hooks/useSpacesStore";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { TSpaceCreateSchema, spaceCreateSchema } from "@v3/admin/schemas/space/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { FormInput } from "@v3/admin/shared/FormInput";
import { FormColorInput } from "@v3/admin/shared/FormColorInput";
import DropIcon from "./DropIcon";
import ViewIcon from "./ViewIcon";
import { Loader2 } from "lucide-react";

const CreateForm = () => {
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();
  const iconUploadStore = useIconUploadStore();

  const actions = spacesStore.use.actions();
  const base64 = iconUploadStore.use.base64();

  const uniToast = useUniToastify();

  const formMethod = useForm<TSpaceCreateSchema>({
    resolver: zodResolver(spaceCreateSchema),
    defaultValues: {
      name: "",
      color: "#FFFFFF",
    },
  });

  const { control, register, watch, handleSubmit } = formMethod;

  const { createSpace } = useSpaceServices();

  const { mutate, isLoading } = createSpace(
    {
      ...watch(),
    },
    {
      onSuccess: (data) => {
        commonStore.setState({ showCreateModal: false });
        actions.addSpace({ spaceData: data });
        uniToast.success({
          desc: "Create space success",
        });
      },
      onError: (error: any) => {
        uniToast.error({
          desc: Error(error).message,
        });
      },
    },
  );

  const onSubmitForm = () => {
    console.log(watch());
    mutate();
  };

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-6 gap-8 py-4">
        <div className="col-span-3 space-y-2">
          <FormInput {...register("name")} label="Name" type="text" required autoComplete={"on"} />
          <Controller
            control={control}
            name="color"
            render={({ field: { value, onChange } }) => (
              <FormColorInput label="Color" initColor={value} onChange={onChange} />
            )}
          />
          <div className="py-5">
            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center bg-[#e2e2e2] p-3"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin stroke-slate-500" />}
              <p className="text-sm font-medium text-[#2C2B31]">Create</p>
            </button>
          </div>
        </div>
        <div className="col-span-3 h-full w-full grow">
          <div className="flex h-full w-full flex-col">
            <p className="w-fit pb-1 text-sm font-medium text-gray-600">
              Icon <span className="text-red-400">*</span>
            </p>
            {base64 ? <ViewIcon /> : <DropIcon />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
