import { assets } from "@Assets/assets";
import { UISpaceCard } from "./UISpaceCard";

export interface ISpaceData {
  id: string;
  label: string;
  iconPath: string;
}

export const UISpaceFilter = () => {
  const spacesData: ISpaceData[] = [
    {
      id: "academic",
      label: "Academic space",
      iconPath: assets.images.ACADEMIC_SPACE_ICON_PATH,
    },
    {
      id: "workshop",
      label: "Workshop space",
      iconPath: assets.images.WORKSHOP_SPACE_ICON_PATH,
    },
    {
      id: "sport",
      label: "Sport space",
      iconPath: assets.images.SPORT_SPACE_ICON_PATH,
    },
    {
      id: "service",
      label: "Service space",
      iconPath: assets.images.SERVICE_SPACE_ICON_PATH,
    },
  ];

  return (
    <div className="absolute left-0 top-[80px] z-[2] h-fit w-screen px-[50px]">
      <div className="sr-only group-hover:bg-[#373674]/30 group-hover:bg-[#6B7FDF]/30 group-hover:bg-[#FD9A43]/30" />
      <ul className="flex w-full list-none flex-wrap items-center justify-center gap-4 md:justify-start">
        {spacesData.map((spaceData, idx) => (
          <UISpaceCard key={idx} {...spaceData} />
        ))}
      </ul>
    </div>
  );
};
