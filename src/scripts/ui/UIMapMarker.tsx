import { memo } from "react";

export const MapMarker = memo(
  ({ label, isShow }: { isShow: boolean; lat: number; lng: number; label: string }) => {
    return (
      <div className="absolute left-[-25px] top-[-25px] h-[50px] w-[50px] text-center">
        {label}
        <img
          width={28}
          height={28}
          src={"/images/location.png"}
          className="h-full w-full origin-[50%_100%] translate-y-[-50%] cursor-pointer object-contain"
        />
      </div>
    );
  },
);
