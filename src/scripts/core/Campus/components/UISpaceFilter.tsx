import { UISpaceCard } from "./UISpaceCard";
import { spacesData } from "@Assets/db";

export const UISpaceFilter = () => {
  return (
    <div className="absolute left-0 top-[80px] z-[2] h-fit w-screen px-[50px]">
      <ul className="flex w-full list-none flex-wrap items-center justify-center gap-4 md:justify-start">
        {spacesData.map((spaceData, idx) => (
          <UISpaceCard key={idx} {...spaceData} />
        ))}
      </ul>
    </div>
  );
};
