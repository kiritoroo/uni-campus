import Button from "@v3/admin/shared/Button";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { PlusSquare } from "lucide-react";

const SlotEmptyCard = ({
  slotIndex,
  objBlockName,
  buildingId,
}: {
  slotIndex: number;
  objBlockName: string;
  buildingId: string;
}) => {
  return (
    <div className="col-span-2 rounded-md border border-gray-300 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="pb-1 text-base font-semibold">Empty</div>
          <div className="text-sm font-medium text-gem-onyx/50">Slot block {slotIndex}</div>
        </div>
        <div className="px-2">
          <Button>
            <FlexRow>
              <PlusSquare className="h-4 w-4" />
              <div className="ml-2">New</div>
            </FlexRow>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlotEmptyCard;
