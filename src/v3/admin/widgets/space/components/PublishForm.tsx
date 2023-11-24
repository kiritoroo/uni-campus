import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import Button from "@v3/admin/shared/Button";
import { useSpaceStore } from "../hooks/useSpaceStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { TSpaceUpdateSchema, spaceUpdateSchema } from "@v3/admin/schemas/space/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useSpacesStore } from "../../spaces/hooks/useSpacesStore";

const PublishForm = () => {
  const globalStore = useGlobalStore();
  const spacesStore = useSpacesStore();
  const spaceStore = useSpaceStore();

  const spacesActions = spacesStore.use.actions();
  const spaceId = spaceStore.use.spaceId();
  const spaceData = spaceStore.use.spaceData();
  const canSetPublish = spaceStore.use.canSetPublish();

  const uniToast = useUniToastify();

  const formMethod = useForm<TSpaceUpdateSchema>({
    resolver: zodResolver(spaceUpdateSchema),
    defaultValues: {
      is_publish: undefined,
    },
  });

  const { setValue, watch, getValues } = formMethod;

  const { updateSpace } = useSpaceServices();

  const { mutate, isLoading } = updateSpace({
    onSuccess: (data) => {
      spaceStore.setState({ spaceData: data });
      globalStore.setState({ spaceServicesVersion: uuidv4() });
      uniToast.success({
        desc: `Building ${getValues("is_publish") ? "Publish" : "UnPublish"} success`,
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: Error(error).message,
      });
    },
  });

  const onSubmitForm = (data: any) => {
    console.log(data);
    mutate({ id: spaceId!, is_publish: watch("is_publish") });
  };

  useEffect(() => {
    if (getValues("is_publish") !== null && getValues("is_publish") !== undefined) {
      onSubmitForm(getValues());
    }
  }, [watch("is_publish")]);

  return (
    <form>
      <Button
        loading={isLoading}
        onClick={() => {
          setValue("is_publish", !spaceData?.is_publish);
        }}
        disabled={!canSetPublish}
      >
        {!spaceData?.is_publish && <div>Publish</div>}
        {spaceData?.is_publish && <div>UnPublish</div>}
      </Button>
    </form>
  );
};

export default PublishForm;
