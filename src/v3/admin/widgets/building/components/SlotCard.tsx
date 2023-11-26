import { TBlockSchema } from "@v3/admin/schemas/block/base";
import Button from "@v3/admin/shared/Button";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SlotCard = ({ slotIndex, blockData }: { slotIndex: number; blockData: TBlockSchema }) => {
  return (
    <div className="col-span-2 rounded-md border border-gray-300 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="pb-1 text-base font-semibold">{blockData.name}</div>
          <div className="text-sm font-medium text-gem-onyx/50">Slot block {slotIndex}</div>
        </div>
        <div className="px-2">
          <Link to={`/x/blocks/${blockData.id}`}>
            <Button>
              <FlexRow>
                <ArrowUpRight className="h-4 w-4" />
                <div className="ml-2">Detail</div>
              </FlexRow>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlotCard;
