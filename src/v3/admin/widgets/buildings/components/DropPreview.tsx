import { useCallback } from "react";
import { usePreviewUploadStore } from "../hooks/usePreviewUploadStore";
import { useDropzone } from "react-dropzone";
import { arrayBufferToString, cn } from "@Utils/common.utils";
import { useFormContext } from "react-hook-form";
import { TBuildingCreateSchema } from "@v3/admin/schemas/building/create";
import { ImagePlus } from "lucide-react";

const DropPreview = () => {
  const previewUploadStore = usePreviewUploadStore();
  const base64 = previewUploadStore.use.base64();

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
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-[#F5F5F5]",
        {
          "border border-red-400": formState.errors.preview_file,
        },
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {base64 && (
        <img
          src={base64 as string}
          alt="Image upload preview"
          className="h-full w-full object-contain"
        />
      )}

      {!base64 && (
        <div className="relative h-full w-full p-5">
          <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center">
            <ImagePlus className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-3" />
            <div className="pt-5 font-medium text-gem-onyx/60">
              {isDragActive ? (
                <p className="text-sm font-medium text-gem-onyx/80">Drop the files here...</p>
              ) : (
                <p className="text-sm font-medium">
                  Upload building image{" "}
                  <span className="font-semibold text-gem-onyx/80">.webp</span>
                </p>
              )}

              {fileRejections.length ? (
                <p className="text-sm font-medium text-red-400">Only .webp files are accepted</p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default DropPreview;
