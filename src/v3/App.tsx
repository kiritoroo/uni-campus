import { Routes, Route } from "react-router-dom";

import AdminLayout from "@v3/admin/layouts/Layout";
import AdminProvider from "@v3/admin/layouts/Provider";
import BuildingsManager from "@v3/admin/screens/BuildingsManager";
import BuildingManager from "@v3/admin/screens/BuildingManager";
import SpacesManager from "@v3/admin/screens/SpacesManager";
import LoginScreen from "@v3/admin/screens/LoginScreen";
import { Fragment } from "react";
import SpaceManager from "./admin/screens/SpaceManager";

const App = () => {
  return (
    <Fragment>
      <AdminProvider>
        <Routes>
          <Route path="/x" element={<AdminLayout />}>
            <Route path="login" element={<LoginScreen />} />
            <Route path="buildings" element={<BuildingsManager />} />
            <Route path="buildings/:id" element={<BuildingManager />} />
            <Route path="spaces" element={<SpacesManager />}>
              <Route path=":id" element={<SpaceManager />} />
            </Route>
          </Route>
        </Routes>
      </AdminProvider>
    </Fragment>
  );
};

export default App;
