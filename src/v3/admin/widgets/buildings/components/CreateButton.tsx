import { cn } from "@Utils/common.utils";
import { useCommonStore } from "../hooks/useCommonStore";

const CreateButton = () => {
  const commonStore = useCommonStore();
  const showCreateModal = commonStore.use.showCreateModal();

  return (
    <button
      type="button"
      className={cn(
        "bg-gem-onyx active:bg-gem-onyx/20 hover:text-gem-onyx border-gem-onyx w-fit rounded-lg border px-4 py-2 text-white transition-colors duration-200 hover:bg-white",
        {
          "opacity-0": showCreateModal,
        },
      )}
      onClick={() => {
        commonStore.setState({ showCreateModal: true });
      }}
    >
      <p className="text-sm font-semibold">New Building</p>
    </button>
  );
};

export default CreateButton;
