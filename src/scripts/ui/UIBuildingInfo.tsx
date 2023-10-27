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

export const UIBuildingInfo = () => {
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
    <div className="absolute left-[50px] top-[180px] z-[9999999999]">
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
                className="relative z-[1] h-[350px] w-full select-none object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/test2.jpg"
                className="relative z-[1] h-[300px] w-full select-none object-cover"
              />
            </SwiperSlide>
          </Swiper>
          <div
            className={cn(
              "group absolute left-5 top-5 z-[2] cursor-pointer rounded-full bg-white p-2 shadow-lg transition-colors duration-100",
            )}
          >
            <img
              width={28}
              height={28}
              src={"/images/parking-space.png"}
              className="transition-transform duration-200 group-hover:scale-125"
            />
          </div>

          <div className="absolute bottom-5 left-0 right-0 z-[3] w-full px-8 text-left text-white">
            <h2 className="text-2xl font-bold">Parking zone</h2>
            <p className="text-md font-normal">Faculty/Staff Parking</p>
          </div>
          <div className="absolute bottom-0 left-0 z-[2] h-[40%] w-full bg-gradient-to-t from-black/60 to-transparent ring-0" />
        </div>
      </div>

      <div className="relative mt-5 h-[250px] w-full overflow-hidden rounded-[10px] shadow-[0_1px_10px_0_rgba(220,220,220,0.5)]">
        <div
          className={cn(
            "group absolute left-5 top-5 z-[2] cursor-pointer rounded-full bg-white p-2 shadow-lg transition-colors duration-100",
          )}
        >
          <img
            width={28}
            height={28}
            src={"/images/direction.png"}
            className="transition-transform duration-200 group-hover:scale-125"
          />
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
              panControl: true,
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              styles: mapTheme,
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
    </div>
  );
};
