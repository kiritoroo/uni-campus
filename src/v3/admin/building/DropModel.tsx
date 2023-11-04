import { useDropzone } from "react-dropzone";

const DropModel = () => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    maxFiles: 1,
    accept: { "3d file formats": [".gltf", ".glb"] },
  });

  return (
    <div
      className="relative h-full w-full border border-gray-300 bg-[#EFEFEF] p-4"
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
