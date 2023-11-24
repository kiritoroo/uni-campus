import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import { useSpaceStore } from "../hooks/useSpaceStore";
import saveAs from "file-saver";
import { ImageDown } from "lucide-react";

const IconPreview = () => {
  const spaceStore = useSpaceStore();
  const spaceData = spaceStore.use.spaceData();

  const handleSaveIcon = () => {
    const image = `${process.env.UNI_CAMPUS_API_URL}/${spaceData?.icon.url}`;
    saveAs(image, spaceData?.icon.filename);
  };

  if (!spaceData) {
    return <SpinnerLoading width={35} height={35} />;
  }

  return (
    <div className="relative h-full w-full bg-white">
      <img
        src={`${process.env.UNI_CAMPUS_API_URL}/${spaceData?.icon.url}`}
        alt="Image preview"
        className="h-full w-full object-contain"
      />
      <div className="absolute bottom-3 right-3 flex items-center justify-center gap-2">
        <button
          type="button"
          className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
          onClick={handleSaveIcon}
        >
          <ImageDown className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      </div>
    </div>
  );
};

export default IconPreview;
