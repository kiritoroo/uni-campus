import { useSpacesStore } from "../hooks/useSpacesStore";
import SpaceCard from "./SpaceCard";

const SpacesList = () => {
  const spacesStore = useSpacesStore();
  const spacesData = spacesStore.use.spacesData();

  return (
    <div className="grid grid-cols-6">
      <ul className="col-span-6 mb-20 mr-5 mt-5 space-y-3">
        {spacesData?.map((space) => (
          <li key={space.id}>
            <SpaceCard {...space} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpacesList;
