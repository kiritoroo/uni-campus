import { arrayBufferToString } from "@Utils/common.utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import { usePreviewUploadStore } from "../hooks/usePreviewUploadStore";
import { TBuildingUpdateSchema } from "@v3/admin/schemas/building/update";
import { useFormContext } from "react-hook-form";
import { useBuildingStore } from "../hooks/useBuildingStore";

const DropPreview = () => {
  const buildingStore = useBuildingStore();
  const previewUploadStore = usePreviewUploadStore();

  const buildingData = buildingStore.use.buildingData();
  const base64 = previewUploadStore.use.base64();

  const { setValue } = useFormContext<TBuildingUpdateSchema>();

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        previewUploadStore.setState({ fileRaw: file });
        setValue("preview_file", file);
        const data = reader.result;
        previewUploadStore.setState({ base64: data, fileName: file.name });
        arrayBufferToString(data, (a: any) => previewUploadStore.setState({ textOriginalFile: a }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOnDrop,
    maxFiles: 1,
    accept: { "image/webp": [".webp"] },
  });

  return (
    <div className="relative h-full w-full cursor-pointer bg-[#F5F5F5]" {...getRootProps()}>
      <input {...getInputProps()} />

      {base64 ? (
        <img
          src={base64 as string}
          alt="Image upload preview"
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="relative h-full w-full">
          <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center backdrop-blur-[2px]">
            <ImagePlus className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-5" />
            <div className="pt-5 font-medium text-gem-onyx/60">
              Upload building image <span className="font-semibold text-gem-onyx/80">.webp</span>
            </div>
          </div>
          <img
            src={`${process.env.UNI_CAMPUS_API_URL}/${buildingData?.preview_img.url}`}
            alt="Image preview"
            className="absolute inset-0 z-[1] h-full w-full object-contain opacity-20"
          />
        </div>
      )}
    </div>
  );
};

export default DropPreview;
