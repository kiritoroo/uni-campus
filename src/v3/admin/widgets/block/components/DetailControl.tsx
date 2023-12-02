import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useCommonStore } from "../hooks/useCommonStore";
import { useBlockStore } from "../hooks/useBlockStore";
import { useGalleryUploadStore } from "../stores/useGalleryUploadStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import Button from "@v3/admin/shared/Button";
import PublishForm from "./PublishForm";

const DetailControl = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const blockStore = useBlockStore();
  const galleryUploadStore = useGalleryUploadStore();

  const enableEditDetail = commonStore.use.enableEditDetail();
  const blockId = blockStore.use.blockId()!;
  const blockData = blockStore.use.blockData()!;
  const galleryUploadAction = galleryUploadStore.use.actions();

  const navigate = useNavigate();
  const uniToast = useUniToastify();
  const uniDialog = useUniDialog();

  const { removeBlock } = useBlockServices();

  const { mutate, isLoading } = removeBlock(
    {
      id: blockId,
    },
    {
      onSuccess: () => {
        navigate("/x/buildings");
        globalStore.setState({ buildingServiceVersion: uuidv4() });
        globalStore.setState({ blockServicesVersion: uuidv4() });
        uniToast.success({ desc: "Remove block success" });
      },
      onError: (error: any) => {
        uniToast.error({ desc: error.message });
      },
    },
  );

  const handleOnClickDelete = () => {
    uniDialog.addDialog({
      body: (
        <div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-lg font-bold">Delete block?</div>
            <p className="text-center text-sm">
              Are you sure you want to delete <strong>"{blockData.name}"</strong> block?. <br /> You
              can't undo this action.
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
          <Trash2 className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      ),
    });
  };

  const handleOnClickEdit = () => {
    commonStore.setState({ enableEditDetail: true });
  };

  const handleOnClickDone = () => {
    commonStore.setState({ enableEditDetail: false });
    galleryUploadAction.resetStore();
  };

  return (
    <FlexRow className="items-stretch justify-between px-5 pt-5">
      <FlexRow className="items-stretch gap-5">
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

      <PublishForm />
    </FlexRow>
  );
};

export default DetailControl;
