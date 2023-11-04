import CreateModal from "./CreateModal";
import { ModelUploadStoreProvider } from "./contexts/ModelUploadStoreContext";
import { useCommonStore } from "./hooks/useCommonStore";

const Manager = () => {
  const showCreateModal = useCommonStore().use.showCreateModal();
  const commonStore = useCommonStore();

  return (
    <section>
      <button
        type="button"
        className="w-fit bg-[#e2e2e2] p-3"
        onClick={() => {
          commonStore.setState({ showCreateModal: true });
        }}
      >
        <p className="text-sm font-medium text-[#2C2B31]">New Building</p>
      </button>
      <div className="p-5">All buildings</div>
      {showCreateModal && (
        <ModelUploadStoreProvider>
          <CreateModal />
        </ModelUploadStoreProvider>
      )}
    </section>
  );
};

export default Manager;
