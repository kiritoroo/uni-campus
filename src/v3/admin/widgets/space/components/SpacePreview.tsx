import { useSpaceStore } from "../hooks/useSpaceStore";
import { css } from "@emotion/react";
import { lightenDarkenColor } from "@Utils/common.utils";

const SpacePreview = () => {
  const spaceStore = useSpaceStore();
  const spaceData = spaceStore.use.spaceData();

  return (
    <div className="flex items-center justify-center">
      <div
        css={css`
          border-color: ${spaceData?.color};
        `}
        className="flex w-fit items-stretch justify-center border-2"
      >
        <img
          className="aspect-square h-10 w-10 p-1"
          src={`${process.env.UNI_CAMPUS_API_URL}/${spaceData?.icon.url!}`}
        />
        <div
          css={css`
            background-color: ${lightenDarkenColor(spaceData?.color, 50)}22;
          `}
          className="flex h-auto w-fit items-center justify-center px-3 py-2"
        >
          <div className="text-sm font-medium">{spaceData?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default SpacePreview;
