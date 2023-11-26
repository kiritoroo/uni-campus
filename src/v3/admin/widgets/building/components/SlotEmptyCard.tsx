import Button from "@v3/admin/shared/Button";
import { FlexRow } from "@v3/admin/shared/Wrapper";
import { PlusSquare } from "lucide-react";
import { Link } from "react-router-dom";
import qs from "query-string";

const SlotEmptyCard = ({
  slotIndex,
  objBlockName,
  buildingId,
  buildingName,
}: {
  slotIndex: number;
  objBlockName: string;
  buildingId: string;
  buildingName: string;
}) => {
  const query = qs.stringify({
    create: true,
    "building-id": buildingId,
    "building-name": buildingName,
    "obj-name": objBlockName,
  });

  return (
    <div className="col-span-2 rounded-md border border-gray-300 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="pb-1 text-base font-semibold">Empty</div>
          <div className="text-sm font-medium text-gem-onyx/50">Slot block {slotIndex}</div>
        </div>
        <div className="px-2">
          <Link to={`/x/blocks?${query}`}>
            <Button>
              <FlexRow>
                <PlusSquare className="h-4 w-4" />
                <div className="ml-2">New</div>
              </FlexRow>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlotEmptyCard;
