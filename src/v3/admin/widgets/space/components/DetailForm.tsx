import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { TSpaceUpdateSchema, spaceUpdateSchema } from "@v3/admin/schemas/space/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSpaceStore } from "../hooks/useSpaceStore";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@Utils/common.utils";
import { FormInput } from "@v3/admin/shared/FormInput";
import { FormColorInput } from "@v3/admin/shared/FormColorInput";
import IconPreview from "./IconPreview";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { v4 as uuidv4 } from "uuid";

const DetailForm = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const iconUploadStore = useIconUploadStore();
  const spaceStore = useSpaceStore();

  const iconUploadActions = iconUploadStore.use.actions();
  const enableEditDetail = commonStore.use.enableEditDetail();
  const spaceId = spaceStore.use.spaceId();
  const spaceData = spaceStore.use.spaceData();

  const uniToast = useUniToastify();

  const formMethod = useForm<TSpaceUpdateSchema>({
    resolver: zodResolver(spaceUpdateSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const { control, register, setValue, watch, handleSubmit } = formMethod;

  const { updateSpace } = useSpaceServices();

  const { mutate } = updateSpace(
    {
      id: spaceId!,
      ...watch(),
    },
    {
      onSuccess: (data) => {
        iconUploadActions.resetStore();
        commonStore.setState({ enableEditDetail: false });
        spaceStore.setState({ spaceData: data });
        globalStore.setState({ spaceServicesVersion: uuidv4() });
        uniToast.success({
          desc: "Update building success",
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

  useEffect(() => {
    if (spaceData && !enableEditDetail) {
      setValue("name", spaceData.name);
      setValue("color", spaceData.color);
    }
  }, [spaceData, enableEditDetail]);

  return (
    <FormProvider {...formMethod}>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={cn(
          "relative mt-12 flex h-full flex-col items-center justify-center border border-gray-300",
          {
            "border-blue-300": enableEditDetail,
          },
        )}
      >
        <div className="relative w-full px-4 py-6">
          {!enableEditDetail ? (
            <button
              className=" bg-gray-100 p-3"
              type="button"
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
                  iconUploadActions.resetStore();
                }}
                type="button"
              >
                <X className="h-4 w-4 stroke-gray-600" />{" "}
                <p className="text-sm font-medium">Cancel</p>
              </button>
              <button
                className=" flex items-center justify-around gap-3 bg-gray-100 px-3 py-2"
                onClick={() => {}}
                type="submit"
              >
                <Save className="h-4 w-4 stroke-gray-600" />{" "}
                <p className="text-sm font-medium">Save</p>
              </button>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-2 border-t border-gray-300 bg-gray-50 px-8 py-4">
          <div className="flex flex-row items-stretch justify-start gap-x-8">
            <div className="flex h-auto flex-col items-start justify-between py-1">
              <p className="text-sm">Name </p>
              <p className="text-sm">Color </p>
            </div>
            <div className="space-y-3">
              <FormInput
                {...register("name")}
                type="string"
                required
                dir="hoz"
                disabled={!enableEditDetail}
              />
              <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange } }) => (
                  <FormColorInput
                    initColor={value}
                    onChange={onChange}
                    disabled={!enableEditDetail}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-x-12">
            <div>Icon</div>
            <div className="aspect-square h-[64px]">{spaceData && <IconPreview />}</div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DetailForm;
