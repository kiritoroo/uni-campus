import { X } from "lucide-react";
import CreateForm from "./CreateForm";
import { useCommonStore } from "./hooks/useCommonStore";

const CreateModal = () => {
  const commonStore = useCommonStore();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
      <div className="flex max-w-[1000px] flex-col items-center justify-center bg-white px-12 py-5">
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
        <div className="py-4">
          <CreateForm />
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
