import { useBuildingStore } from "../hooks/useBuildingStore";
import SlotCard from "./SlotCard";
import SlotEmptyCard from "./SlotEmptyCard";

const BLockSlots = () => {
  const buildingStore = useBuildingStore();

  const buildingId = buildingStore.use.buildingId()!;
  const buildingData = buildingStore.use.buildingData()!;
  const blocksSlot = buildingStore.use.glBLockSlots();

  return (
    <div className="grid grid-cols-6 gap-x-8 gap-y-5">
      {blocksSlot?.map((slot, idx) =>
        slot.isEmpty ? (
          <SlotEmptyCard
            key={idx}
            slotIndex={idx}
            buildingId={buildingId}
            buildingName={buildingData.name}
            objBlockName={slot.objName}
          />
        ) : (
          <SlotCard key={idx} slotIndex={idx} blockData={slot.blockData!} />
        ),
      )}
    </div>
  );
};

export default BLockSlots;
