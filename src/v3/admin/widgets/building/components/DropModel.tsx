import { startTransition, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { arrayBufferToString } from "@Utils/common.utils";
import { Box, Upload } from "lucide-react";
import { useModelUploadStore } from "../hooks/useModelUploadStore";
import { useFormContext } from "react-hook-form";
import { TBuildingUpdateSchema } from "@v3/admin/schemas/building/update";

const DropModel = () => {
  const modelUploadStore = useModelUploadStore();
  const buffer = modelUploadStore.use.buffer();
  const modelUploadActions = modelUploadStore.use.actions();
  const { setValue } = useFormContext<TBuildingUpdateSchema>();

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

  const { getRootProps, getInputProps } = useDropzone({
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
    <div className="relative h-full w-full cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="flex h-full w-full flex-col items-center justify-center backdrop-blur-[2px]">
        <Box className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-5" />
        <div className="pt-5 font-medium text-gem-onyx/60">
          Upload building model <span className="font-semibold text-gem-onyx/80">.gltf, .glb</span>
        </div>
      </div>
    </div>
  );
};

export default DropModel;
