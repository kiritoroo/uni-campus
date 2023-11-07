import { Upload } from "lucide-react";
import { useBuildingStore } from "./hooks/useBuildingStore";
import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";
import { arrayBufferToString } from "@Utils/common.utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImagePreview = () => {
  const buildingStore = useBuildingStore();
  const previewUploadStore = usePreviewUploadStore();

  const buildingData = buildingStore.use.buildingData();
  const base64 = previewUploadStore.use.base64();

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        previewUploadStore.setState({ fileRaw: file });
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
        <button type="button" {...getRootProps()}>
          <input {...getInputProps()} />

          <div className="bg-blue-100 px-3 py-2">
            <Upload className="h-4 w-4 stroke-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
