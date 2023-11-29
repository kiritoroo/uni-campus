import { cn } from "@Utils/common.utils";
import { LucideIcon } from "lucide-react";
import { HTMLProps } from "react";
import PuffLoader from "react-spinners/PuffLoader";

interface StatsCardProps extends HTMLProps<HTMLDivElement> {
  Icon: LucideIcon;
  value: string;
  title: string;
  isLoading: boolean;
}

const StatsCard = ({ Icon, value, title, isLoading, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-gray-300 px-8 py-5 shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-start pl-5">
            <PuffLoader size={55} loading={true} color="#323234" />
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col items-start justify-center">
            <div className="bg-gradient-to-br from-gem-onyx/60 to-gem-onyx bg-clip-text pb-5 text-5xl font-black text-transparent">
              {value}
            </div>
            <div className="text-lg font-bold text-gem-onyx/80">{title}</div>
          </div>
        )}

        <div className="mx-5 rounded-full bg-[#FAFAFA] p-5">
          <Icon className="h-14 w-14 stroke-gem-onyx opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
