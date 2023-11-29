import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import AdminLayout from "@v3/admin/layouts/Layout";
import BuildingsManager from "@v3/admin/screens/BuildingsManager";
import BuildingManager from "@v3/admin/screens/BuildingManager";
import SpacesManager from "@v3/admin/screens/SpacesManager";
import LoginScreen from "@v3/admin/screens/LoginScreen";
import SpaceManager from "@v3/admin/screens/SpaceManager";
import OverviewScreen from "@v3/admin/screens/OverviewScreen";
import BlocksManager from "@v3/admin/screens/BlocksManager";
import BlockManager from "@v3/admin/screens/BlockManager";
import NotFound from "@v3/admin/shared/NotFound";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/x" element={<AdminLayout />}>
          <Route path="" element={<OverviewScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="buildings" element={<BuildingsManager />} />
          <Route path="buildings/:id" element={<BuildingManager />} />
          <Route path="blocks" element={<BlocksManager />} />
          <Route path="blocks/:id" element={<BlockManager />} />
          <Route path="spaces" element={<SpacesManager />}>
            <Route path=":id" element={<SpaceManager />} />
          </Route>
          <Route path="*" element={<NotFound message="Page Not Found" />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
