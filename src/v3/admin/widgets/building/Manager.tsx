import { TBuildingSchema } from "@v3/admin/schemas/building-schema";
import CreateModal from "./CreateModal";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useCommonStore } from "./hooks/useCommonStore";
import { Clipboard, Trash, Trash2 } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import useBuildingServices from "@v3/admin/hooks/useBuildingServices";
import { useUniDialog } from "@v3/admin/shared/UniDialog";

const BuildingCard = ({ id, name, preview_url }: TBuildingSchema) => {
  const uniDialog = useUniDialog();

  return (
    <div className="relative border border-gray-200 bg-white">
      <div className="relative">
        <img src={`${process.env.UNI_CAMPUS_API_URL}/${preview_url}`} />
        <button
          className="absolute bottom-3 right-3 cursor-pointer bg-gray-200 p-2 hover:bg-gray-300"
          onClick={() => {
            uniDialog.addDialog({
              body: (
                <div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-lg font-medium">Delete building?</div>
                    <p className="text-center text-sm">
                      Are you sure you want to delete <strong>"Block f1"</strong> building?. <br />{" "}
                      You can't undo this action.
                    </p>
                  </div>
                </div>
              ),
              button: (
                <button
                  type="button"
                  className="flex items-center justify-around gap-2 bg-gray-200 px-5 py-3"
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
          <div className="mr-2 overflow-hidden text-blue-600">{id}</div>{" "}
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

const BuildingsList = () => {
  const { listBuildings } = useBuildingServices();

  const { data } = listBuildings();

  return (
    <div className="h-full w-full overflow-auto">
      {data && (
        <ul className="grid h-auto w-auto grid-cols-12 gap-x-5 gap-y-10 bg-white">
          {data.map((building) => (
            <li key={building.id} className="col-span-4">
              <BuildingCard {...building} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Manager = () => {
  const commonStore = useCommonStore();
  const showCreateModal = commonStore.use.showCreateModal();

  return (
    <section className="h-full w-full overflow-hidden">
      <button
        type="button"
        className="w-fit bg-[#e2e2e2] p-3"
        onClick={() => {
          commonStore.setState({ showCreateModal: true });
        }}
      >
        <p className="text-sm font-medium text-[#2C2B31]">New Building</p>
      </button>
      <div className="ovehi h-full w-full p-5">
        <BuildingsList />
      </div>
      {showCreateModal && (
        <ModelUploadStoreProvider>
          <PreviewUploadStoreProvider>
            <CreateModal />
          </PreviewUploadStoreProvider>
        </ModelUploadStoreProvider>
      )}
    </section>
  );
};

export default Manager;
