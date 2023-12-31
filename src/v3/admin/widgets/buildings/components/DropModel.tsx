import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { arrayBufferToString, cn } from "@Utils/common.utils";
import { startTransition, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TBuildingCreateSchema } from "@v3/admin/schemas/building/create";
import { Box } from "lucide-react";

const DropModel = () => {
  const modelUploadStore = useModelUploadStore();

  const scene = modelUploadStore.use.scene();
  const buffer = modelUploadStore.use.buffer();
  const modelUploadActions = modelUploadStore.use.actions();

  const { setValue, formState } = useFormContext<TBuildingCreateSchema>();

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        modelUploadStore.setState({ fileRaw: file });
        setValue("model_file", file);
        const data = reader.result;
        modelUploadStore.setState({ buffer: data, fileName: file.name });
        arrayBufferToString(data, (a: any) => modelUploadStore.setState({ textOriginalFile: a }));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleOnDrop,
    maxFiles: 1,
    accept: { "application/octet-stream": [".gltf", ".glb"] },
  });

  useEffect(() => {
    if (buffer) {
      startTransition(() => {
        modelUploadActions.loadScene();
      });
    }
  }, [buffer]);

  return (
    <div
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-[#F5F5F5]",
        {
          "border border-red-400": formState.errors.model_file,
        },
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {!scene && (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <Box className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-5" />
          <div className="pt-5 font-medium text-gem-onyx/60">
            {isDragActive ? (
              <p className="text-sm font-medium text-gem-onyx/80">Drop the files here...</p>
            ) : (
              <p className="text-sm font-medium">
                Upload building model{" "}
                <span className="font-semibold text-gem-onyx/80">.gltf, .glb</span>{" "}
              </p>
            )}
            {fileRejections.length ? (
              <p className="text-sm font-medium">Only .gltf or .glb files are accepted</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropModel;
