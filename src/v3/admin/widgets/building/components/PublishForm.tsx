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

const PublishForm = () => {
  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingId = buildingStore.use.buildingId();
  const buildingData = buildingStore.use.buildingData();
  const canSetPublish = buildingStore.use.canSetPublish();

  const uniToast = useUniToastify();

  const formMethod = useForm<TBuildingUpdateSchema>({
    resolver: zodResolver(buildingUpdateSchema),
    defaultValues: {
      is_publish: undefined,
    },
  });

  const { setValue, watch, getValues } = formMethod;

  const { updateBuilding } = useBuildingServices();

  const { mutate, isLoading } = updateBuilding({
    onSuccess: (data) => {
      buildingStore.setState({ buildingData: data });
      globalStore.setState({ buildingServiceVersion: uuidv4() });
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
    mutate({ id: buildingId!, is_publish: watch("is_publish") });
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
          setValue("is_publish", !buildingData?.is_publish);
        }}
        disabled={!canSetPublish}
      >
        {!buildingData?.is_publish && <div>Publish</div>}
        {buildingData?.is_publish && <div>UnPublish</div>}
      </Button>
    </form>
  );
};

export default PublishForm;
