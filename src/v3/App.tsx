import { Routes, Route } from "react-router-dom";

import AdminLayout from "@v3/admin/containers/Layout";
import AdminProvider from "@v3/admin/containers/Provider";

import BuildingsManager from "@v3/admin/screens/BuildingsManager";
import BuildingManager from "./admin/screens/BuildingManager";
import SpacesManager from "./admin/screens/SpacesManager";
import LoginScreen from "./admin/screens/LoginScreen";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <AdminProvider>
        <Routes>
          <Route path="/x" element={<AdminLayout />}>
            <Route path="login" element={<LoginScreen />} />
            <Route path="buildings" element={<BuildingsManager />} />
            <Route path="buildings/:id" element={<BuildingManager />} />
            <Route path="spaces" element={<SpacesManager />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Fragment>
  );
};

export default App;
