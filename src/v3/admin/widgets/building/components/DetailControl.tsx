import { useCommonStore } from "../hooks/useCommonStore";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import Button from "@v3/admin/shared/Button";
import { Pencil, Trash } from "lucide-react";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { v4 as uuidv4 } from "uuid";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useNavigate } from "react-router-dom";
import { usePreviewUploadStore } from "../hooks/usePreviewUploadStore";
import { useModelUploadStore } from "../hooks/useModelUploadStore";

const DetailControl = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const buildingStore = useBuildingStore();
  const previewUploadStore = usePreviewUploadStore();
  const modelUploadStore = useModelUploadStore();

  const enableEditDetail = commonStore.use.enableEditDetail();
  const buildingId = buildingStore.use.buildingId()!;
  const buildingData = buildingStore.use.buildingData()!;
  const previewUploadAction = previewUploadStore.use.actions();
  const modelUploadAction = modelUploadStore.use.actions();

  const navigate = useNavigate();
  const uniToast = useUniToastify();
  const uniDialog = useUniDialog();

  const { removeBuilding } = useBuildingServices();

  const { mutate, isLoading } = removeBuilding(
    {
      id: buildingId,
    },
    {
      onSuccess: () => {
        navigate("/x/buildings");
        globalStore.setState({ buildingServiceVersion: uuidv4() });
        uniToast.success({ desc: "Remove building success" });
      },
      onError: (error: any) => {
        uniToast.error({ desc: Error(error).message });
      },
    },
  );

  const handleOnClickDelete = () => {
    uniDialog.addDialog({
      body: (
        <div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-lg font-bold">Delete building?</div>
            <p className="text-center text-sm">
              Are you sure you want to delete <strong>"{buildingData.name}"</strong> building?.{" "}
              <br /> You can't undo this action.
            </p>
          </div>
        </div>
      ),
      button: (
        <button
          type="button"
          className="group flex items-center justify-around gap-2 rounded-lg border border-gem-onyx bg-gem-onyx px-4 py-3 text-white transition-colors duration-200 hover:bg-white hover:text-gem-onyx active:bg-gem-onyx/20"
          onClick={() => {
            mutate();
          }}
        >
          <div className="text-sm font-medium">Delete</div>{" "}
          <Trash className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      ),
    });
  };

  const handleOnClickEdit = () => {
    commonStore.setState({ enableEditDetail: true });
  };

  const handleOnClickDone = () => {
    commonStore.setState({ enableEditDetail: false });
    previewUploadAction.resetStore();
    modelUploadAction.resetStore();
  };

  return (
    <FlexRow className="items-stretch justify-start gap-5 px-10 pt-5">
      {!enableEditDetail ? (
        <Button onClick={handleOnClickEdit}>
          <FlexRow>
            <Pencil className="h-4 w-4" />
            <div className="ml-2">Edit</div>
          </FlexRow>
        </Button>
      ) : (
        <Button onClick={handleOnClickDone}>Done</Button>
      )}
      <Button onClick={handleOnClickDelete} loading={isLoading}>
        <Trash className="h-4 w-4" />
      </Button>
    </FlexRow>
  );
};

export default DetailControl;
