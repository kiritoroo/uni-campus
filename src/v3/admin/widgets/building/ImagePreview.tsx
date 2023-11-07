import { Upload } from "lucide-react";
import { useBuildingStore } from "./hooks/useBuildingStore";

const ImagePreview = () => {
  const buildingStore = useBuildingStore();
  const buildingData = buildingStore.use.buildingData();

  return (
    <div className="relative h-full w-full bg-gray-100 p-2">
      <img
        src={`${process.env.UNI_CAMPUS_API_URL}/${buildingData?.preview_url}`}
        alt="Image preview"
        className="max-h-[152px] w-full object-cover"
      />
      <div className="absolute bottom-3 left-3">
        <button type="button">
          <div className="bg-blue-100 px-3 py-2">
            <Upload className="h-4 w-4 stroke-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
