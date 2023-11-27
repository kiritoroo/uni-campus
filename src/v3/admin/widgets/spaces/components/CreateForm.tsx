import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useCommonStore } from "../hooks/useCommonStore";
import { useSpacesStore } from "../hooks/useSpacesStore";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { TSpaceCreateSchema, spaceCreateSchema } from "@v3/admin/schemas/space/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { FormInput } from "@v3/admin/shared/FormInput";
import { FormColorInput } from "@v3/admin/shared/FormColorInput";
import DropIcon from "./DropIcon";
import Button from "@v3/admin/shared/Button";

const CreateForm = () => {
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();

  const actions = spacesStore.use.actions();

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
          desc: error.message,
        });
      },
    },
  );

  const onSubmitForm = () => {
    mutate();
  };

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="py-4">
        <div className="grid h-full w-full grid-cols-5 gap-8">
          <div className="col-span-3 space-y-2">
            <FormInput
              {...register("name")}
              className="bg-[#FAFAFA]"
              label="Name"
              type="text"
              required
              autoComplete={"on"}
            />
            <Controller
              control={control}
              name="color"
              render={({ field: { value, onChange } }) => (
                <FormColorInput label="Color" initColor={value} onChange={onChange} />
              )}
            />
          </div>
          <div className="col-span-2">
            <div className="flex aspect-[4/3] h-full w-[200px] grow-0 flex-col">
              <p className="w-fit pb-1 text-sm font-medium text-gray-600">
                Space Icon <span className="text-red-400">*</span>
              </p>
              <DropIcon />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <Button type="submit" loading={isLoading}>
            Create Space
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
