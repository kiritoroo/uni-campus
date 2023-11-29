import { useFormContext } from "react-hook-form";
import { useBlockStore } from "../hooks/useBlockStore";
import { useGalleryUploadStore } from "../stores/useGalleryUploadStore";
import { TBlockUpdateSchema } from "@v3/admin/schemas/block/update";
import { CSSProperties, useCallback, useEffect } from "react";
import { arrayBufferToString } from "@Utils/common.utils";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

const DropGallery = () => {
  const blockStore = useBlockStore();
  const galleryUploadStore = useGalleryUploadStore();

  const blockData = blockStore.use.blockData();
  const base64List = galleryUploadStore.use.base64List();
  const files = galleryUploadStore.use.files();
  const galleryUploadAction = galleryUploadStore.use.actions();

  const { setValue } = useFormContext<TBlockUpdateSchema>();

  const handleOnDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = async () => {
        const data = reader.result;
        arrayBufferToString(data, (a: any) =>
          galleryUploadAction.addFile(file, file.name, data, a),
        );
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleOnDrop,
    maxFiles: 5,
    accept: { "image/webp": [".webp"] },
  });

  useEffect(() => {
    setValue("gallery", files as any);
  }, [files]);

  return (
    <div
      className="relative h-full w-full bg-[#F5F5F5]"
      {...(base64List.length === 0 ? getRootProps() : {})}
    >
      {base64List.length === 0 && <input {...getInputProps()} />}

      {base64List.length > 0 && (
        <div className="flex h-full w-full flex-col px-5">
          <div className="flex h-full flex-row items-center justify-center py-4">
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{
                enabled: true,
                dynamicBullets: true,
              }}
              spaceBetween={20}
              slidesPerView={3}
              direction="horizontal"
              className="h-full w-full overflow-visible overflow-x-clip"
              style={
                {
                  "--swiper-pagination-color": "#323234",
                  "--swiper-pagination-bullet-inactive-color": "#999999",
                } as CSSProperties
              }
            >
              {base64List.map((base64, idx) => (
                <SwiperSlide
                  key={idx}
                  className="relative aspect-[4/3] h-auto overflow-hidden rounded-md border border-gray-300 bg-white"
                >
                  <img
                    src={base64 as string}
                    alt={`Image upload preview ${idx}`}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute bottom-3 right-3 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
                      onClick={() => {
                        galleryUploadAction.removeFile(idx);
                      }}
                    >
                      <Trash2 className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
                    </button>
                  </div>
                </SwiperSlide>
              ))}

              <SwiperSlide
                {...getRootProps()}
                className="relative flex aspect-[4/3] h-auto cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-300"
              >
                <input {...getInputProps()} />
                <div className="flex h-full w-full items-center justify-center">
                  <ImagePlus className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-3" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="pb-3 text-sm font-medium text-gem-onyx/80">
            Total files: {files.length}
          </div>
        </div>
      )}

      {base64List.length === 0 && (
        <div className="relative h-full w-full p-5">
          <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center text-center">
            <ImagePlus className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 bg-[#EDEDED] stroke-gray-300 p-3" />
            <div className="pt-5 font-medium text-gem-onyx/60">
              {isDragActive ? (
                <p className="text-sm font-medium text-gem-onyx/80">Drop the files here...</p>
              ) : (
                <p className="text-sm font-medium">
                  Upload block gallery <span className="font-semibold text-gem-onyx/80">.webp</span>
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

export default DropGallery;
