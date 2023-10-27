import { cn } from "@Utils/common.utils";
// import GoogleMapReact from "google-map-react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { useCallback, useRef, useState } from "react";
import { MapMarker } from "./UIMapMarker";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import mapTheme from "./map_theme.json";
import { ChevronRight } from "lucide-react";
import { useCampusStoreProxyInContext } from "@Scripts/core/Campus/hooks/useCampusStoreProxyInContext";
import { motion } from "framer-motion";
import { useSnapshot } from "valtio";

export const UIBuildingInfo = () => {
  const campusStoreProxy = useCampusStoreProxyInContext();
  const { buildingPicked } = useSnapshot(campusStoreProxy);

  const [isDragMap, setIsDragMap] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY!,
  // });

  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(function callback(map: any) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds({
  //     lat: 10.85005873263376,
  //     lng: 106.77204753200438,
  //   });
  //   map.fitBounds(bounds);

  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback(function callback(map: any) {
  //   setMap(null);
  // }, []);

  const handleOnDrag = (e: any) => {
    setIsDragMap(true);
  };

  const handleOnDragEnd = (e: any) => {
    setIsDragMap(false);
  };

  const handleOnMapLoaded = () => {
    setIsMapReady(true);
  };

  const mapDefaultCenter = useRef({
    lat: 10.849977264746508,
    lng: 106.77229702519801,
  });

  return (
    <motion.div
      initial={{
        x: "-120%",
      }}
      animate={
        buildingPicked
          ? {
              x: 0,
            }
          : {
              x: "-120%",
            }
      }
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        // type: "tween",
      }}
      className="absolute left-[50px] top-[180px] z-[9999999999]"
    >
      <div className="w-[420px] overflow-hidden rounded-[10px] bg-[#F4F6F9] shadow-[0_1px_10px_0_rgba(220,220,220,0.5)]">
        {/* <h1 className="pb-3 text-center text-2xl font-bold">Engine Workshop</h1> */}
        <div className="relative select-none overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{
              enabled: false,
              dynamicBullets: true,
            }}
            slidesPerView={1}
            navigation={false}
          >
            <SwiperSlide>
              <img
                src="/images/test.jpg"
                className="relative z-[1] h-[300px] w-full select-none object-cover"
              />
              <div className="absolute bottom-0 left-0 z-[2] h-[40%] w-full bg-gradient-to-t from-black/60 to-transparent ring-0" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/test2.jpg"
                className="relative z-[1] h-[300px] w-full select-none object-cover"
              />
              <div className="absolute bottom-0 left-0 z-[2] h-[40%] w-full bg-gradient-to-t from-black/60 to-transparent ring-0" />
            </SwiperSlide>
          </Swiper>
          <div
            className={cn(
              "group absolute left-5 top-5 z-[2] flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg transition-colors duration-100",
            )}
          >
            <img
              width={28}
              height={28}
              src={"/images/parking-space.png"}
              className="transition-transform duration-200 group-hover:scale-125"
            />
            <div className="w-0 overflow-hidden font-medium transition-transform duration-200 group-hover:w-auto">
              <p className="ml-3 mr-2 text-[14px]">Parking</p>
            </div>
          </div>
          {/* 
          <div className="absolute bottom-5 left-0 right-0 z-[3] flex w-full items-end justify-between px-8 text-left text-white">
            <div>
              <h2 className="text-2xl font-bold">Parking zone</h2>
              <p className="text-md font-normal">Faculty/Staff Parking</p>
            </div>
            <div className="cursor-pointer rounded-[10px] bg-[#FFFFFF] px-4 py-2 text-[14px] font-medium text-[#373674] shadow-sm">
              Details
            </div>
          </div> */}
        </div>
        <div className=" z-[3] flex w-full items-center justify-between px-8 py-5 text-left">
          <div>
            <h2 className="text-2xl font-bold text-[#373674]">Parking zone</h2>
            <p className="text-md font-normal text-[#A8AFB6]">Faculty/Staff Parking</p>
          </div>
          <div className="flex cursor-pointer items-center justify-center rounded-[10px] bg-[#FFFFFF] px-4 py-2 text-[14px] font-medium text-[#18181B] shadow-sm">
            <p>Details</p>
            <ChevronRight className="ml-2 h-4 w-4 translate-y-[2px] stroke-2" />
          </div>
        </div>
      </div>

      <div className="relative mt-5 h-[250px] w-full overflow-hidden rounded-[10px] shadow-[0_1px_10px_0_rgba(220,220,220,0.5)]">
        <div
          className={cn(
            "group absolute left-5 top-5 z-[2] flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg transition-colors duration-100",
          )}
        >
          <img
            width={28}
            height={28}
            src={"/images/direction.png"}
            className="transition-transform duration-200 group-hover:scale-125"
          />

          <div className="w-0 overflow-hidden font-medium transition-transform duration-200 group-hover:w-auto">
            <p className="ml-3 mr-2 text-[14px]">Directions</p>
          </div>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          {/* <GoogleMap
            defaultZoom={17}
            defaultCenter={{
              lat: 10.85005873263376,
              lng: 106.77204753200438,
            }}
          ></GoogleMap> */}

          {/* <GoogleMap
            mapContainerStyle={{ width: "420px", height: "250px" }}
            center={{
              lat: 10.85005873263376,
              lng: 106.77204753200438,
            }}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <MapMarker
              key={"A1"}
              label="A1"
              center={{
                lat: 10.85005873263376,
                lng: 106.77204753200438,
              }}
            />
          </GoogleMap> */}

          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAP_API_KEY!,
            }}
            onGoogleApiLoaded={handleOnMapLoaded}
            defaultCenter={mapDefaultCenter.current}
            defaultZoom={17}
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
              styles: mapTheme,
              disableDefaultUI: true,
            }}
          >
            {/* {isMapReady && ( */}
            <MapMarker
              key={"A1"}
              label="A1"
              isShow={!isDragMap}
              lat={mapDefaultCenter.current.lat}
              lng={mapDefaultCenter.current.lng}
            />
            {/* )} */}
          </GoogleMapReact>
        </div>
      </div>
    </motion.div>
  );
};
