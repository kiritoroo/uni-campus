import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useModelUploadStore } from "./hooks/useModelUploadStore";
import { arrayBufferToString } from "@Utils/common.utils";
import { startTransition, useEffect } from "react";

const DropModel = () => {
  const modelUploadStore = useModelUploadStore();
  const buffer = modelUploadStore.use.buffer();
  const { loadScene } = modelUploadStore.use.actions();

  useEffect(() => {
    if (buffer) {
      startTransition(() => {
        loadScene();
      });
    }
  }, [buffer]);

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        modelUploadStore.setState({ fileRaw: file });
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
    accept: { "3d file formats": [".gltf", ".glb"] },
  });

  return (
    <div
      className="relative h-full w-full border border-gray-300 bg-[#EFEFEF] p-4 text-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isDragActive ? (
          <p className="text-sm font-medium text-[#2953E9]">Drop the files here...</p>
        ) : (
          <p className="text-sm font-medium">
            Drag <strong className="text-[#2953E9]">GLTF/GLB</strong> file here
          </p>
        )}

        {fileRejections.length ? (
          <p className="text-sm font-medium">Only .gltf or .glb files are accepted</p>
        ) : null}
      </div>
    </div>
  );
};

export default DropModel;
