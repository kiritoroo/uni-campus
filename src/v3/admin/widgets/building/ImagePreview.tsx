import DropPreview from "./DropPreview";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";

const ImagePreview = () => {
  const buildingStore = useBuildingStore();
  const previewUploadStore = usePreviewUploadStore();

  const buildingData = buildingStore.use.buildingData();
  const base64 = previewUploadStore.use.base64();

  return (
    <div className="relative h-full w-full bg-gray-100 p-2">
      {base64 && (
        <img
          src={base64 as string}
          alt="Image preview"
          className="max-h-[152px] w-full object-cover"
        />
      )}

      {!base64 && (
        <img
          src={`${process.env.UNI_CAMPUS_API_URL}/${buildingData?.preview_img.url}`}
          alt="Image preview"
          className="max-h-[152px] w-full object-cover"
        />
      )}

      <div className="absolute bottom-3 left-3">
        <DropPreview />
      </div>
    </div>
  );
};

export default ImagePreview;
