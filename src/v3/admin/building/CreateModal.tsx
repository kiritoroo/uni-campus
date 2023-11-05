import { X } from "lucide-react";
import CreateForm from "./CreateForm";
import { useCommonStore } from "./hooks/useCommonStore";
import DropModel from "./DropModel";
import { useModelUploadStore } from "./hooks/useModelUploadStore";
import ViewModel from "./ViewModel";

const CreateModal = () => {
  const commonStore = useCommonStore();
  const modelUploadStore = useModelUploadStore();
  const scene = modelUploadStore.use.scene();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
      <div className="mx-5 flex max-w-[1200px] flex-col items-center justify-center bg-white px-12 py-5">
        <div className="flex w-full items-center justify-between">
          <div className="py-5 text-xl font-medium text-gray-600">Create new building</div>
          <button
            type="button"
            onClick={() => {
              commonStore.setState({ showCreateModal: false });
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-8 py-4">
          <div className="col-span-3">
            <CreateForm />
          </div>
          <div className="col-span-3 h-full w-full grow">
            <div className="flex h-full w-full flex-col">
              <p className="w-fit pb-1 text-sm font-medium text-gray-600">3D Model</p>
              {scene ? <ViewModel /> : <DropModel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
