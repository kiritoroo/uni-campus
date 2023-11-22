import { X } from "lucide-react";
import CreateForm from "./CreateForm";
import { useCommonStore } from "../hooks/useCommonStore";

const CreateModal = () => {
  const commonStore = useCommonStore();

  return (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
      <div className="mx-5 flex max-w-[1200px] flex-col items-center justify-center rounded-lg border border-gray-300 bg-black/10 bg-white px-12 py-5 shadow-md ">
        <div className="flex w-full items-center justify-between">
          <div className="py-2 text-2xl font-bold text-gem-onyx">Create new building</div>
          <button
            type="button"
            onClick={() => {
              commonStore.setState({ showCreateModal: false });
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateModal;
