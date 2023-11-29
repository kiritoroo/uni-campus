import { cn } from "@Utils/common.utils";
import { useBlockServices } from "@v3/admin/hooks/useBlockServices";
import { useGlobalStore } from "@v3/admin/hooks/useGlobalStore";
import { TBlockSchema } from "@v3/admin/schemas/block/base";
import Copied from "@v3/admin/shared/Copied";
import { useUniDialog } from "@v3/admin/shared/UniDialog";
import { useUniToastify } from "@v3/admin/shared/UniToastify";
import { Trash, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlocksStore } from "../hooks/useBlocksStore";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { CSSProperties } from "react";

const BlockCard = ({ id, name, uses, gallery, is_publish }: TBlockSchema & {}) => {
  const globalStore = useGlobalStore();
  const blocksStore = useBlocksStore();

  const actions = blocksStore.use.actions();

  const uniDialog = useUniDialog();
  const uniToast = useUniToastify();

  const { removeBlock } = useBlockServices();

  const { mutate } = removeBlock(
    {
      id: id,
    },
    {
      onSuccess: () => {
        actions.removeBlock({ blockId: id });
        globalStore.setState({ blockServicesVersion: uuidv4() });
        globalStore.setState({ buildingServiceVersion: uuidv4() });
        uniToast.success({ desc: "Remove building success" });
      },
      onError: (error: any) => {
        uniToast.error({ desc: error.message });
      },
    },
  );

  const handleOnClickDelete = () => {
    uniDialog.addDialog({
      body: (
        <div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-lg font-bold">Delete building?</div>
            <p className="text-center text-sm">
              Are you sure you want to delete <strong>"{name}"</strong> building?. <br /> You can't
              undo this action.
            </p>
          </div>
        </div>
      ),
      button: (
        <button
          type="button"
          className="group flex items-center justify-around gap-2 rounded-lg border border-gem-onyx bg-gem-onyx px-4 py-3 text-white transition-colors duration-200 hover:bg-white hover:text-gem-onyx active:bg-gem-onyx/20"
          onClick={() => {
            mutate();
          }}
        >
          <div className="text-sm font-medium">Delete</div>{" "}
          <Trash className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
        </button>
      ),
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-colors duration-200 hover:border-gray-500">
      <div className="relative w-full grow">
        <Link to={`${id}`} className="block h-full px-5">
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
              {gallery.map((image, idx) => (
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
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 z-[5] flex items-center justify-center gap-2">
          <button
            type="button"
            className="group cursor-pointer rounded-md border border-gem-onyx bg-gem-onyx p-2 transition-colors duration-200 hover:bg-white active:bg-gem-onyx/20"
            onClick={handleOnClickDelete}
          >
            <Trash2 className="h-4 w-4 stroke-white transition-colors duration-200 group-hover:stroke-gem-onyx" />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-2 border-t border-gray-300 bg-white p-4">
        <div className="text-lg font-bold text-gem-onyx">{name}</div>
        <div className="text-sm font-medium text-gem-onyx/60">{uses}</div>
        <div className="flex w-full items-center justify-between">
          <div className="mr-2 overflow-hidden text-sm font-medium text-gem-onyx/80">{id}</div>
          <Copied value={id} />
        </div>
        <div className="flex w-full items-center justify-between pt-1">
          <div
            className={cn("rounded-md px-3 py-[2px] text-sm font-medium", {
              " bg-green-100 text-green-700 ": is_publish,
              " bg-gray-200 text-gem-onyx/80 ": !is_publish,
            })}
          >
            {is_publish ? <span>Publish</span> : <span>Draft</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockCard;
