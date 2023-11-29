import { useBlockStore } from "../hooks/useBlockStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { CSSProperties } from "react";
import { ImageDown } from "lucide-react";
import { SpinnerLoading } from "@v3/admin/shared/SpinnerLoading";
import saveAs from "file-saver";

const GalleryPreview = () => {
  const blockStore = useBlockStore();
  const blockData = blockStore.use.blockData();

  const handleSavePreview = () => {
    (blockData?.gallery ?? []).map((imageInfo) => {
      const image = `${process.env.UNI_CAMPUS_API_URL}/${imageInfo.url}`;
      saveAs(image, imageInfo.filename);
    });
  };

  if (!blockData) {
    return <SpinnerLoading width={35} height={35} />;
  }

  return (
    <div className="relative flex h-full flex-row items-center justify-center p-5">
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
        {blockData?.gallery.map((image, idx) => (
          <SwiperSlide
            key={idx}
            className="relative aspect-[4/3] h-auto overflow-hidden rounded-md border border-gray-300 bg-white"
          >
            <img
              src={`${process.env.UNI_CAMPUS_API_URL}/${image.url}`}
              alt={`Image upload preview ${idx}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-3 right-3 z-[12] flex items-center justify-center gap-2">
        <button
          type="button"
          className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
          onClick={handleSavePreview}
        >
          <ImageDown className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      </div>
    </div>
  );
};

export default GalleryPreview;
