import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useBlockStore } from "../hooks/useBlockStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { TBlockUpdateSchema, blockUpdateSchema } from "@v3/admin/schemas/block/update";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import Button from "@v3/admin/shared/Button";

const PublishForm = () => {
  const globalStore = useGlobalStore();
  const blockStore = useBlockStore();

  const blockId = blockStore.use.blockId();
  const blockData = blockStore.use.blockData();
  const canSetPublish = blockStore.use.canSetPublish();

  const uniToast = useUniToastify();

  const formMethod = useForm<TBlockUpdateSchema>({
    resolver: zodResolver(blockUpdateSchema),
    defaultValues: {
      is_publish: undefined,
    },
  });

  const { setValue, watch, getValues } = formMethod;

  const { updateBlock } = useBlockServices();

  const { mutate, isLoading } = updateBlock({
    onSuccess: (data) => {
      blockStore.setState({ blockData: data });
      globalStore.setState({ blockServicesVersion: uuidv4() });
      uniToast.success({
        desc: `Block ${getValues("is_publish") ? "Publish" : "UnPublish"} success`,
      });
    },
    onError: (error: any) => {
      uniToast.error({
        desc: error.message,
      });
    },
  });

  const onSubmitForm = (data: any) => {
    mutate({ id: blockId!, is_publish: watch("is_publish") });
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
          setValue("is_publish", !blockData?.is_publish);
        }}
        disabled={!canSetPublish}
      >
        {!blockData?.is_publish && <div>Publish</div>}
        {blockData?.is_publish && <div>UnPublish</div>}
      </Button>
    </form>
  );
};

export default PublishForm;
