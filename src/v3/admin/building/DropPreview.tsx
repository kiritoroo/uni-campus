import { useCallback } from "react";
import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";
import { useDropzone } from "react-dropzone";
import { arrayBufferToString, cn } from "@Utils/common.utils";
import { TBuildingCreateSchema } from "./schemas/create-schema";
import { useFormContext } from "react-hook-form";

const DropPreview = () => {
  const previewUploadStore = usePreviewUploadStore();
  const { setValue, formState } = useFormContext<TBuildingCreateSchema>();

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

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleOnDrop,
    maxFiles: 1,
    accept: { "image/webp": [".webp"] },
  });

  return (
    <div
      className={cn("relative h-full w-full border border-gray-300 bg-[#EFEFEF] p-4 text-center", {
        "border-2 border-red-400": formState.errors.preview_file,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isDragActive ? (
          <p className="text-sm font-medium text-[#2953E9]">Drop the files here...</p>
        ) : (
          <p className="text-sm font-medium">
            Drag <strong className="text-[#2953E9]">WEBP</strong> file here
          </p>
        )}

        {fileRejections.length ? (
          <p className="text-sm font-medium">Only .webp files are accepted</p>
        ) : null}
      </div>
    </div>
  );
};

export default DropPreview;
