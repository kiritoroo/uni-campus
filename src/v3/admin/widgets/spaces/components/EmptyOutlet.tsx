import { Info } from "lucide-react";

const EmptyOutlet = () => {
  return (
    <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300">
      <div className="flex flex-col items-center justify-center gap-5 px-5 py-36">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAFAFA] p-3">
          <Info className="h-full w-full stroke-gem-onyx/50" />
        </div>
        <div>
          Select one space to view <strong>details</strong> here.
        </div>
      </div>
    </div>
  );
};

export default EmptyOutlet;
