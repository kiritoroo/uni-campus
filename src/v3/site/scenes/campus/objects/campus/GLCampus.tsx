import { memo } from "react";
import Entry from "./Entry";
import { CampusStoreProvider } from "./contexts/CampusStoreContext";

const GLCampus = memo(() => {
  return (
    <CampusStoreProvider>
      <Entry />
    </CampusStoreProvider>
  );
});

export default GLCampus;
