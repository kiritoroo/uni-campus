import { TSpaceSchema } from "@v3/admin/schemas/space/base";
import { css } from "@emotion/react";
import { cn } from "@Utils/common.utils";
import { Trash, Trash2 } from "lucide-react";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { useSpacesStore } from "../hooks/useSpacesStore";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { useSpaceServices } from "@v3/admin/hooks/useSpaceServices";
import { v4 as uuidv4 } from "uuid";

const SpaceCard = ({ id, color, name, icon }: TSpaceSchema) => {
  const globalStore = useGlobalStore();
  const spacesStore = useSpacesStore();

  const actions = spacesStore.use.actions();

  const uniDialog = useUniDialog();
  const uniToast = useUniToastify();

  const { removeSpace } = useSpaceServices();

  const { mutate } = removeSpace(
    {
      id: id,
    },
    {
      onSuccess: () => {
        actions.removeSpace({ spaceId: id });
        globalStore.setState({ spaceServicesVersion: uuidv4() });
        uniToast.success({ desc: "Remove space success" });
      },
      onError: (error: any) => {
        uniToast.error({ desc: Error(error).message });
      },
    },
  );

  return (
    <div className="relative flex cursor-pointer items-stretch justify-start border border-gray-200">
      <div className="px-4 py-2">
        <img
          className="h-full w-14 object-contain"
          src={`${process.env.UNI_CAMPUS_API_URL}/${icon.url!}`}
        />
      </div>
      <div className="relative grow bg-gray-100 px-3 py-5">
        <div className="flex items-stretch justify-start gap-x-3 pl-2">
          <div
            className={cn("w-1")}
            css={css`
              background-color: ${color};
            `}
          />
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm font-normal">{id}</div>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-3 right-3 cursor-pointer bg-gray-200 p-2 hover:bg-gray-300"
        onClick={() => {
          uniDialog.addDialog({
            body: (
              <div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-lg font-medium">Delete space?</div>
                  <p className="text-center text-sm">
                    Are you sure you want to delete <strong>"{name}"</strong> space?. <br /> You
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
        }}
      >
        <Trash2 className="h-4 w-4 stroke-gray-600" />
      </button>
    </div>
  );
};

export default SpaceCard;
