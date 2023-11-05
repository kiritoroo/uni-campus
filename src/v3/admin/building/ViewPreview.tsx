import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";

const ViewPreview = () => {
  const previewUploadStore = usePreviewUploadStore();
  const buffer = previewUploadStore.use.buffer();

  return (
    <div className="relative h-full w-full border border-gray-300 bg-[#EFEFEF] p-1">
      <img src={buffer as string} alt="Image preview" />
    </div>
  );
};

export default ViewPreview;
