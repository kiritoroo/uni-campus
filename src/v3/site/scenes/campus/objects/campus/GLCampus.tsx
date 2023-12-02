import Entry from "@v3/admin/widgets/buildings/Entry";
import { CampusStoreProvider } from "./contexts/CampusStoreContext";

const GLCampus = () => {
  return (
    <CampusStoreProvider>
      <Entry />
    </CampusStoreProvider>
  );
};

export default GLCampus;
