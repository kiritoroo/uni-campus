import { cn, opacityColor } from "@Utils/common.utils";
import { SPACE_COLOR_MAP } from "@Assets/constants";
import { ISpaceData } from "@Types/db.type";
import { useSpaceFilterStoreProxyInContext } from "../hooks/useSpaceFilterStoreProxyInContext";
import { useSnapshot } from "valtio";
import { css } from "@emotion/react";

export const UISpaceCard = ({ id, label, iconPath }: ISpaceData) => {
  const spaceFilterStoreProxy = useSpaceFilterStoreProxyInContext();
  const { spacePicked } = useSnapshot(spaceFilterStoreProxy);

  const handleMouseClick = () => {
    if (spaceFilterStoreProxy.spacePicked && spaceFilterStoreProxy.spacePicked.id === id) {
      spaceFilterStoreProxy.spacePicked = null;
    } else {
      spaceFilterStoreProxy.spacePicked = {
        id: id,
      };
    }
  };

  return (
    <li
      className={cn(
        "group flex h-[42px] cursor-pointer items-center justify-center gap-[14px] rounded-[10px] border-2 border-transparent bg-white px-5 shadow-[0_1px_5px_0_rgba(220,220,220,0.2)] ring-[#D5DAE2]/10 transition-all duration-100 md:hover:ring-1",
        { "bg-[#6279A5]/20": spacePicked?.id === id },
        { "hover:bg-[#F8F7FA]": spacePicked?.id !== id },
      )}
      css={css`
        &:hover > .child {
          background-color: ${opacityColor(SPACE_COLOR_MAP[id], 0.3)};
        }
      `}
      onClick={handleMouseClick}
    >
      <div
        css={css`
          ${spacePicked?.id === id &&
          `
            background-color: ${opacityColor(SPACE_COLOR_MAP[id], 0.3)}
          `}
        `}
        className={cn("child rounded-full bg-[#24244D]/10 p-[6px] transition-colors duration-100")}
      >
        <img width={18} height={18} src={iconPath} />
      </div>
      <p className="hidden text-[14px] font-medium md:block">{label}</p>
    </li>
  );
};
