import { cn } from "@Utils/common.utils";
import { ISpaceData } from "./UISpaceFilter";
import { SPACE_COLOR_MAP } from "@Assets/constants";

export const UISpaceCard = ({ id, label, iconPath }: ISpaceData) => {
  return (
    <li
      className={cn(
        `group flex h-[48px] cursor-pointer items-center justify-center gap-[14px] rounded-[15px] bg-white px-5 shadow-[0_1px_5px_0_rgba(220,220,220,0.2)] ring-[#D5DAE2]/10 transition-all duration-100 hover:bg-[#F8F7FA] md:hover:ring-1`,
      )}
    >
      <div
        className={cn(
          "rounded-full bg-[#24244D]/10 p-[6px] transition-colors duration-100",
          `group-hover:bg-[${SPACE_COLOR_MAP[id]}]/30`,
        )}
      >
        <img width={18} height={18} src={iconPath} />
      </div>
      <p className="hidden text-[14px] font-medium md:block">{label}</p>
    </li>
  );
};
