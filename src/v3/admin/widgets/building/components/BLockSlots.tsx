import { useBuildingStore } from "../hooks/useBuildingStore";
import SlotEmptyCard from "./SlotEmptyCard";

const BLockSlots = () => {
  const buildingStore = useBuildingStore();

  const buildingId = buildingStore.use.buildingId()!;
  const blocksSlot = buildingStore.use.glBLockSlots();

  return (
    <div className="grid grid-cols-6 gap-x-8 gap-y-5">
      {blocksSlot?.map((slot, idx) => (
        <SlotEmptyCard
          key={idx}
          buildingId={buildingId}
          objBlockName={slot.objName}
          slotIndex={idx}
        />
      ))}
    </div>
  );
};

export default BLockSlots;
