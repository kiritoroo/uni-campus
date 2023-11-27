import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { TSpaceUpdateSchema, spaceUpdateSchema } from "@v3/admin/schemas/space/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSpaceStore } from "../hooks/useSpaceStore";
import { FormColorInput } from "@v3/admin/shared/FormColorInput";
import IconPreview from "./IconPreview";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { v4 as uuidv4 } from "uuid";
import DetailField from "../../building/components/DetailField";
import DropIcon from "./DropIcon";

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

  const [updateKey, setUpdateKey] = useState<keyof TSpaceUpdateSchema | null>(null);

  const formMethod = useForm<TSpaceUpdateSchema>({
    resolver: zodResolver(spaceUpdateSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const { control, register, setValue, watch } = formMethod;

  const { updateSpace } = useSpaceServices();

  const { mutate, isLoading } = updateSpace({
    onSuccess: (data) => {
      iconUploadActions.resetStore();
      spaceStore.setState({ spaceData: data });
      globalStore.setState({ spaceServicesVersion: uuidv4() });
      uniToast.success({
        desc: "Update building success",
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

  const onSubmitForm = (key: keyof TSpaceUpdateSchema) => {
    setUpdateKey(key);
    mutate({ id: spaceId!, ...watch() });
  };

  useEffect(() => {
    if (spaceData && !enableEditDetail) {
      setValue("name", spaceData.name);
      setValue("color", spaceData.color);
    }
  }, [spaceData, enableEditDetail]);

  return (
    <FormProvider {...formMethod}>
      <form className="space-y-5 py-5">
        <DetailField
          type="string"
          defaultValue={spaceData?.id}
          disabled={true}
          label="Space ID"
          desc="A unique identifier assigned to the space, facilitating precise identification within the system."
          editable={false}
        />
        <DetailField
          {...register("name")}
          type="string"
          required
          disabled={!enableEditDetail}
          label="Space Name"
          desc="The designated name of the space, providing a human-readable label for easy recognition."
          fieldKey={"name"}
          editDesc="Make sure not empty field"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "name"}
        />
        <DetailField
          label="Space Color"
          desc="The color associated with the space, aiding in visual categorization or differentiation."
          fieldKey={"color"}
          customInput={() => (
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
          )}
          editDesc="Supported hex color format"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "color"}
        />
        <DetailField
          label="Space Icon"
          desc="An icon representing the space, enhancing visual identification and user experience."
          fieldKey={"icon_file"}
          customInput={() => (
            <div className="my-2 aspect-[4/2] h-auto w-2/4 overflow-hidden rounded-md border border-gray-300">
              {enableEditDetail ? <DropIcon /> : <IconPreview />}
            </div>
          )}
          editDesc="Supported image format .webp"
          enableEdit={enableEditDetail}
          onSave={onSubmitForm}
          loading={isLoading && updateKey === "icon_file"}
        />
      </form>
    </FormProvider>
  );
};

export default DetailForm;
