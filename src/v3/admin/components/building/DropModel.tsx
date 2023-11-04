import { useDropzone } from "react-dropzone";

const DropModel = () => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    maxFiles: 1,
    accept: { "3d file formats": [".gltf", ".glb"] },
  });

  return (
    <div
      className="relative h-full w-full border border-gray-400 bg-[#EFEFEF] p-4"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium">
          Drag <strong className="text-[#2953E9]">GLTF/GLB</strong> file here
        </p>
      </div>
    </div>
  );
};

export default DropModel;
