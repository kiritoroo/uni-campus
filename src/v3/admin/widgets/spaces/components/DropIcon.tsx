import { useCallback } from "react";
import { useIconUploadStore } from "../hooks/useIconUploadStore";
import { useDropzone } from "react-dropzone";
import { arrayBufferToString, cn } from "@Utils/common.utils";
import { useFormContext } from "react-hook-form";
import { TSpaceCreateSchema } from "@v3/admin/schemas/space/create";
import { ImagePlus } from "lucide-react";

const DropIcon = () => {
  const iconUploadStore = useIconUploadStore();
  const base64 = iconUploadStore.use.base64();

  const { setValue, formState } = useFormContext<TSpaceCreateSchema>();

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        iconUploadStore.setState({ fileRaw: file });
        setValue("icon_file", file);
        const data = reader.result;
        iconUploadStore.setState({ base64: data, fileName: file.name });
        arrayBufferToString(data, (a: any) => iconUploadStore.setState({ textOriginalFile: a }));
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
          "border-2 border-red-400": formState.errors.icon_file,
        },
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {base64 && (
        <img
          src={base64 as string}
          alt="Icon upload preview"
          className="h-full w-full object-contain"
        />
      )}

      {!base64 && (
        <div className="relative h-full w-full p-5">
          <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center text-center">
            <ImagePlus className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-3" />
            <div className="pt-5 font-medium text-gem-onyx/60">
              {isDragActive ? (
                <p className="text-sm font-medium text-gem-onyx/80">Drop the files here...</p>
              ) : (
                <p className="text-sm font-medium">
                  Upload space icon <span className="font-semibold text-gem-onyx/80">.webp</span>
                </p>
              )}

              {fileRejections.length ? (
                <p className="text-sm font-medium text-red-400">Only .webp files are accepted</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropIcon;
