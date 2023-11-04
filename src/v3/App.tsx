import { Routes, Route } from "react-router-dom";

import AdminLayout from "@v3/admin/containers/Layout";
import BuildingsManager from "@v3/admin/screens/BuildingsManager";
import SpacesManager from "./admin/screens/SpacesManager";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/x" element={<AdminLayout />}>
          <Route path="buildings" element={<BuildingsManager />} />
          <Route path="spaces" element={<SpacesManager />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
