import { cn, opacityColor } from "@Utils/common.utils";
import { SPACE_COLOR_MAP } from "@Assets/constants";
import { ISpaceData } from "src/v2/types/db.type";
import { useSpaceFilterStoreProxyInContext } from "../hooks/useSpaceFilterStoreProxyInContext";
import { useSnapshot } from "valtio";
import { css } from "@emotion/react";
import { useCampusStoreProxyInContext } from "../hooks/useCampusStoreProxyInContext";
import { useCampusSceneStoreProxyInContext } from "@Scripts/webgl/scene/CampusScene/hooks/useCampusSceneStoreProxyInContext";
import { useCampusStoreInContext } from "../hooks/useCampusStoreInContext";
import { OrbitControls } from "three-stdlib";

export const UISpaceCard = ({ id, label, iconPath }: ISpaceData) => {
  const spaceFilterStoreProxy = useSpaceFilterStoreProxyInContext();
  const campusSceneStoreProxy = useCampusSceneStoreProxyInContext();
  const campusStoreProxy = useCampusStoreProxyInContext();
  const { spacePicked } = useSnapshot(spaceFilterStoreProxy);
  // const campusControls = useCampusStoreInContext().use.campusControls();
  // const { cameraState } = useSnapshot(campusSceneStoreProxy);

  const handleMouseClick = () => {
    if (spaceFilterStoreProxy.spacePicked && spaceFilterStoreProxy.spacePicked.id === id) {
      spaceFilterStoreProxy.spacePicked = null;
    } else {
      spaceFilterStoreProxy.spacePicked = {
        id: id,
      };
    }

    if (campusStoreProxy.buildingPicked !== null) {
      campusStoreProxy.buildingPicked = null;
    }
  };

  return (
    <li
      className={cn(
        "group flex h-[42px] w-fit cursor-pointer select-none items-center justify-center gap-[14px] rounded-[10px] bg-white px-5 shadow-[0_1px_5px_0_rgba(220,220,220,0.5)] ring-[#D5DAE2]/10 transition-all duration-100 md:hover:ring-1",
        { "bg-[#6279A5]/20": spacePicked?.id === id },
        { "hover:bg-[#F7F8F8]": spacePicked?.id !== id },
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
      <p className="hidden text-[14px] font-medium text-[#24244D] md:block">{label}</p>
    </li>
  );
};
