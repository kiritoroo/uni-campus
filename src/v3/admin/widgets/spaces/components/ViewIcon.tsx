import { useIconUploadStore } from "../hooks/useIconUploadStore";

const ViewIcon = () => {
  const iconUploadStore = useIconUploadStore();
  const base64 = iconUploadStore.use.base64();

  return (
    <div className="relative aspect-square h-full w-full border border-gray-300 bg-[#EFEFEF] p-5">
      <img
        src={base64 as string}
        alt="Icon preview"
        className="h-full max-h-[200px] w-full object-cover"
      />
    </div>
  );
};

export default ViewIcon;
