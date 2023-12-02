import Entry from "./Entry";
import { CampusStoreProvider } from "./contexts/CampusStoreContext";

const GLCampus = () => {
  return (
    <CampusStoreProvider>
      <Entry />
    </CampusStoreProvider>
  );
};

export default GLCampus;
