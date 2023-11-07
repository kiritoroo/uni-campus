import { Link } from "react-router-dom";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { toast } from "react-toastify";
import { Clipboard, Trash, Trash2 } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import { useEffect } from "react";
import { TBuildingSchema } from "@v3/admin/schemas/building-schema";
import useBuildingServices from "@v3/admin/hooks/useBuildingServices";

const BuildingCard = ({
  id,
  name,
  preview_img,
  onDeletedBuilding,
}: TBuildingSchema & {
  onDeletedBuilding: ({ id }: Pick<TBuildingSchema, "id">) => void;
}) => {
  const uniDialog = useUniDialog();
  const { removeBuilding } = useBuildingServices();

  const { mutate, isLoading, isError, isSuccess } = removeBuilding(
    {
      id: id,
    },
    {
      onSuccess: () => {
        toast.success("Remove building success", {
          theme: "light",
          autoClose: 2000,
        });
      },
      onError: (error: any) => {
        toast.error(Error(error).message, {
          theme: "light",
          autoClose: 2000,
        });
      },
    },
  );

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      onDeletedBuilding({ id });
    }
  }, [isLoading, isError]);

  return (
    <div className="relative border border-gray-200 bg-white">
      <div className="relative">
        <Link to={`${id}`}>
          <img src={`${process.env.UNI_CAMPUS_API_URL}/${preview_img.url}`} />
        </Link>
        <button
          className="absolute bottom-3 right-3 cursor-pointer bg-gray-200 p-2 hover:bg-gray-300"
          onClick={() => {
            uniDialog.addDialog({
              body: (
                <div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-lg font-medium">Delete building?</div>
                    <p className="text-center text-sm">
                      Are you sure you want to delete <strong>"{name}"</strong> building?. <br />{" "}
                      You can't undo this action.
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
          }}
        >
          <Trash2 className="h-4 w-4 stroke-gray-600" />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 bg-gray-100 p-4">
        <div className="text-lg font-bold text-gray-800">{name}</div>
        <div className="flex w-full items-center justify-between text-sm">
          <div className="mr-2 overflow-hidden text-gray-600">{id}</div>{" "}
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
      </div>
    </div>
  );
};

export default BuildingCard;
