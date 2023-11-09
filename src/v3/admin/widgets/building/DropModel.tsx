import { startTransition, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { arrayBufferToString } from "@Utils/common.utils";
import { Upload } from "lucide-react";
import { useModelUploadStore } from "./hooks/useModelUploadStore";
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
    <button type="button" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="bg-blue-100 px-3 py-2">
        <Upload className="h-4 w-4 stroke-gray-700" />
      </div>
    </button>
  );
};

export default DropModel;
