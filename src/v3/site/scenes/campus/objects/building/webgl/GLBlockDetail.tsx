import { Html } from "@react-three/drei";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { cn } from "@Utils/common.utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { GLMapMarker } from "./GLMapMarker";
import GoogleMapReact from "google-map-react";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GLBlockDetail = () => {
  const buildingStore = useBuildingStore();

  const blockPicked = buildingStore.use.blockPicked()!;

  const navigate = useNavigate();

  const [isDragMap, setIsDragMap] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const handleOnDrag = (e: any) => {
    setIsDragMap(true);
  };

  const handleOnDragEnd = (e: any) => {
    setIsDragMap(false);
  };

  const handleOnMapLoaded = () => {
    setIsMapReady(true);
  };

  return (
    <Html position={[0, 0, 0]} calculatePosition={() => [0, 0, 0]}>
      <motion.div
        initial={{
          opacity: 0,
          x: "-100%",
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: "-100%",
        }}
        transition={{
          type: "keyframes",
          duration: 0.3,
        }}
        className="absolute bottom-0 left-12 top-32"
      >
        <div className="mb-5">
          <div
            className="group w-fit cursor-pointer bg-white px-4 py-3 shadow-[0_1px_10px_0_rgba(220,220,220,0.5)] transition-colors duration-100 hover:bg-gem-sapphire"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="flex items-center justify-start">
              <div className="pr-3">
                <ChevronLeft className="stroke-gem-sapphire transition-colors duration-100 group-hover:stroke-white" />
              </div>
              <div className="font-medium transition-colors duration-100 group-hover:text-white">
                Back to Campus
              </div>
            </div>
          </div>
        </div>
        <div className="w-[420px] bg-white p-5 shadow-[0_1px_10px_0_rgba(220,220,220,0.5)]">
          <div className="relative select-none overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{
                enabled: true,
                dynamicBullets: true,
              }}
              slidesPerView={1}
              navigation={false}
              style={
                {
                  "--swiper-pagination-color": "#495363",
                  "--swiper-pagination-bullet-inactive-color": "#ffffff",
                } as CSSProperties
              }
            >
              {blockPicked?.blockData.gallery.map((image) => (
                <SwiperSlide>
                  <img
                    src={`${process.env.UNI_CAMPUS_API_URL}/${image?.url}`}
                    className="relative z-[1] h-[300px] w-full select-none object-cover"
                  />
                  <div className="absolute bottom-0 left-0 z-[2] h-[40%] w-full bg-gradient-to-t from-black/20 to-transparent ring-0" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className={cn(
                "group absolute left-5 top-5 z-[2] flex cursor-pointer items-center justify-center bg-white p-2 shadow-lg transition-colors duration-100",
              )}
            >
              <img
                width={28}
                height={28}
                src={`${process.env.UNI_CAMPUS_API_URL}/${blockPicked?.blockData.space?.icon.url}`}
                className="transition-transform duration-200 group-hover:scale-125"
              />
              <div className="w-0 overflow-hidden font-medium transition-transform duration-200 group-hover:w-auto">
                <p className="ml-3 mr-2 text-[14px]">{blockPicked?.blockData.space?.name}</p>
              </div>
            </div>
          </div>

          <div className=" z-[3] flex w-full items-start justify-between px-8 py-5 text-left">
            <div>
              <h2 className="text-2xl font-bold text-gem-sapphire">
                {blockPicked?.blockData.name}
              </h2>
              <p className="text-md font-normal text-gem-sapphire/50">
                {blockPicked?.blockData.space?.name}
              </p>
            </div>
            <div className="flex cursor-pointer items-center justify-center bg-gem-sapphire px-5 py-3 text-[14px] font-medium text-white">
              <p className="font-medium uppercase">Details</p>
              <ChevronRight className="ml-2 h-4 w-4 translate-y-[2px] stroke-white stroke-2" />
            </div>
          </div>
        </div>

        <div className="relative mt-5 h-[250px] w-full overflow-hidden bg-white p-5 shadow-[0_1px_10px_0_rgba(220,220,220,0.5)]">
          <div
            className={cn(
              "group absolute left-10 top-10 z-[2] flex cursor-pointer items-center justify-center bg-white p-2 shadow-lg transition-colors duration-100",
            )}
            onClick={() => {
              window.open(blockPicked.blockData.direction_url, "_blank");
            }}
          >
            <img
              width={28}
              height={28}
              src={"/v3/images/direction.png"}
              className="transition-transform duration-200 group-hover:scale-125"
            />

            <div className="w-0 overflow-hidden font-medium transition-transform duration-200 group-hover:w-auto">
              <p className="ml-3 mr-2 text-[14px]">Directions</p>
            </div>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.GOOGLE_MAP_API_KEY!,
              }}
              onGoogleApiLoaded={handleOnMapLoaded}
              defaultZoom={17}
              defaultCenter={{
                lat: blockPicked?.blockData.coordinate.latitude,
                lng: blockPicked?.blockData.coordinate.longitude,
              }}
              zoom={17}
              onDrag={handleOnDrag}
              onDragEnd={handleOnDragEnd}
              resetBoundsOnResize
              options={{
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUI: true,
              }}
            >
              <GLMapMarker
                key={"A1"}
                label="A1"
                isShow={!isDragMap}
                lat={blockPicked?.blockData.coordinate.latitude}
                lng={blockPicked?.blockData.coordinate.longitude}
              />
            </GoogleMapReact>
          </div>
        </div>
      </motion.div>
    </Html>
  );
};

export default GLBlockDetail;
