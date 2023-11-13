import { cn } from "@Utils/common.utils";
import { useCommonStore } from "../hooks/useCommonStore";

const CreateButton = () => {
  const commonStore = useCommonStore();
  const showCreateModal = commonStore.use.showCreateModal();

  return (
    <button
      type="button"
      className={cn("w-fit bg-[#e2e2e2] p-3", {
        "opacity-0": showCreateModal,
      })}
      onClick={() => {
        commonStore.setState({ showCreateModal: true });
      }}
    >
      <p className="text-sm font-medium text-[#2C2B31]">New Space</p>
    </button>
  );
};

export default CreateButton;
