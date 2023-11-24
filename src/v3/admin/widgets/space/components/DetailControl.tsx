import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { useSpaceStore } from "../hooks/useSpaceStore";
import { useSpacesStore } from "../../spaces/hooks/useSpacesStore";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { v4 as uuidv4 } from "uuid";
import { Pencil, Trash } from "lucide-react";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { useCommonStore } from "../hooks/useCommonStore";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import Button from "@v3/admin/shared/Button";
import PublishForm from "./PublishForm";

const DetailControl = () => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const spaceStore = useSpaceStore();
  const spacesStore = useSpacesStore();
  const iconUploadStore = useIconUploadStore();

  const enableEditDetail = commonStore.use.enableEditDetail();
  const actions = spacesStore.use.actions();
  const spaceId = spaceStore.use.spaceId()!;
  const spaceData = spaceStore.use.spaceData()!;
  const iconUploadAction = iconUploadStore.use.actions();

  const uniToast = useUniToastify();
  const uniDialog = useUniDialog();

  const { removeSpace } = useSpaceServices();

  const { mutate, isLoading } = removeSpace(
    {
      id: spaceId,
    },
    {
      onSuccess: () => {
        actions.removeSpace({ spaceId: spaceId });
        globalStore.setState({ spaceServicesVersion: uuidv4() });
        uniToast.success({ desc: "Remove space success" });
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
            <div className="text-lg font-medium">Delete space?</div>
            <p className="text-center text-sm">
              Are you sure you want to delete <strong>"{spaceData.name}"</strong> space?. <br /> You
              can't undo this action.
            </p>
          </div>
        </div>
      ),
      button: (
        <button
          type="button"
          className="flex items-center justify-around gap-2 bg-gray-200 px-5 py-3"
          onClick={() => {
            mutate();
          }}
        >
          <div className="text-sm font-medium">Delete</div>{" "}
          <Trash className="h-4 w-4 stroke-gray-700" />
        </button>
      ),
    });
  };

  const handleOnClickEdit = () => {
    commonStore.setState({ enableEditDetail: true });
  };

  const handleOnClickDone = () => {
    commonStore.setState({ enableEditDetail: false });
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
