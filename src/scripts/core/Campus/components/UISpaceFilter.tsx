import { Swiper, SwiperSlide } from "swiper/react";
import { UISpaceCard } from "./UISpaceCard";
import { spacesData } from "@Assets/db";
import { X } from "lucide-react";

export const UISpaceFilter = () => {
  return (
    <div className="hidden w-full max-w-[40%] md:block">
      {/* <ul className="flex w-full list-none flex-wrap items-center justify-center gap-4 md:justify-start"> */}
      <div className="flex items-center justify-start">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          direction="horizontal"
          className="overflow-visible overflow-x-clip"
        >
          {spacesData.map((spaceData, idx) => (
            <SwiperSlide key={idx} className="w-fit">
              <UISpaceCard {...spaceData} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="ml-5 cursor-pointer rounded-full bg-[#F4F6F9] px-2 py-2 text-[14px] font-medium text-[#353472] shadow-sm">
          <X className="h-4 w-4 stroke-2" />
        </div>
      </div>
      {/* </ul> */}
    </div>
  );
};
