import { useCommonStore } from "../hooks/useCommonStore";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import { useSpaceStore } from "../hooks/useSpaceStore";
import DropIcon from "./DropIcon";

const IconPreview = () => {
  const commonStore = useCommonStore();
  const spaceStore = useSpaceStore();
  const iconUploadStore = useIconUploadStore();

  const enableEditDetail = commonStore.use.enableEditDetail();
  const spaceData = spaceStore.use.spaceData();
  const base64 = iconUploadStore.use.base64();

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
          src={`${process.env.UNI_CAMPUS_API_URL}/${spaceData?.icon.url}`}
          alt="Image preview"
          className="max-h-[152px] w-full object-cover"
        />
      )}

      {enableEditDetail && (
        <div className="absolute -right-12 bottom-3">
          <DropIcon />
        </div>
      )}
    </div>
  );
};

export default IconPreview;
