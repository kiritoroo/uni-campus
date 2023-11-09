import { arrayBufferToString } from "@Utils/common.utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { usePreviewUploadStore } from "../hooks/usePreviewUploadStore";
import { TBuildingUpdateSchema } from "@v3/admin/schemas/building/update";
import { useFormContext } from "react-hook-form";

const DropPreview = () => {
  const previewUploadStore = usePreviewUploadStore();
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
    <button type="button" {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="bg-blue-100 px-3 py-2">
        <Upload className="h-4 w-4 stroke-gray-700" />
      </div>
    </button>
  );
};

export default DropPreview;
