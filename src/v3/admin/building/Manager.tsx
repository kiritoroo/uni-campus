import useBuildingServices from "../hooks/useBuildingServices";
import { TBuildingSchema } from "../schemas/building-schema";
import CreateModal from "./CreateModal";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { PreviewUploadStoreProvider } from "./contexts/PreviewUploadStoreContext";
import { useCommonStore } from "./hooks/useCommonStore";
import { Clipboard } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";

const BuildingCard = ({ id, name, preview_url }: TBuildingSchema) => {
  return (
    <div className="border border-gray-200 bg-white">
      <img src={`${process.env.UNI_CAMPUS_API_URL}/${preview_url}`} />
      <div className="flex flex-col items-start justify-center gap-2 bg-gray-100 p-4">
        <div className="text-lg font-bold">{name}</div>
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-blue-600">{id}</div>{" "}
          <CopyToClipboard text={id}>
            <Clipboard
              className="h-4 w-4 cursor-pointer stroke-gray-600"
              data-tooltip-id={`clipboard-${id}`}
              data-tooltip-content="copied"
              data-tooltip-variant="dark"
            />
          </CopyToClipboard>
          <Tooltip
            id={`clipboard-${id}`}
            openOnClick
            globalCloseEvents={{ scroll: true, escape: true, resize: true }}
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
