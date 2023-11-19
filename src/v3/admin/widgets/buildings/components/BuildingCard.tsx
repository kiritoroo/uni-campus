import { Link } from "react-router-dom";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { Clipboard, Trash, Trash2 } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import { useBuildingServices } from "@v3/admin/hooks/useBuildingServices";
import { useBuildingsStore } from "../hooks/useBuildingsStore";
import { TBuildingSchema } from "@v3/admin/schemas/building/base";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@Utils/common.utils";

const BuildingCard = ({ id, name, preview_img, is_public }: TBuildingSchema & {}) => {
  const globalStore = useGlobalStore();
  const buildingsStore = useBuildingsStore();

  const actions = buildingsStore.use.actions();

  const uniDialog = useUniDialog();
  const uniToast = useUniToastify();

  const { removeBuilding } = useBuildingServices();

  const { mutate } = removeBuilding(
    {
      id: id,
    },
    {
      onSuccess: () => {
        actions.removeBuilding({ buildingId: id });
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
            <div className="text-lg font-medium">Delete building?</div>
            <p className="text-center text-sm">
              Are you sure you want to delete <strong>"{name}"</strong> building?. <br /> You can't
              undo this action.
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

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md">
      <div className="relative w-full grow">
        <Link to={`${id}`} className="h-full">
          <img
            src={`${process.env.UNI_CAMPUS_API_URL}/${preview_img.url}`}
            className="h-full max-h-[180px] w-full object-cover"
          />
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center justify-center gap-2">
          <button
            className="bg-gem-onyx active:bg-gem-onyx/20 border-gem-onyx group cursor-pointer rounded-md border p-2 transition-colors duration-200 hover:bg-white"
            onClick={handleOnClickDelete}
          >
            <Trash2 className="group-hover:stroke-gem-onyx h-4 w-4 stroke-white transition-colors duration-200" />
          </button>
        </div>
        <div className="to-gem-onyx/20 pointer-events-none absolute bottom-0 left-0 right-0 h-20 w-full select-none bg-gradient-to-b from-transparent" />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-2 border-t border-gray-300 bg-white p-4">
        <div className="text-gem-onyx text-lg font-black">{name}</div>
        <div className="flex w-full items-center justify-between">
          <div className="text-gem-onyx/80 mr-2 overflow-hidden text-sm font-medium">{id}</div>
          <CopyToClipboard text={id}>
            <Clipboard
              className="h-4 w-4 shrink-0 cursor-pointer stroke-gray-600"
              data-tooltip-id={`clipboard-${id}`}
              data-tooltip-content="copied"
              data-tooltip-variant="dark"
            />
          </CopyToClipboard>
          <Tooltip
            id={`clipboard-${id}`}
            openOnClick
            globalCloseEvents={{
              scroll: true,
              escape: true,
              resize: true,
              clickOutsideAnchor: true,
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between pt-1">
          <div
            className={cn("rounded-md px-3 py-[2px] text-sm font-semibold", {
              " bg-green-100 text-green-700 ": is_public,
              " text-gem-onyx/80 bg-gray-200 ": !is_public,
            })}
          >
            {is_public ? <span>Public</span> : <span>Draft</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
