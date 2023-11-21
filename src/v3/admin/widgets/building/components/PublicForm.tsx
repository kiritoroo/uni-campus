import { zodResolver } from "@hookform/resolvers/zod";
import { TBuildingUpdateSchema, buildingUpdateSchema } from "@v3/admin/schemas/building/update";
import { useForm } from "react-hook-form";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useEffect } from "react";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { v4 as uuidv4 } from "uuid";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import Button from "@v3/admin/shared/Button";

const PublicForm = () => {
  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingId = buildingStore.use.buildingId();
  const buildingData = buildingStore.use.buildingData();
  const canSetPublic = buildingStore.use.canSetPublic();

  const uniToast = useUniToastify();

  const formMethod = useForm<TBuildingUpdateSchema>({
    resolver: zodResolver(buildingUpdateSchema),
    defaultValues: {
      is_public: undefined,
    },
  });

  const { setValue, watch, getValues } = formMethod;

  const { updateBuilding } = useBuildingServices();

  const { mutate, isLoading } = updateBuilding({
    onSuccess: (data) => {
      buildingStore.setState({ buildingData: data });
      globalStore.setState({ buildingServiceVersion: uuidv4() });
      uniToast.success({
        desc: `Building ${getValues("is_public") ? "Publish" : "UnPublish"} success`,
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
    mutate({ id: buildingId!, is_public: watch("is_public") });
  };

  useEffect(() => {
    if (getValues("is_public") !== null && getValues("is_public") !== undefined) {
      onSubmitForm(getValues());
    }
  }, [watch("is_public")]);

  return (
    <form>
      <Button
        loading={isLoading}
        onClick={() => {
          setValue("is_public", !buildingData?.is_public);
        }}
        disabled={!canSetPublic}
      >
        {!buildingData?.is_public && <div>Publish</div>}
        {buildingData?.is_public && <div>UnPublish</div>}
      </Button>
    </form>
  );
};

export default PublicForm;
