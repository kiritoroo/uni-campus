import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";

const ViewPreview = () => {
  const previewUploadStore = usePreviewUploadStore();
  const base64 = previewUploadStore.use.base64();

  return (
    <div className="relative h-full w-full border border-gray-300 bg-[#EFEFEF] p-1">
      <img
        src={base64 as string}
        alt="Image preview"
        className="max-h-[152px] w-full object-cover"
      />
    </div>
  );
};

export default ViewPreview;
