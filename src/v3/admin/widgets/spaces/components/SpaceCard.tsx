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
import { Link } from "react-router-dom";
import { useCommonStore } from "../hooks/useCommonStore";

const SpaceCard = ({ id, color, name, icon, is_publish }: TSpaceSchema) => {
  const globalStore = useGlobalStore();
  const commonStore = useCommonStore();
  const spacesStore = useSpacesStore();

  const actions = spacesStore.use.actions();
  const pickedSpaceID = commonStore.use.pickedSpaceId();

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
        uniToast.error({ desc: error.message });
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
              Are you sure you want to delete <strong>"{name}"</strong> space?. <br /> You can't
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
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-all duration-100",
        {
          "border-gem-onyx": pickedSpaceID === id,
        },
      )}
    >
      <Link
        to={pickedSpaceID === id ? "" : id}
        onClick={() => {
          pickedSpaceID === id
            ? commonStore.setState({ pickedSpaceId: null })
            : commonStore.setState({ pickedSpaceId: id });
        }}
        className="flex cursor-pointer items-stretch justify-start "
      >
        <div className="border-r border-gray-300 px-4 py-2">
          <img
            className="h-full w-14 object-contain"
            src={`${process.env.UNI_CAMPUS_API_URL}/${icon.url!}`}
          />
        </div>
        <div
          className={cn("relative grow bg-white px-3 py-5 transition-all duration-100", {
            "bg-[#FAFAFA]": pickedSpaceID === id,
          })}
        >
          <div className="flex flex-row items-center justify-start gap-x-3 pl-2">
            <div
              className={cn("h-3 w-3 rounded-full border border-gray-300")}
              css={css`
                background-color: ${color};
              `}
            />
            <div className="pb-1 text-xl font-semibold text-gem-onyx">{name}</div>
          </div>
          <div className="pl-2 text-sm font-normal text-gem-onyx/60">{id}</div>
        </div>
      </Link>

      <div className="absolute bottom-3 right-3 flex items-center justify-center gap-2">
        <div
          className={cn("rounded-md px-3 py-[2px] text-sm font-medium", {
            " bg-green-100 text-green-700 ": is_publish,
            " bg-gray-200 text-gem-onyx/80 ": !is_publish,
          })}
        >
          {is_publish ? <span>Publish</span> : <span>Draft</span>}
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
