import { zodResolver } from "@hookform/resolvers/zod";
import { TBuildingUpdateSchema, buildingUpdateSchema } from "@v3/admin/schemas/building/update";
import { BookCheck, BookDashed, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useEffect } from "react";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { v4 as uuidv4 } from "uuid";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { cn } from "@Utils/common.utils";

const PublicForm = () => {
  const globalStore = useGlobalStore();
  const buildingStore = useBuildingStore();

  const buildingId = buildingStore.use.buildingId();
  const buildingData = buildingStore.use.buildingData();

  const uniToast = useUniToastify();

  const formMethod = useForm<TBuildingUpdateSchema>({
    resolver: zodResolver(buildingUpdateSchema),
    defaultValues: {
      is_public: undefined,
    },
  });

  const { setValue, watch, getValues } = formMethod;

  const { updateBuilding } = useBuildingServices();

  const { mutate, isLoading } = updateBuilding(
    {
      id: buildingId!,
      is_public: watch("is_public"),
    },
    {
      onSuccess: (data) => {
        buildingStore.setState({ buildingData: data });
        globalStore.setState({ buildingServiceVersion: uuidv4() });
        uniToast.success({
          desc: `Set building to ${getValues("is_public") ? "Public" : "Draft"} success`,
        });
      },
      onError: (error: any) => {
        uniToast.error({
          desc: Error(error).message,
        });
      },
    },
  );

  const onSubmitForm = (data: any) => {
    console.log(data);
    mutate();
  };

  useEffect(() => {
    if (getValues("is_public") !== null && getValues("is_public") !== undefined) {
      onSubmitForm(getValues());
    }
  }, [watch("is_public")]);

  return (
    <form>
      <button
        type="button"
        className={cn("flex items-center justify-center gap-2 bg-gray-200 px-3 py-2", {
          "bg-green-100": buildingData?.is_public,
        })}
        onClick={() => {
          setValue("is_public", !buildingData?.is_public);
        }}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin stroke-slate-500" />}
        {buildingData?.is_public && (
          <>
            <div className="text-sm font-medium text-green-600">Public</div>{" "}
            <BookCheck className="h-4 w-4 stroke-green-600" />
          </>
        )}
        {!buildingData?.is_public && (
          <>
            <div className="text-sm font-medium text-gray-500">Draft</div>{" "}
            <BookDashed className="h-4 w-4 stroke-gray-500" />
          </>
        )}
      </button>
    </form>
  );
};

export default PublicForm;
