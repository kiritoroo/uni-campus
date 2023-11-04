import CreateModal from "../components/building/CreateModal";

const BuildingsManager = () => {
  return (
    <section>
      <button type="button" className="w-fit bg-[#e2e2e2] p-3">
        <p className="text-sm font-medium text-[#2C2B31]">New Building</p>
      </button>
      <div className="p-5">All buildings</div>
      <CreateModal />
    </section>
  );
};

export default BuildingsManager;
